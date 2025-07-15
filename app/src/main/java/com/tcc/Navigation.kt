package com.tcc

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.tcc.screens.LoginScreen


enum class MovieScreens {
    Home,
    Details,
    Login
}

@Composable
fun Navigation(innerPadding: PaddingValues) {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = MovieScreens.Home.name){
        composable(MovieScreens.Login.name){
            LoginScreen(navController)
        }

//        composable(MovieScreens.Home.name){
//            Home(navController)
//        }
//
//        composable(MovieScreens.Details.name + "/{movie_id}",
//            arguments = listOf(navArgument(name="movie_id"){type = NavType.StringType})){
//                currentRoute->
//            Details(navController,currentRoute.arguments?.getString("movie_id"))
//        }
    }
}