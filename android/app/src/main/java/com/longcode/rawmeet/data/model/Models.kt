package com.longcode.rawmeet.data.model

import java.util.Date

data class User(
    val id: String,
    val username: String,
    val email: String,
    val displayName: String,
    val avatarUrl: String? = null,
    val bio: String? = null,
    val createdAt: Date
)

data class Post(
    val id: String,
    val userId: String,
    val user: User? = null,
    val mediaUrl: String,
    val mediaType: String, // "photo" or "video"
    val caption: String? = null,
    val createdAt: Date,
    val commentsCount: Int
)

data class Comment(
    val id: String,
    val postId: String,
    val userId: String,
    val user: User? = null,
    val content: String,
    val createdAt: Date
)
