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

    return (
        <div className="bg-[#2f1c75] text-white min-h-screen flex flex-col">
            {/* Header */}
            <header className="relative h-96">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/spgames-achter.png')" }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-5xl font-extrabold text-[#d9a7ff]">Dit zijn de favoriete van Meerkat Gaming!</h1>
                    <p className="mt-4 text-2xl text-[#f0c8f0]">Ontdek de spannendste singleplayer games!</p>
                </div>
            </header>

            {/* Main content */}
            <main className="py-12 px-6 flex-grow bg-[#f5f5f5]">
                <h2 className="text-4xl font-semibold text-center mb-10 text-[#7d47dd]">Onze Singleplayer Games</h2>

                {spgames ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {spgames.map((spgame) => (
                            <Spgame key={spgame.id} spgame={spgame} fetchSpgames={fetchSpgames} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl text-gray-600">Singleplayer games worden geladen...</div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-16 text-center text-gray-400">
                <p>&copy; 2025 Meerkat Gaming. Alle rechten voorbehouden.</p>
            </footer>
        </div>
    );
}

export default Home;
