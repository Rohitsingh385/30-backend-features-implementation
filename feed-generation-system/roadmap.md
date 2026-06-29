Authentication Module

POST /auth/register

POST /auth/login

GET /auth/me
=====================================

User Module
Schema

User
-------
_id
username
email
avatar
bio
createdAt

Operations
GET /users/:id
GET /users/me
PATCH /users/me
=================================================

Post Module

Schema
Post

_id
author
content
image (optional)
likesCount
commentsCount
createdAt
updatedAt

Operations
POST /posts

GET /posts/:id

PATCH /posts/:id

DELETE /posts/:id

GET /users/:id/posts
=================================================
Follow Module
Schema
Follow

_id
follower
following
createdAt
Compound index
(follower, following)

Operations

POST /users/:id/follow

DELETE /users/:id/follow

GET /users/:id/followers

GET /users/:id/following

============================================

Like Module

Exactly what you built in Project 4.

Schema

Like

_id
user
post
createdAt

Compound index

(user, post)

Operations

POST /posts/:id/like

DELETE /posts/:id/like
=================================================

Feed Module (New)

This is the project.

Operations

GET /feed

Later

GET /feed?cursor=...

Eventually

GET /feed?limit=10&cursor=...

Response

{
  "posts": [],
  "nextCursor": "...",
  "hasNextPage": true
}

============================
Frontend Pages
Login

↓

Home Feed

↓

Profile

↓

Create Post
==================================
React Components

Navbar

Feed

PostCard

CreatePostModal

LikeButton

FollowButton

ProfileHeader

=======================================

API Flow
Register
        ↓
Login
        ↓
JWT
        ↓
Create Post
        ↓
Follow Users
        ↓
Open Home Feed
        ↓
Like Posts

==================================
Project Structure

Backend
│
├── Auth
├── Users
├── Posts
├── Follow
├── Likes
└── Feed

Frontend
│
├── Login
├── Home Feed
├── Profile
├── Create Post
├── Follow Button
└── Like Button