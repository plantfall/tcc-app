package com.megalodonte.barradenavegacao

import android.app.Activity
import android.os.Build
import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NavigationBarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "NavigationBarCustomizer"
    }

    /**
     * Define a aparência dos ícones (botões) na Barra de Navegação do Sistema.
     * @param isLight Indica se a barra de navegação tem um fundo CLARO.
     * Se for TRUE (fundo claro), os ícones ficam ESCUROS.
     * Se for FALSE (fundo escuro), os ícones ficam CLAROS.
     */
    @ReactMethod
    fun setNavigationBarButtonsColor(isLight: Boolean) {
        val activity: Activity? = currentActivity

        if (activity == null || Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            // A API para mudar a cor dos ícones programaticamente é geralmente suportada
            // a partir do Android O (API 26).
            return
        }

        activity.runOnUiThread {
            val window = activity.window
            val decorView = window.decorView

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                // A partir do Android 11 (API 30)
                window.insetsController?.setSystemBarsAppearance(
                    if (isLight)
                        android.view.WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
                    else
                        0, // Limpa o flag
                    android.view.WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
                )
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                // Android 8.0 (API 26) até 10 (API 29)
                var visibility = decorView.systemUiVisibility
                if (isLight) {
                    // Define o ícone como ESCURO
                    visibility = visibility or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
                } else {
                    // Define o ícone como CLARO
                    visibility = visibility and View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR.inv()
                }
                decorView.systemUiVisibility = visibility
            }
        }
    }
}