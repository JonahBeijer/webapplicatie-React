
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import SpgameDetail from "./SpgameDetail.jsx";
import SpgameCreateForm from "./SpgameCreateForm.jsx";

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
                path: '/spgames/create',
                element: <SpgameCreateForm/>,
            },

            {
                path: '/spgames/:id',
                element: <SpgameDetail/>,

            },
        ]
    }
    ]);

function App () {


    return <RouterProvider router={router}/>;
}

export default App





