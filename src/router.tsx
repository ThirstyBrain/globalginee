import {  createHashRouter } from "react-router-dom";
import Error from "./components/error/error";

import Ifsc from "./components/ifsc/ifsc";
import Blog from "./components/blog/blog";
import Quote from "./components/quotes/quotes";
//import PdF from "./components/pdf-qa/pdf";
import PDFMerge from "./components/merge-pdf/pdf-merge";
import PDFToWord from "./components/pdf-to-word/pdf-to-word";

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
        path: "/quotes",
        element: <Quote />,
        errorElement:<Error/>
    },
    {
        path: "/blog",
        element: <Blog />,
        errorElement:<Error/>
    },
    // {
    //     path: "/pdf",
    //     element: <PdF />,
    //     errorElement:<Error/>
    // },
    {
        path: "/pdfmerge",
        element: <PDFMerge />,
        errorElement:<Error/>
    },
    {
        path: "/pdf2word",
        element: <PDFToWord />,
        errorElement:<Error/>
    },
]);