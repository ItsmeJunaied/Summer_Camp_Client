import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import DashBoard from "../Layout/DashBoard";
import Instructor from "../Pages/Instructor/Instructor";
import Class from "../Pages/Class/Class";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'instructor',
            element:<Instructor></Instructor>
        },
        {
            path:'class',
            element:<Class></Class>
        },
      ]
    },
    {
      path: "dashboard",
      element: <DashBoard></DashBoard>,
      children:[
        
      ]
    },
  ]);