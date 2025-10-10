package com.megalodonte.notificationmodule

import com.facebook.react.bridge.*

class NotificationModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "NotificationModule"

    @ReactMethod
    fun readNotificationsFromFile(userId:String, promise: Promise) {
        try {
            val json = readNotificacoesJsonString(reactContext, userId)

            promise.resolve(json)   // envia de volta pro JS
        } catch(e: Exception) {
            promise.reject("NOTIFICACAO_ERROR", e.message)
        }
    }

    @ReactMethod
    fun removeNotificationFromFile(id:Int, promise: Promise) {
        try {
           removeNotificationFromFile(reactContext,id)
            promise.resolve(true)
        } catch(e: Exception) {
            promise.reject("NOTIFICACAO_ERROR", e.message)
        }
    }

    @ReactMethod
    fun scheduleNotification(dateTime: String, title: String, message: String, userId:String, promise: Promise) {
        try {
            val helper = NotificationHelper(reactContext)
            val timeInMillis = parseDateTime(dateTime)
            val id = helper.scheduleNotification(title, message,userId, timeInMillis)
            promise.resolve(id)   // envia de volta pro JS
        } catch(e: Exception) {
            promise.reject("SCHEDULE_ERROR", e.message)
        }
    }

    @ReactMethod
    fun cancelNotification(id: Int, promise: Promise) {
        try {
            val helper = NotificationHelper(reactContext)
            helper.cancelScheduledNotification(id)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("CANCEL_ERROR", e.message)
        }
    }

//    @ReactMethod
//    fun scheduleNotification(dateTime: String, title: String, message: String) {
//        val helper = NotificationHelper(reactContext)
//        val timeInMillis = parseDateTime(dateTime)
//
//        if (timeInMillis > 0) {
//            helper.scheduleNotification(title, message, timeInMillis)
//        }
//    }

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
