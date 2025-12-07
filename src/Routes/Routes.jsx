import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layout/AuthLayout";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layout/DashboardLayout";
import MyPercel from "../pages/dashboard/MyParcel/MyPercel";
import Payment from "../pages/dashboard/Payment/Payment";
import PaymentSuccess from '../pages/dashboard/Payment/PaymentSuccess'

import PaymentCancelled from "../pages/dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/dashboard/PaymentHistory/PaymentHistory";
import ApprovedRider from "../pages/dashboard/ApprovedRider/ApprovedRider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "rider",
        element: (
          <PrivateRoutes>
            <Rider />
          </PrivateRoutes>
        ),
         loader: () =>
          fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoutes>
            <SendParcel />
          </PrivateRoutes>
        ),
        loader: () =>
          fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "coverage",
        element: <Coverage />,
        loader: () =>
          fetch("/serviceCenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path:'dashboard',
    element:<PrivateRoutes>
      <DashboardLayout></DashboardLayout>
    </PrivateRoutes>,
    children:[
      {
        path:'my-parcel',
        Component:MyPercel
      },
      {
      path: 'payment/:parcelId',
      Component: Payment
    },
     {
      path: "payment-success",
      element:<PaymentSuccess></PaymentSuccess>
    },
    {
      path:'payment-cancelled',
      Component:PaymentCancelled
    },
    {
      path:'payment-history',
      Component:PaymentHistory
    },
    {
      path:'approve-rider',
      Component:ApprovedRider,
    }
    ]
  }
]);

export default router;
