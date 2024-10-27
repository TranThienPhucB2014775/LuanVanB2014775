import React, { lazy, Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard/ecommerce.jsx"));

const Login = lazy(() => import("./pages/auth/login"));

const UsersPage = lazy(() => import("./pages/app/user/user2.jsx"));
const ProfilePage = lazy(() => import("./pages/app/profile/profile.jsx"));

import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/*",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "user",
        element: <UsersPage />,
      },
      {
        path: "profile/:email?",
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return (
    <main className="App relative">
      {/*<Routes>*/}
      {/*    <Route path="/" element={<AuthLayout/>}>*/}
      {/*        <Route path="/" element={<Login/>}/>*/}
      {/*    </Route>*/}
      {/*    <Route path="/*" element={<Layout/>}>*/}
      {/*        <Route path="dashboard" element={<Dashboard/>}/>*/}
      {/*        <Route path="user" element={<UsersPage/>}/>*/}
      {/*        <Route path="profile/:email?" element={<profile/>}/>*/}
      {/*    </Route>*/}
      {/*</Routes>*/}
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
