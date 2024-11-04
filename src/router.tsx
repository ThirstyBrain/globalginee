import {  createHashRouter } from "react-router-dom";
import Error from "./components/error/error";

import Ifsc from "./components/ifsc/ifsc";
import Blog from "./components/blog/blog";
import Quote from "./components/quotes/quotes";
//import PdF from "./components/pdf-qa/pdf";
import PDFMerge from "./components/merge-pdf/pdf-merge";
import PDFToWord from "./components/pdf-to-word/pdf-to-word";
import MakeupProduct from "./components/makeup-products/makeup-product";
import MedicineInfo from "./components/medicine-info/medicine-info";
import TicTacToe from "./components/game/tic-tac-toe";
import ResumeBuilder from "./components/resume-builder/resume-builder";
import QRCode from "./components/qr-code/qr-code";
import LandingPage from "./components/home/home";
import InvoiceGenerate from "./components/invoice-generate/App";

export const router = createHashRouter([
    {
        path:'/',
        element:<LandingPage />,
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
    {
        path: "/makeupproduct",
        element: <MakeupProduct />,
        errorElement:<Error/>
    }, 
    {
        path: "/medicineinfo",
        element: <MedicineInfo/>,
        errorElement:<Error/>
    },
    {
        path: "/tictactoe",
        element: <TicTacToe/>,
        errorElement:<Error/>
    },
    {
        path: "/resumebuilder",
        element: <ResumeBuilder/>,
        errorElement:<Error/>
    },{
        path: "/qrcode",
        element: <QRCode/>,
        errorElement:<Error/>
    },
    {
        path: '/invoicegenerator',
        element: <InvoiceGenerate />,
        errorElement:<Error/>
    },
]);