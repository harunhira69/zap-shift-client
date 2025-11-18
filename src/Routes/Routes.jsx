import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from '../pages/home/Home/Home'
import Coverage from "../pages/Coverage/Coverage";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layout/AuthLayout";


const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
           Component:Home
        },
        {
          path:'coverage',
          element:<Coverage></Coverage>,
          loader:()=>fetch('/serviceCenter.json').then(res=>res.json())
        }
    ]
  },
  {
    path:'/',
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'register',
        element:<Register></Register>
      }
    ]
  }
]);
export default router