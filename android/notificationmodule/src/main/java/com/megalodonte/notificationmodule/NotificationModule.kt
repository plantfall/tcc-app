package com.megalodonte.notificationmodule

import com.facebook.react.bridge.*

class NotificationModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "NotificationModule"

    @ReactMethod
    fun scheduleNotification(dateTime: String, title: String, message: String) {
        val helper = NotificationHelper(reactContext)
        val timeInMillis = parseDateTime(dateTime)

        if (timeInMillis > 0) {
            helper.scheduleNotification(title, message, timeInMillis)
        }
    }

    @ReactMethod
    fun showNotification(title: String, message: String) {
        val helper = NotificationHelper(reactContext)
        helper.showNotification(title, message)
    }

    private fun parseDateTime(dateTimeStr: String): Long {
        return try {
            val format = java.text.SimpleDateFormat("yyyy-MM-dd HH:mm", java.util.Locale.getDefault())
            val date = format.parse(dateTimeStr)
            date?.time ?: 0L
        } catch (e: Exception) {
            e.printStackTrace()
            0L
        }
    }
}
