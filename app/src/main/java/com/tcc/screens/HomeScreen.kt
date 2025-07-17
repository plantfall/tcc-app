package com.tcc.screens

import android.widget.Space
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
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
import androidx.core.graphics.toColorInt
import compose.icons.FontAwesomeIcons
import compose.icons.fontawesomeicons.Solid
import compose.icons.fontawesomeicons.solid.Bell
import compose.icons.fontawesomeicons.solid.Calendar
import compose.icons.fontawesomeicons.solid.CalendarCheck
import compose.icons.fontawesomeicons.solid.CalendarDay
import compose.icons.fontawesomeicons.solid.FileMedical
import compose.icons.fontawesomeicons.solid.History
import compose.icons.fontawesomeicons.solid.LocationArrow


val darkColor:Color = colorFromHex("#002230")
val blueColor:Color = Color(0xFF1B8CB9)

@Composable
fun HomeScreen(navController: NavHostController) {

    val userName = "Amanda"

    Box(
        modifier = Modifier.fillMaxSize()
            .background(colorFromHex("#F2F7F9"))
    ){
        Column(
            modifier = Modifier.fillMaxSize()
        ) {
            Top(nome = userName)
            Spacer(modifier = Modifier.height(50.dp))
            Card(icon = FontAwesomeIcons.Solid.CalendarCheck)
            Spacer(modifier = Modifier.height(10.dp))
            Card(text = "Histórico de consultas", icon = FontAwesomeIcons.Solid.History)
            Spacer(modifier = Modifier.height(10.dp))
            Card(text = "Minha ficha médica", icon = FontAwesomeIcons.Solid.FileMedical)
            Spacer(modifier = Modifier.height(10.dp))
            Card(text = "Localização da UBS", icon = FontAwesomeIcons.Solid.LocationArrow)
        }
    }


}


fun colorFromHex(color: String):Color{
    val cleanColor = if (color.startsWith("#")) color.substring(1) else color //Remove o '#' se presente
    return Color("#$cleanColor".toColorInt()) //Cria um objeto Color a partir da string hexadecimal
}

@Preview
@Composable
private fun Top(nome:String = "Amanda"){

    val gradientBrush = Brush.verticalGradient(
        colors = listOf(Color.White, colorFromHex("#DFEFF5"), colorFromHex("#BFDFEB"),
            colorFromHex("#80BFD8"), colorFromHex("#1B8CB9"), colorFromHex("#1B8CB9")
        )
    )
    Box(modifier = Modifier
        .height(230.dp)
        .fillMaxWidth()
        .background(brush = gradientBrush)
        .padding(15.dp)

    ){
        Column {
            Row(modifier = Modifier.fillMaxWidth()
                , horizontalArrangement = Arrangement.SpaceBetween) {
                Row(
                    verticalAlignment = Alignment.CenterVertically
                    ) {
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .clip(CircleShape)
                            .background(Color.White)
                            .border(1.dp, Color(0xFF1B8CB9), CircleShape)
                    ) {
                        Text(text = nome[0].toString().uppercase(),
                            style = TextStyle(color = Color.Black, fontSize = 15.sp),
                            modifier = Modifier.align(Alignment.Center))
                    }
                    Spacer(modifier = Modifier.width(15.dp))
                    Text(text = "Olá, $nome", style = TextStyle(color = darkColor, fontSize = 17.sp))
                }

                Icon(imageVector = FontAwesomeIcons.Solid.Bell,
                    contentDescription = "Home",
                    tint = Color(0xFF1B8CB9),
                    modifier = Modifier.size(24.dp))
            }
            Spacer(modifier = Modifier.height(30.dp))
            Text(text = "Sua próxima consulta está agendada para:",
                style = TextStyle(color = darkColor, fontSize = 17.sp)
            )
            Spacer(modifier = Modifier.height(10.dp))
            Box(
                modifier = Modifier
                    .background(Color.White, shape = RoundedCornerShape(8.dp))
                    .padding(10.dp)
            ){
                Row(verticalAlignment = Alignment.CenterVertically){
                    Icon(imageVector = FontAwesomeIcons.Solid.CalendarDay,
                        contentDescription = "Home", tint = blueColor,
                        modifier = Modifier.size(17.dp))
                    Text(text = "12/09/2025", style = TextStyle(color = darkColor, fontSize = 17.sp))
                }
            }
        }
    }
}

@Preview
@Composable
private fun Card(text:String = "Agenda consulta", icon : ImageVector = FontAwesomeIcons.Solid.Calendar){
    Box(
        modifier = Modifier
            .padding(horizontal = 10.dp) // Adiciona margem lateral
            .border(1.dp, color = colorFromHex("#8C8C8C"), shape = RoundedCornerShape(8.dp))
            .background(Color.White, shape = RoundedCornerShape(8.dp))
            .padding(horizontal = 20.dp, vertical = 0.dp)
            .fillMaxWidth()
            .height(70.dp),
        contentAlignment = Alignment.CenterStart
    ){
        Row(verticalAlignment = Alignment.CenterVertically){
            Icon(imageVector = icon, contentDescription = "icone", tint = blueColor, modifier = Modifier.size(24.dp))
            Text(text = "  $text", style = TextStyle(color = darkColor, fontSize = 17.sp))
        }
    }
}

@Preview
@Composable
fun HomeScreenPreview(){
    val navController = rememberNavController()
    Column {
        HomeScreen(navController);
    }
}