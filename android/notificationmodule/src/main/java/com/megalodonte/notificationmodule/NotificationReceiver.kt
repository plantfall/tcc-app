package com.megalodonte.notificationmodule

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class NotificationReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val title = intent.getStringExtra("title") ?: "Título"
        val message = intent.getStringExtra("message") ?: "Mensagem"
        Log.e("AGENDAMENTO","title " + title)
        Log.e("AGENDAMENTO","message " + message)

        val helper = NotificationHelper(context)
        helper.createNotificationChannel()
        helper.showNotification(title, message)


    }
}
