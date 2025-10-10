package com.megalodonte.notificationmodule

import android.Manifest
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import kotlinx.serialization.Serializable
import java.io.File
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString

// Defina um objeto Json para uso global (pode ser configurado se necessário, mas o padrão é bom)
private val json = Json {
    ignoreUnknownKeys = true // Útil para ignorar chaves extras no JSON
    prettyPrint = true // Formata o JSON para fácil leitura (opcional)
}


@Serializable
data class Notificacao(
    val id: Int,
    val titulo: String,
    val mensagem: String,
    val user_id: String
)

const val fileName = "consultas.json"

class NotificationReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val title = intent.getStringExtra("title") ?: "Título"
        val message = intent.getStringExtra("message") ?: "Mensagem"

        val notificationId = intent.getIntExtra("notification_id", -1)
        val userId = intent.getStringExtra("user_id") ?: "ID_USUARIO"

        // 🚀 Chama a função para salvar no JSON
        saveNotificationToFile(
            context = context,
            id =  notificationId, // ID da notificação
            titulo = title,
            mensagem = message,
            user_id = userId
        )

        Log.e("AGENDAMENTO", "title: $title")
        Log.e("AGENDAMENTO", "message: $message")

        // 🔹 Intent para abrir o app React Native (activity principal)
        val launchIntent = context.packageManager.getLaunchIntentForPackage(context.packageName)?.apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }

        // 🔹 PendingIntent para quando o usuário clicar na notificação
        val pendingIntent = PendingIntent.getActivity(
            context,
            0,
            launchIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or (
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_IMMUTABLE else 0
                    )
        )

        // 🔹 Criar o canal se ainda não existir
        val helper = NotificationHelper(context)
        helper.createNotificationChannel()

        // 🔹 Montar a notificação com ação de abrir o app
        val notification = NotificationCompat.Builder(context, NotificationHelper.CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(message)
            .setSmallIcon(android.R.drawable.ic_dialog_info) // ícone do módulo
            .setContentIntent(pendingIntent) // <- aqui está o clique
            .setAutoCancel(true) // fecha a notificação quando clicada
            .build()

        // 🔹 Exibir a notificação
        with(NotificationManagerCompat.from(context)) {
            if (ActivityCompat.checkSelfPermission(
                    context,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
                return
            }
            notify(System.currentTimeMillis().toInt(), notification)
        }
    }
}


fun readNotificacoesByUserId(context: Context, userId: String): MutableList<Notificacao> {
    val listaCompleta = readNotificacoes(context)

    // 2. Filtra e retorna apenas as notificações com o user_id correspondente
    val listaFiltrada = listaCompleta.filter { it.user_id == userId }

    Log.i("JSON_HANDLER", "Foram lidas ${listaFiltrada.size} notificações para o usuário $userId.")
    return listaFiltrada.toMutableList() // Retorna como lista mutável
}


fun readNotificacoesJsonString(context: Context, userId: String): String {
    return try {
        val listaDeNotificacoes = readNotificacoesByUserId(context, userId)

        // Serializa a lista (filtrada ou completa) para JSON String
        json.encodeToString(listaDeNotificacoes)
    } catch (e: Exception) {
        Log.e("JSON_HANDLER", "Erro ao serializar a lista de notificações para JSON: ${e.message}")
        "[]" // Retorna o JSON de uma lista vazia em caso de falha
    }
}

private fun readNotificacoes(context: Context): MutableList<Notificacao> {
    val file = File(context.filesDir, fileName)

    if (!file.exists() || file.length() == 0L) {
        // Arquivo não existe ou está vazio, retorna uma lista vazia
        return mutableListOf()
    }

    return try {
        val jsonString = file.readText()
        // Desserializa a string JSON em uma lista de Notificacao
        json.decodeFromString<MutableList<Notificacao>>(jsonString)
    } catch (e: Exception) {
        Log.e("JSON_HANDLER", "Erro ao ler ou desserializar JSON: ${e.message}")
        mutableListOf() // Retorna uma lista vazia em caso de erro
    }
}

/**
 * Serializa uma lista de Notificacao para JSON e a escreve no arquivo.
 *
 * @param context Contexto da aplicação.
 * @param fileName O nome do arquivo (ex: "consultas.json").
 * @param data A lista completa de Notificacao a ser salva.
 */
private fun writeNotificacoes(context: Context, data: List<Notificacao>) {
    try {
        val file = File(context.filesDir, fileName)
        // Serializa a lista completa de volta para uma string JSON
        val jsonString = json.encodeToString(data)
        // Escreve a string no arquivo, substituindo o conteúdo anterior
        file.writeText(jsonString)
        Log.i("JSON_HANDLER", "Notificações salvas com sucesso em $fileName.")
        println("✅ Dado salvo em: ${file.absolutePath}")
        //Dado salvo em: /data/user/0/com.megalodonte.notificationmodule/files/consultas.json

    } catch (e: Exception) {
        Log.e("JSON_HANDLER", "Erro ao escrever JSON no arquivo: ${e.message}")
    }
}

fun saveNotificationToFile(
    context: Context,
    id: Int,
    titulo: String,
    mensagem: String,
    user_id: String
) {
    // 1. LÊ: Obtém a lista atual do arquivo (ou uma lista vazia)
    val listaAtual = readNotificacoes(context)

    // 2. ADICIONA: Cria e insere o novo objeto na lista
    val novaNotificacao = Notificacao(id, titulo, mensagem, user_id)

    // 🚀 MUDANÇA: Usamos add(0, elemento) para inserir no TOPO (primeira posição)
    listaAtual.add(0, novaNotificacao)

    // 3. ESCREVE: Salva a lista completa (incluindo a nova) de volta no arquivo
    writeNotificacoes(context, listaAtual)
}


fun removeNotificationFromFile(
    context: Context,
    id: Int
) {
    // 1. LÊ: Obtém a lista atual do arquivo (ou uma lista vazia)
    val listaAtual = readNotificacoes(context)

    // 2. FILTRA: Remove a notificação cujo ID corresponde.
    // O filterTo cria uma nova lista contendo APENAS os itens que NÃO correspondem ao ID.
    val listaFiltrada = listaAtual.filterTo(mutableListOf()) { it.id != id }

    // 3. VERIFICA E ESCREVE: Se a lista mudou de tamanho, reescreve o arquivo.
    if (listaFiltrada.size < listaAtual.size) {
        writeNotificacoes(context, listaFiltrada)
        Log.i("JSON_HANDLER", "Notificação com ID $id removida e arquivo reescrito.")
    } else {
        Log.w("JSON_HANDLER", "Notificação com ID $id não encontrada no arquivo. Nenhuma alteração feita.")
        throw Exception("Notificação com ID $id não encontrada no arquivo. Nenhuma alteração feita.")
    }
}