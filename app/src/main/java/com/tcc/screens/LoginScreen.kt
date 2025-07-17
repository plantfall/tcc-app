package com.tcc.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Home
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lint.kotlin.metadata.Visibility
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.tcc.R
import compose.icons.FeatherIcons
import compose.icons.feathericons.Eye
import compose.icons.feathericons.EyeOff

@Composable
fun LoginScreen(navController: NavHostController) {

    var cartaoSusInput by remember {
        mutableStateOf("")
    }

    var senhaInput by remember {
        mutableStateOf("")
    }

    var passwordVisible by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier.fillMaxSize()
            .background(Color.White)
    ){
        Column(
            modifier = Modifier.fillMaxSize()
                .padding(20.dp)
        ) {

            Box(modifier = Modifier.height(230.dp)){
                Image(painter = painterResource(id = R.drawable.img),
                    contentDescription = "",
                    contentScale = ContentScale.Crop)
            }
            Spacer(modifier = Modifier.height(10.dp))
            OutlinedTextField(
                value = cartaoSusInput,
                onValueChange = { cartaoSusInput = it },
                label = { Text("Insira o cartão o SUS") },
                textStyle = TextStyle(fontSize = 15.sp, color = MaterialTheme.colorScheme.onBackground),
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(10.dp))
            OutlinedTextField(
                value = senhaInput,
                onValueChange = { senhaInput = it },
                label = { Text("Insira a senha") },
                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                textStyle = TextStyle(fontSize = 15.sp, color = MaterialTheme.colorScheme.onBackground),
                trailingIcon = {
                    val image = if (passwordVisible)
                        FeatherIcons.Eye
                    else FeatherIcons.EyeOff

                    val description = if (passwordVisible) "Esconder senha" else "Mostrar senha"

                    IconButton(onClick = {passwordVisible = !passwordVisible}){
                        Icon(imageVector  = image, description)
                    }
                },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(50.dp))
            Button(onClick = {},
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFF1B8CB9)
                )) {
                Text(text = "Entrar",
                    textAlign = TextAlign.Center,
                    style = TextStyle(color = Color.White, fontSize = 15.sp))
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(text = "Esqueci minha senha",
                textAlign = TextAlign.End,
                style = TextStyle(color = Color(0xFF1B8CB9), fontSize = 15.sp),
                modifier = Modifier.fillMaxWidth())
        }
    }
}


@Preview
@Composable
fun LoginScreenPreview(){
    val navController = rememberNavController()
    Column {
        LoginScreen(navController);
    }
}