package com.longcode.rawmeet

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.longcode.rawmeet.navigation.Screen
import com.longcode.rawmeet.ui.screens.*
import com.longcode.rawmeet.ui.theme.RawMeetTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            RawMeetTheme {
                RawMeetApp()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RawMeetApp() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            TopAppBar(
                title = { Text("Raw Meet") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.primary,
                )
            )
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    icon = { Icon(Icons.Filled.Home, contentDescription = "Feed") },
                    label = { Text("Feed") },
                    selected = currentDestination?.hierarchy?.any { it.route == Screen.Feed.route } == true,
                    onClick = {
                        navController.navigate(Screen.Feed.route) {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Filled.Add, contentDescription = "Create") },
                    label = { Text("Create") },
                    selected = currentDestination?.hierarchy?.any { it.route == Screen.CreatePost.route } == true,
                    onClick = {
                        navController.navigate(Screen.CreatePost.route) {
                            launchSingleTop = true
                        }
                    }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Filled.Person, contentDescription = "Profile") },
                    label = { Text("Profile") },
                    selected = currentDestination?.hierarchy?.any { it.route == Screen.Profile.route } == true,
                    onClick = {
                        navController.navigate(Screen.Profile.route) {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Login.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Login.route) {
                LoginScreen(
                    onLoginSuccess = {
                        navController.navigate(Screen.Feed.route) {
                            popUpTo(Screen.Login.route) { inclusive = true }
                        }
                    }
                )
            }
            composable(Screen.Feed.route) {
                FeedScreen(
                    onPostClick = { postId ->
                        navController.navigate(Screen.PostDetail.createRoute(postId))
                    },
                    onUserClick = { userId ->
                        navController.navigate(Screen.UserProfile.createRoute(userId))
                    }
                )
            }
            composable(Screen.CreatePost.route) {
                CreatePostScreen(
                    onPostCreated = {
                        navController.popBackStack()
                    }
                )
            }
            composable(Screen.Profile.route) {
                ProfileScreen(
                    onPostClick = { postId ->
                        navController.navigate(Screen.PostDetail.createRoute(postId))
                    }
                )
            }
            composable(Screen.PostDetail.route) { backStackEntry ->
                val postId = backStackEntry.arguments?.getString("postId") ?: ""
                PostDetailScreen(
                    postId = postId,
                    onUserClick = { userId ->
                        navController.navigate(Screen.UserProfile.createRoute(userId))
                    },
                    onBack = { navController.popBackStack() }
                )
            }
            composable(Screen.UserProfile.route) { backStackEntry ->
                val userId = backStackEntry.arguments?.getString("userId") ?: ""
                UserProfileScreen(
                    userId = userId,
                    onPostClick = { postId ->
                        navController.navigate(Screen.PostDetail.createRoute(postId))
                    },
                    onBack = { navController.popBackStack() }
                )
            }
        }
    }
}

