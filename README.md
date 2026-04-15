# ☁️ Cloud Hoisting

A full-stack web application built with **Next.js** that allows users to create, manage, and interact with articles and comments through a secure and modern system.

---

##  Live Demo

🔗 https://cloud-hoisting-six.vercel.app/

---

##  Database (Neon)

🔗 https://console.neon.tech/app/projects/mute-credit-56869375/branches/br-fancy-bar-aml9tlai/tables?database=CloudHoisting

---

##  Features

### 👤 Authentication System

* User Registration
* User Login
* Secure Authentication
* Role-based Access (Admin / User)

### 📝 Articles Management

* Create, Read, Update, Delete (CRUD)
* Rich article structure (Title & Description)
* Admin-only controls for managing content
* Pagination for showing articles
* Search articles

###  Comments System

* Add comments to articles
* Delete comments (Admin control)
* Dynamic updates

###  Admin Dashboard

* Manage all articles
* Manage all comments
* Clean UI for content control

---

##  Tech Stack

### Frontend

* **Next.js** (App Router)
* **React**
* **Tailwind CSS**

### Backend

* **Next.js API Routes**

### Database & ORM

* **PostgreSQL**
* **Neon** (Serverless Postgres)
* **Drizzle ORM**

---

## ⚙️ API Structure

The project uses **API routes** in Next.js to handle all backend logic:

###  Auth APIs

* `POST /api/users/register`
* `POST /api/users/login`
* `GET /api/users/logout`
* `DELETE /api/users/profile/:id`
* `GET /api/users/profile/:id`
* `GET /api/users/profile/:id`

###  Articles APIs

* `GET /api/articles`
* `POST /api/articles`
* `PUT /api/articles/:id`
* `DELETE /api/articles/:id`
* `GET /api/articles/:id`
* `/api/articles/search?q=text`

### 💬 Comments APIs

* `GET /api/comments`
* `POST /api/comments`
* `PUT /api/comments/:id`
* `DELETE /api/comments/:id`
* `GET /api/comments/:id`

---

## Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL ="postgresql://neondb_owner:npg_bwn7LxR4DFyG@ep-late-darkness-amsg0pio-pooler.c-5.us-east-1.aws.neon.tech/CloudHoisting?sslmode=require&channel_binding=require"
DOMAIN ="https://cloud-hoisting-six.vercel.app"
JWT_SECRET ="privateKey112121##@@"
NODE_ENV="development"
```

---

##  Getting Started Locally

### 1. Clone the repo

```bash
git clone https://github.com/Basant-abdelnaser/cloud_hoisting.git
cd cloud_hoisting
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create `.env` and add your Neon database URL.

### 4. Run the project

```bash
npm run dev
```

---

## Deployment

The project is deployed on **Vercel**.

### Build Command:

```bash
npm run build
```

### Output Directory:

```
.next
```

---

## Future Improvements
* Add user profiles
* Add likes/reactions system
* Improve UI/UX design

---

## Author

**Bsant Abdelnaser**

---

## 📄 License

This project is open-source and available under the MIT License.

---
