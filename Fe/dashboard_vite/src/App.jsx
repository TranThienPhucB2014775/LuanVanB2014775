import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./page/Login";
import DashBoard from "./page/dashBoardLayout";
import RootLayout from "./page/Root";
import ListUser from "./page/listUser";
import UserDetail from "./page/UserDetail";
import Overview from "./components/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
        children: [
          {
            index: true,
            element: <div>Dashboard</div>,
          },
          {
            path: "user-list",
            element: <ListUser />,
          },
          {
            path: "user/:id",
            element: <UserDetail />,
            children: [
              {
                index: true,
                element: <Overview />,
              },
              {
                path: "activity",
                element: <div>Activity</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // Xóa localStorage
  //     localStorage.clear();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // Cleanup function
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
