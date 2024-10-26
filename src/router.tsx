import {  createHashRouter } from "react-router-dom";
import Error from "./components/error/error";

import Ifsc from "./components/ifsc/ifsc";
import Blog from "./components/blog/blog";

export const router = createHashRouter([
    {
        path:'/',
        element:<Ifsc />,
        errorElement:<Error/>
    },
    {
        path: "/ifsc",
        element: <Ifsc />,
        errorElement:<Error/>
    },
    {
        path: "/blog",
        element: <Blog />,
        errorElement:<Error/>
    },
]);