# Building a secure authentication and authorization system using Express.js, JWT, and RBAC.

## Setup Instructions
1. Clone the repository
```bash
git clone github.com/SalmaAzeem/authorization-rbac
```

2. Install required dependencies
```bash
npm init -y
npm install express jsonwebtoken mongoose dotenv bcryptjs lowdb 
```

3. Create a `.env` file and store your `SECRET_KEY`, `SECRET_REFRESH_KEY`, `MONGO_URI`, and `PORT`.

4. Run the server.
```bash
node app.js
```

## List of Features.
- Using MongoDB to store the users and lowdb to store the refresh tokens.
- Using `bcryptjs` to hash the passwords.
- Using `jsonwebtoken` to generate access and refresh tokens.
- Implementing role-based access control routes.
- Enforcing a strong password using Regex.

## How to test each endpoint.
### 1. Register
`POST /api/auth/register`

Request:
```json
{
    "email": "salmaayman@gmail.com",
    "username": "salma",
    "password": "Salma&&123",
    "role": "user"
}
```

Response: `201 Created`
```json
{
    "message": "user created successfully"
}
```
---

### 2. Registered With Weak Password
`POST /api/auth/register`

Request:
```json
{
    "email": "salmaayman@gmail.com",
    "username": "salma",
    "password": "123",
    "role": "user"
}
```

Response: `400 Bad Request`
```json
{
    "message": "password must be at least 8 charachters long, must include 1 number and 1 special character"
}
```
--- 
### 3. Login
`POST /api/auth/login`

Request:
```json
{
    "email": "salmaayman@gmail.com",
    "password": "Salma&&123",
}
```

Response: `200 OK`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDUzNmIzN2VkZWVjNThkYzVkMzEyNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ1MTcyMTkyLCJleHAiOjE3NDUxNzU3OTJ9.KcU4LsBKIJz4JXJ_x_Ut7HMnZCw-2WlyxOObluaIEuU"
}
```
---

### 4. Get Profile
`GET /api/profile`

Request: **Bearer Token Included**

Response: `200 OK`
```json
{
    "_id": "68052dfafce792b3431082e9",
    "username": "salma",
    "email": "salmaayman@gmail.com",
    "password":"$2b$10$furk6kktGHJAKR5VrIAuokAPw9ZEigEeUODdKvPvgJUE933R/y",
    "role": "user",
    "_v": 0
}
```
---

### 5. Edit Profile
`PUT /api/profile`

Request: **Bearer Token Included**
```json
{
    "email": "salmaayman697@gmail.com"
}
```
Response: `200 OK`
```json
{
    "message": "user updated successfully"
}
```
---

### 6. Edit User Role
`PUT /api/profile/:id/role`

Request: **Bearer Token of Admin Included**
```json
{
    "role": "moderator"
}
```
Response: `200 OK`
```json
{
    "message": "user role updated successfully"
}
```
---

### 7. Public Route
`GET /api/public`

Response: `200 OK`
```json
{
    "message": "this is a public route"
}
```

---
### 8. Protected Route
`GET /api/protected`

Request: **Bearer Token Included**

Response: `200 OK`
```json
{
    "message": "this is a protected route for authenticated users"
}
```
---
### 9. Moderator Route
`GET /api/moderator`

Request: **Bearer Token of Moderator or Admin Included**

Response: `200 OK`
```json
{
    "message": "this is a route only for moderators and admins"
}
```
---
### 10. Admin Route
`GET /api/admin`

Request: **Bearer Token of Admin Included**

Response: `200 OK`
```json
{
    "message": "this is a route only for admins"
}
```
---

### 11. Invalid Token for Admin Route
`GET /api/admin`

Request: **Invalid Token Included**

Response: `403 Forbidden`
```json
{
    "message": "access denied"
}
```
