import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import SpgameDetail from "./SpgameDetail.jsx";
import SpgameCreateForm from "./SpgameCreateForm.jsx";
import Spgames from "./Spgames.jsx";
import NotFound from "./components/Notfound.jsx"; // Nieuwe NotFound component

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/spgames/',
                element: <Spgames />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/spgames/create',
                element: <SpgameCreateForm />,
            },
            {
                path: '/spgames/:id', // Voor het tonen van een specifieke game
                element: <SpgameDetail />,
            },
            {
                path: '/spgames/:id/edit', // Nieuwe route voor bewerken van een game
                element: <SpgameDetail />, // Zelfde component, maar je kunt extra logica toevoegen om te controleren of het een bewerkingsmodus is
            },
            {
                path: '*', // Deze route vangt alle niet-herkende URL's op
                element: <NotFound />,
            },
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
