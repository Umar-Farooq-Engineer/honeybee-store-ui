Features
1.User

View available products.

Register / Login with authentication (JWT).

Role-based default access → customer.

Buy product → redirected to login if not authenticated.

After login → access the buy form to place an order.

2.Admin

Access to admin dashboard (role: admin).

Manage products, users, and orders.

Role is updated manually in the database (default is customer).

3.Tech Stack

Frontend: React.js, Redux / Context API, Axios, Tailwind/Bootstrap (your choice).

Backend: Node.js, Express.js.

Database: MongoDB + Mongoose.

Authentication: JWT (JSON Web Tokens), bcrypt for password hashing.


4.Installation 

1.Clone the repository 

git clone https://github.com/ufb482-hub/e-commerce-platform.git
cd mern-ecommerce

2.Install dependencies

Backend
cd server
npm init -y
npm install express mongoose cors bcrypt 

Frontend

cd client
npm install
4.Run the app

Start backend

cd server
npm run dev


Start frontend

cd client
npm start

5.Roles

Customer (default) → can view products & place orders.

Admin → access dashboard, manage products/users/orders.

Role can be updated in the database: