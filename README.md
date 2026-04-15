# 📝 Task Manager API

A full-featured backend API for managing tasks with authentication, filtering, search, and pagination.

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **ORM:** Sequelize
* **Authentication:** JWT
* **Version Control:** Git & GitHub

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login (JWT-based authentication)

### 📋 Task Management

* Create Task
* Get Tasks (with advanced features)
* Update Task
* Delete Task (Soft Delete)

### 🔍 Advanced Features

* ✅ Filtering (status, priority)
* ✅ Search (title, description)
* ✅ Pagination (page, limit)
* ✅ Sorting (latest first)
* ✅ User-based data isolation

---

## 📌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| POST   | /register | Register user |
| POST   | /login    | Login user    |

---

### 📋 Task Routes

| Method | Endpoint   | Description                                |
| ------ | ---------- | ------------------------------------------ |
| POST   | /tasks     | Create task                                |
| GET    | /tasks     | Get all tasks (filter, search, pagination) |
| PATCH  | /tasks/:id | Update task                                |
| DELETE | /tasks/:id | Delete task                                |

---

## 🔍 Query Parameters (GET /tasks)

| Parameter | Description                 |
| --------- | --------------------------- |
| status    | Filter by status            |
| priority  | Filter by priority          |
| search    | Search by title/description |
| page      | Page number                 |
| limit     | Number of tasks per page    |

---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/chistisaicharan/task-manager-api-project.git

# Navigate to project
cd task-manager-api-project

# Install dependencies
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT = 4001
DB_NAME=task_manager
DB_PASSWORD=123456789
DB_USER=root
SECRET_KEY=user_key_token
```

---

## ▶️ Run Project

```bash
npm start
```

---

## 📊 Example Request

```http
GET /tasks?status=pending&search=meeting&page=1&limit=5
```

---

## 📁 Folder Structure

```
controllers/
models/
routes/
middlewares/
config/
utils/
```

---

## 🧠 What I Learned

* Building REST APIs with Express.js
* Sequelize ORM & MySQL integration
* Authentication using JWT
* Advanced querying (filtering, search, pagination)
* Clean code & project structuring

---

## 📌 Future Improvements

* Add role-based authorization
* Add task deadlines & reminders
* Add unit testing
* Deploy to cloud (AWS / Render)

---

## 👨‍💻 Author

**Chisti Sai Charan**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
