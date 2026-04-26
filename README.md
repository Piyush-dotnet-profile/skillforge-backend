# Skill Forge Backend API

A modern Express.js backend for the Skill Forge Learning Management System. Built with MongoDB, JWT authentication, and a RESTful API design.

## Features

- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 📚 **Course Management** - Create, read, and manage courses
- 👤 **User Management** - User registration, login, and profiles
- 📊 **Progress Tracking** - Track user progress in courses
- ⭐ **Course Reviews** - Users can rate and review courses
- 🔄 **Enrollment Management** - Users can enroll in courses
- 🛡️ **CORS Enabled** - Ready for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Clone and navigate to backend folder**

   ```bash
   cd skillforge/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:

   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/skillforge

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRATION=7d

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

5. **Start the server**

   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

6. **Seed sample data (optional)**
   ```bash
   npm run seed
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/signup`

Register a new user.

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "enrolledCourses": [],
    "createdAt": "2026-04-27T..."
  },
  "token": "jwt_token_here"
}
```

#### POST `/login`

Login user and get authentication token.

**Request:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "user": { ... },
  "token": "jwt_token_here"
}
```

#### GET `/me`

Get current authenticated user profile.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "enrolledCourses": [{ ... }],
  "createdAt": "2026-04-27T..."
}
```

#### POST `/logout`

Logout user (client removes token from localStorage).

**Headers:**

```
Authorization: Bearer jwt_token_here
```

### Course Routes (`/api/courses`)

#### GET `/`

Get all published courses.

**Query Parameters:**

- None required

**Response:**

```json
[
  {
    "_id": "course_id",
    "title": "Web Development Fundamentals",
    "description": "Learn HTML, CSS, JavaScript...",
    "instructor": "Sarah Johnson",
    "category": "Web Development",
    "level": "Beginner",
    "duration": "8 weeks",
    "modules": [ ... ],
    "rating": 4.5,
    "createdAt": "2026-04-27T..."
  },
  ...
]
```

#### GET `/:id`

Get specific course details.

**Response:**

```json
{
  "_id": "course_id",
  "title": "Web Development Fundamentals",
  "description": "Learn HTML, CSS, JavaScript...",
  "instructor": "Sarah Johnson",
  "category": "Web Development",
  "level": "Beginner",
  "duration": "8 weeks",
  "modules": [
    {
      "title": "Introduction to HTML",
      "description": "Learn the basics of HTML markup",
      "content": "HTML is the standard markup language...",
      "duration": "1 week",
      "order": 1
    }
  ],
  "rating": 4.5,
  "reviews": [ ... ],
  "createdAt": "2026-04-27T..."
}
```

#### GET `/my-courses/enrolled`

Get user's enrolled courses (requires authentication).

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
[
  {
    "_id": "course_id",
    "title": "Web Development Fundamentals",
    ...
  },
  ...
]
```

#### POST `/:id/enroll`

Enroll user in a course (requires authentication).

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
  "message": "Successfully enrolled in course",
  "course": { ... }
}
```

#### GET `/:id/modules`

Get course modules.

**Response:**

```json
{
  "title": "Web Development Fundamentals",
  "modules": [
    {
      "title": "Introduction to HTML",
      "description": "Learn the basics of HTML markup",
      "duration": "1 week",
      "order": 1
    },
    ...
  ]
}
```

#### POST `/:id/review`

Add a review to a course (requires authentication).

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Request:**

```json
{
  "rating": 5,
  "comment": "Great course! Very informative."
}
```

**Response:**

```json
{
  "message": "Review added successfully",
  "course": { ... }
}
```

## Database Models

### User Schema

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  enrolledCourses: [ObjectId],
  progress: Map,
  createdAt: Date,
  updatedAt: Date
}
```

### Course Schema

```javascript
{
  title: String,
  description: String,
  instructor: String,
  category: String,
  duration: String,
  level: String,
  modules: [
    {
      title: String,
      description: String,
      content: String,
      duration: String,
      order: Number
    }
  ],
  enrolledUsers: [ObjectId],
  rating: Number,
  reviews: [
    {
      userId: ObjectId,
      userName: String,
      rating: Number,
      comment: String,
      createdAt: Date
    }
  ],
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

| Variable         | Description                | Example                                |
| ---------------- | -------------------------- | -------------------------------------- |
| `MONGODB_URI`    | MongoDB connection string  | `mongodb://localhost:27017/skillforge` |
| `PORT`           | Server port                | `5000`                                 |
| `NODE_ENV`       | Environment mode           | `development`                          |
| `JWT_SECRET`     | Secret key for JWT signing | `your_secret_key`                      |
| `JWT_EXPIRATION` | JWT expiration time        | `7d`                                   |
| `CORS_ORIGIN`    | Allowed CORS origin        | `http://localhost:5173`                |

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB is accessible on the configured URI

### JWT Token Errors

- Ensure `JWT_SECRET` is set in `.env`
- Check token is included in `Authorization: Bearer <token>` header
- Verify token hasn't expired (default: 7 days)

### CORS Issues

- Check `CORS_ORIGIN` matches frontend URL in `.env`
- Ensure frontend includes credentials if needed

## Development Notes

- Passwords are hashed with bcryptjs before storing
- Passwords are never returned in API responses
- All authentication endpoints are rate-limit ready (implement if needed)
- MongoDB indexes are created automatically by Mongoose

## Future Enhancements

- [ ] Implement rate limiting
- [ ] Add email verification
- [ ] Password reset functionality
- [ ] Advanced progress tracking
- [ ] File uploads for course materials
- [ ] Real-time notifications
- [ ] Search and filtering
- [ ] Course recommendations

## License

MIT
