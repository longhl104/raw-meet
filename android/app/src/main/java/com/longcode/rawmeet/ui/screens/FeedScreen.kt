package com.longcode.rawmeet.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun FeedScreen(
    onPostClick: (String) -> Unit,
    onUserClick: (String) -> Unit
) {
    var isLoading by remember { mutableStateOf(true) }
    val posts = remember { mutableStateListOf<String>() }

    LaunchedEffect(Unit) {
        // TODO: Load posts from API
        isLoading = false
    }

    Box(modifier = Modifier.fillMaxSize()) {
        if (isLoading) {
            CircularProgressIndicator(
                modifier = Modifier.align(Alignment.Center)
            )
        } else if (posts.isEmpty()) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = "No posts yet",
                    style = MaterialTheme.typography.headlineSmall
                )
                Text(
                    text = "Start following people to see their posts!",
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        } else {
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                items(posts) { post ->
                    PostCard(
                        post = post,
                        onPostClick = onPostClick,
                        onUserClick = onUserClick
                    )
                }
            }
        }
    }
}

@Composable
fun PostCard(
    post: String,
    onPostClick: (String) -> Unit,
    onUserClick: (String) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        onClick = { onPostClick(post) }
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "Post content placeholder",
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}
