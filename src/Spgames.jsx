import { useEffect, useState } from "react";
import Spgame from "./Spgame.jsx";

function Home() {
    const [spgames, setSpgames] = useState(null);

    async function fetchSpgames() {
        try {
            const response = await fetch('http://145.24.223.60:8001/spgames', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            setSpgames(data.items); // Assuming `data.items` contains the list of spots
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }

    useEffect(() => {
        fetchSpgames(); // Call the async function inside useEffect
    }, []); // Empty dependency array ensures the effect runs only once

    console.log(spgames);

    return (
        <>
            <header className="relative h-96">
                     <div
                    className="absolute inset-0 bg-cover bg-center opacity-50"
                    style={{backgroundImage: "url('/spgames-achter.png')"}}>
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                    <h1 className="text-4xl font-bold">Dit zijn de favoriete van Meerkat Gaming!!</h1>
                    <p className="mt-2 text-xl">Ontdek de spannendste singleplayer games!</p>
                </div>
            </header>


            <main className="py-8 px-4">
                <h2 className="text-3xl font-semibold text-center mb-6">Onze Singleplayer games</h2>
                {spgames ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {spgames.map((spgame) => (
                            <Spgame key={spgame.id} spgame={spgame} fetchSpgames={fetchSpgames}/>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl">Singleplayer games worden geladen...</div>
                )}
            </main>
        </>
    );
}

export default Home;
