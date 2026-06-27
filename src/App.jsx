import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/MainNavbar/Navbar";
import Home from "./components/Pages/Home";
import Product from "./components/Pages/Product";
import About from "./components/Pages/About";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Buy from "./components/Pages/Buy";

import AdminDashboard from "./components/Admin/AdminDashboard";
import AddProduct from "./components/Admin/AddProduct";
import EditProduct from "./components/Admin/EditProduct";
import ViewProduct from "./components/Admin/ViewProduct";
import ApproveOrders from "./components/Admin/ApproveOrders";
import UserDashboard from "./components/Pages/UserDashboard";

// Layout for normal user pages
const MainLayout = () => (
  <>
    <Navbar />
    <div className="p-4 md:p-6 lg:p-8">
      <Outlet /> {/* Child page will render here */}
    </div>
  </>
);

// Layout for admin pages
const AdminLayout = () => (
  <div className="flex">
   
    <div className="flex-1 p-4 md:p-6 lg:p-8">
      <Outlet /> {/* Admin child pages render here */}
    </div>
  </div>
);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> }, // default /
        { path: "product", element: <Product /> },
        { path: "about", element: <About /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "buy", element: <Buy /> },
        { path: "dashboard", element: <UserDashboard /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> }, // /admin
        { path: "addproduct", element: <AddProduct /> },
        { path: "editproduct", element: <EditProduct /> },
        { path: "viewproduct", element: <ViewProduct /> },
        { path: "approveorders", element: <ApproveOrders /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
