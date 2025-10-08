package com.megalodonte.notificationmodule.notificacoes

import java.text.SimpleDateFormat
import java.util.*

fun parseDateTime(dateTimeStr: String): Long {
    return try {
        val format = SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault())
        val date = format.parse(dateTimeStr)
        date?.time ?: 0L
    } catch (e: Exception) {
        e.printStackTrace()
        0L
    }
}
