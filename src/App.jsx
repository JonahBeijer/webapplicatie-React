
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import SpotDetail from "./SpotDetail.jsx";
import SpotCreateForm from "./SpotCreateForm.jsx";

const router = createBrowserRouter( [
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/about',
                element: <About/>,
            },
            {
                path: '/spots/create',
                element: <SpotCreateForm/>,
            },
            {
                path: '/spots/:id',
                element: <SpotDetail/>,
            },
        ]
    }
    ]);

function App () {


    return <RouterProvider router={router}/>;
}

export default App





