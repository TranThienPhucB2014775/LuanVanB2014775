import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import Login from "./page/Login";
import DashBoard from "./page/dashBoardLayout";
import RootLayout from "./page/Root";
import User from "./page/User.jsx";
import UserDetail from "./page/UserDetail";
import Overview from "./components/user/Overview.jsx";
import ListApartment from "./components/UserDetail/ListApartment.jsx";
import ListRoomType from "./components/UserDetail/ListRoomType.jsx";
import ListRoom from "./components/UserDetail/ListRoom.jsx";
import Apartments from "./page/Apartments.jsx";
import RoomTypes from "./page/RoomTypes.jsx";
import Rooms from "./page/Rooms.jsx";
import ListReview from "./components/review/ListReview.jsx";
import ListVerify from "./components/verify/ListVerify.jsx";
import Verify from "./page/Verify.jsx";
import ListReport from "./components/report/ListReport.jsx";
import Report from "./page/Report.jsx";
import RentalPost from "./page/RentalPost.jsx";
import RentalPostDetail from "./page/RentalPostDetail.jsx";
import ListRentalPost from "./components/RentalPost/ListRenatalPost.jsx";
import TenantPost from "./page/tenantPost.jsx";
import TenantPostDetail from "./page/TenantPostDetail.jsx";
import Index from "./page/Index.jsx";

const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout/>,
    children: [
        {
            path: "/",
            element: <Login/>,
        },
        {
            path: "/dashboard",
            element: <DashBoard/>,
            children: [
                {
                    index: true,
                    element: <Index/>,
                },
                {
                    path: "user-list",
                    element: <User/>,
                },
                {
                    path: "user/:id",
                    element: <UserDetail/>,
                    children: [
                        {
                            index: true,
                            element: <Overview/>,
                        },
                        {
                            path: "apartment",
                            element: <ListApartment/>,
                        },
                        {
                            path: "room-type",
                            element: <ListRoomType/>
                        },
                        {
                            path: "room",
                            element: <ListRoom/>
                        },
                        {
                            path: "review",
                            element: <ListReview/>,
                        },
                        {
                            path: "rental-post",
                            element: <ListRentalPost/>,
                        },
                        {
                            path: "tenant-post",
                            element: <RentalPost/>,
                        }
                    ],
                },
                {
                    path: "apartment-list",
                    element: <Apartments/>,
                },
                {
                    path: "room-type-list/:apartmentId?",
                    element: <RoomTypes/>
                },
                {
                    path: "room-list/:RoomTypeId?",
                    element: <Rooms/>
                },
                {
                    path: "verify",
                    element: <Verify/>
                },
                {
                    path: "report",
                    element: <Report/>
                },
                {
                    path: "rental-post-list",
                    element: <RentalPost/>,
                },
                {
                    path: "rental-post-list/:rentalPostId",
                    element: <RentalPostDetail/>
                },
                {
                    path: "tenant-post-list",
                    element: <TenantPost/>,
                },
                {
                    path: "tenant-post-list/:tenantPostId",
                    element: <TenantPostDetail/>
                }
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
            <RouterProvider router={router}/>
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
