package com.longcode.rawmeet.navigation

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Login : Screen("login")
    object Feed : Screen("feed")
    object Profile : Screen("profile")
    object CreatePost : Screen("create_post")
    object PostDetail : Screen("post_detail/{postId}") {
        fun createRoute(postId: String) = "post_detail/$postId"
    }
    object UserProfile : Screen("user_profile/{userId}") {
        fun createRoute(userId: String) = "user_profile/$userId"
    }
}
