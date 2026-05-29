# Job Listing API

A simple RESTful API built with **Node.js, Express, and MongoDB (Mongoose)** for managing job listings. It supports creating, reading, filtering, and deleting jobs with a clean and scalable backend structure.

---

## Features

* Create a new job listing
* Fetch all jobs
* Search jobs by title (case-insensitive)
* Fetch a single job by ID
* Delete a job by ID
* MongoDB integration using Mongoose
* Environment-based configuration using dotenv
* CORS enabled for cross-origin requests

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* cors

---

## Project Structure

```
project-root/
│
├── db/
│   └── db.connect.js
│
├── models/
│   └── job.models.js
│
├── server.js (or index.js)
├── .env
├── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <https://github.com/Adityam53/HireEdge-Backend.git>
open integrated terminal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start the server

```bash
npm start/npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

## API Endpoints

### ➤ Create a Job

**POST** `/jobs`

```json
{
  "title": "Frontend Developer",
  "company": "Tech Corp",
  "location": "Pune",
  "type": "Full-time"
}
```

**Response:**

```json
{
  "message": "New Job created successfully!",
  "savedJob": { ... }
}
```

---

### ➤ Get All Jobs

**GET** `/jobs`

Optional Query:

```
/jobs?title=developer
```

**Response:**

```json
[
  {
    "_id": "...",
    "title": "Frontend Developer"
  }
]
```

---

### ➤ Get Job by ID

**GET** `/jobs/:id`

**Response:**

```json
{
  "_id": "...",
  "title": "Frontend Developer"
}
```

---

### ➤ Delete Job

**DELETE** `/jobs/:id`

**Response:**

```json
{
  "message": "Job Deleted successfully!",
  "deletedJob": { ... }
}
```

---

## Filtering

You can filter jobs by title using case-insensitive search:

```
GET /jobs?title=engineer
```

Internally uses MongoDB regex:

```js
$regex: title,
$options: "i"
```

---

## Error Handling

The API returns proper HTTP status codes:

* `201` → Created successfully
* `200` → Successful request
* `404` → Job not found
* `500` → Server error

---

## Future Improvements

* Update job endpoint (PUT/PATCH)
* Authentication (JWT)
* Pagination & sorting
* Advanced filtering (location, company, type)
* Input validation (Joi/Zod)

---

## 👨‍💻 Author

Built with ❤️ using Node.js & MongoDB

## Contact
For any bugs contact adityamoorjmalani53@gmail.com
