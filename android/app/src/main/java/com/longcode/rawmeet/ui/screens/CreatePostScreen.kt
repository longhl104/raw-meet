package com.longcode.rawmeet.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun CreatePostScreen(
    onPostCreated: () -> Unit
) {
    var caption by remember { mutableStateOf("") }
    var isCapturing by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Create Post",
            style = MaterialTheme.typography.headlineMedium
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp)
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                if (!isCapturing) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Button(onClick = { isCapturing = true }) {
                            Text("Open Camera")
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text("Take a photo or record a video")
                    }
                } else {
                    Text("Camera Preview")
                    // TODO: Implement CameraX preview
                }
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        OutlinedTextField(
            value = caption,
            onValueChange = { caption = it },
            label = { Text("Caption (optional)") },
            modifier = Modifier.fillMaxWidth(),
            maxLines = 3
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Button(
            onClick = {
                // TODO: Upload post
                onPostCreated()
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Post")
        }
    }
}
