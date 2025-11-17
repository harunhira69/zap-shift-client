import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from '../pages/home/Home/Home'
import Coverage from "../pages/Coverage/Coverage";


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
  }
]);
export default router