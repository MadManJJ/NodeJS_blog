# Node.js Blog

This is a simple **Blog application** built using **Node.js**, **Express**, **MongoDB**, and **JWT** for authentication. The application allows users to write, edit, delete, and view blog posts. It also features a login system that secures access to administrative actions like creating, editing, and deleting posts.


---


## Features

- **User Authentication**:
  - Secure login and authentication using **JWT** (JSON Web Tokens).
  - Password encryption with **bcrypt**.
  - Protected routes for managing blog posts.

- **Blog Management**:
  - Users with admin privileges can create, edit, and delete blog posts.
  - All blog data is stored in a **MongoDB** database.

- **Blog Display**:
  - Paginated blog posts on the home page.
  - Each post has its own dedicated page.
  - Search functionality to filter posts by title and body.

- **Admin Dashboard**:
  - The admin dashboard allows users to manage blog posts, view existing posts, and create new ones.
  - Only authenticated users with a valid JWT token can access the dashboard.

- **Additional Pages**:
  - Static **About** and **Contact** pages.

---

## Technologies Used

- **Node.js**: JavaScript runtime used for building the server-side logic.
- **Express.js**: Web framework for handling routes and middleware.
- **MongoDB**: NoSQL database to store blog posts and user information.
- **JWT**: JSON Web Tokens used for secure user authentication.
- **bcrypt**: Password hashing library for securing user passwords.
- **EJS**: Template engine used for rendering dynamic views.
- **Cookie Parser**: Middleware for handling cookies used to store JWT tokens.


## Usage

- **Registration**: New users can sign up via the registration page, providing a username, email, and password.
- **Login**: After registration, users can log in with their credentials. Session management is handled with cookies.
- **Create Blog Post**: Once logged in, users can create a new blog post via the "Create" button on the dashboard.
- **Edit Blog Post**: Users can edit their existing blog posts.
- **Delete Blog Post**: Users can delete their blog posts with the delete button.

### Routes

- `/`: Home page showing all blog posts.
- `/search`: Search page where users can search for blog posts by title or content.
- `/post/:id`: View a single blog post.
- `/about`: Static about page.
- `/contact`: Static contact page.
- `/admin`: Login page for admin users.
- `/dashboard`: Admin dashboard page to manage blog posts. Accessible only to logged-in users.
- `/add-post`: Page to create a new blog post. Requires admin login.
- `/edit-post/:id`: Page to edit an existing blog post. Requires admin login.
- `/delete-post/:id`: Route to delete a blog post. Requires admin login.
- `/logout`: Logs out the user by clearing the JWT token.
  
### Homepage
![Homepage](https://github.com/MadManJJ/NodeJS_blog/blob/adee0b2ed300a8de56b892baf09760a1aaa0c1ba/homepage2.png)

### Login Page
![Login Page](https://github.com/MadManJJ/NodeJS_blog/blob/adee0b2ed300a8de56b892baf09760a1aaa0c1ba/loginpage.png)

### Dashboard
![Dashboard](https://github.com/MadManJJ/NodeJS_blog/blob/db8836756ff4a33f7024745085264c4b8fab025b/dash3.png)

