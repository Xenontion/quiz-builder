# API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Create Quiz
**POST** `/quizzes`

Creates a new quiz with questions.

**Request Body:**
```json
{
  "title": "My Awesome Quiz",
  "questions": [
    {
      "text": "Is JavaScript a programming language?",
      "type": "boolean"
    },
    {
      "text": "What is the capital of France?",
      "type": "input"
    },
    {
      "text": "Which are programming languages?",
      "type": "checkbox",
      "options": ["Python", "JavaScript", "HTML", "CSS"]
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "My Awesome Quiz",
  "createdAt": "2026-01-13T10:00:00Z",
  "updatedAt": "2026-01-13T10:00:00Z",
  "questions": [
    {
      "id": 1,
      "quizId": 1,
      "text": "Is JavaScript a programming language?",
      "type": "boolean",
      "options": null,
      "createdAt": "2026-01-13T10:00:00Z",
      "updatedAt": "2026-01-13T10:00:00Z"
    },
    {
      "id": 2,
      "quizId": 1,
      "text": "What is the capital of France?",
      "type": "input",
      "options": null,
      "createdAt": "2026-01-13T10:00:00Z",
      "updatedAt": "2026-01-13T10:00:00Z"
    },
    {
      "id": 3,
      "quizId": 1,
      "text": "Which are programming languages?",
      "type": "checkbox",
      "options": "[\"Python\",\"JavaScript\",\"HTML\",\"CSS\"]",
      "createdAt": "2026-01-13T10:00:00Z",
      "updatedAt": "2026-01-13T10:00:00Z"
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request` - Invalid input data
- `500 Internal Server Error` - Server error

---

### 2. Get All Quizzes
**GET** `/quizzes`

Retrieves a list of all quizzes with question count.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "General Knowledge Quiz",
    "questionCount": 3,
    "createdAt": "2026-01-13T10:00:00Z"
  },
  {
    "id": 2,
    "title": "JavaScript Basics",
    "questionCount": 3,
    "createdAt": "2026-01-13T10:05:00Z"
  }
]
```

**Query Parameters:** None

**Error Responses:**
- `500 Internal Server Error` - Server error

---

### 3. Get Quiz Details
**GET** `/quizzes/:id`

Retrieves full details of a specific quiz including all questions.

**URL Parameters:**
- `id` (required) - Quiz ID (integer)

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "General Knowledge Quiz",
  "createdAt": "2026-01-13T10:00:00Z",
  "updatedAt": "2026-01-13T10:00:00Z",
  "questions": [
    {
      "id": 1,
      "quizId": 1,
      "text": "Is the Earth round?",
      "type": "boolean",
      "options": null,
      "createdAt": "2026-01-13T10:00:00Z",
      "updatedAt": "2026-01-13T10:00:00Z"
    },
    {
      "id": 2,
      "quizId": 1,
      "text": "What is the capital of France?",
      "type": "input",
      "options": null,
      "createdAt": "2026-01-13T10:00:00Z",
      "updatedAt": "2026-01-13T10:00:00Z"
    },
    {
      "id": 3,
      "quizId": 1,
      "text": "Select all programming languages:",
      "type": "checkbox",
      "options": "[\"Python\",\"JavaScript\",\"Java\",\"HTML\",\"CSS\"]",
      "createdAt": "2026-01-13T10:00:00Z",
      "updatedAt": "2026-01-13T10:00:00Z"
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request` - Invalid quiz ID format
- `404 Not Found` - Quiz not found
- `500 Internal Server Error` - Server error

---

### 4. Delete Quiz
**DELETE** `/quizzes/:id`

Deletes a quiz and all associated questions.

**URL Parameters:**
- `id` (required) - Quiz ID (integer)

**Response:** `200 OK`
```json
{
  "message": "Quiz deleted successfully",
  "id": 1
}
```

**Error Responses:**
- `400 Bad Request` - Invalid quiz ID format
- `404 Not Found` - Quiz not found
- `500 Internal Server Error` - Server error

---

### 5. Health Check
**GET** `/health`

Simple health check endpoint.

**Response:** `200 OK`
```json
{
  "status": "ok"
}
```

---

## Question Types

### Boolean
Simple true/false question.

```json
{
  "text": "Is JavaScript fun?",
  "type": "boolean"
}
```

### Input
Short text answer question.

```json
{
  "text": "What is the capital of France?",
  "type": "input"
}
```

### Checkbox
Multiple choice with multiple correct answers possible.

```json
{
  "text": "Which are programming languages?",
  "type": "checkbox",
  "options": ["Python", "JavaScript", "Java", "HTML", "CSS"]
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Or for validation errors:

```json
{
  "errors": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "string",
      "path": ["title"],
      "message": "String must contain at least 1 character(s)"
    }
  ]
}
```

---

## CORS

The API accepts requests from the frontend URL specified in the `FRONTEND_URL` environment variable (default: `http://localhost:3000`).

---

## Examples using cURL

### Create a quiz
```bash
curl -X POST http://localhost:5000/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Quiz",
    "questions": [
      {
        "text": "Is this fun?",
        "type": "boolean"
      }
    ]
  }'
```

### Get all quizzes
```bash
curl http://localhost:5000/quizzes
```

### Get quiz details
```bash
curl http://localhost:5000/quizzes/1
```

### Delete a quiz
```bash
curl -X DELETE http://localhost:5000/quizzes/1
```

---

## Examples using JavaScript/Fetch

### Create a quiz
```javascript
const response = await fetch('http://localhost:5000/quizzes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Test Quiz',
    questions: [
      {
        text: 'Is this fun?',
        type: 'boolean'
      }
    ]
  })
});

const quiz = await response.json();
console.log(quiz);
```

### Get all quizzes
```javascript
const response = await fetch('http://localhost:5000/quizzes');
const quizzes = await response.json();
console.log(quizzes);
```

### Delete a quiz
```javascript
const response = await fetch('http://localhost:5000/quizzes/1', {
  method: 'DELETE'
});

const result = await response.json();
console.log(result);
```

---

## Rate Limiting
Currently no rate limiting is implemented. This should be added for production use.

## Authentication
Currently no authentication is implemented. This should be added for production use.

## Database Constraints

- Quiz title: Required, non-empty string
- Question text: Required, non-empty string
- Question type: Must be one of: "boolean", "input", "checkbox"
- Checkbox options: Required for checkbox type, array of non-empty strings
- Foreign key constraints: Questions must belong to an existing quiz

---

For more information, see the main README.md
