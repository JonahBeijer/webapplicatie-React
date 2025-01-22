import React from "react";

function Home() {
    return (
        <div className="bg-gray-800 text-white min-h-screen flex flex-col justify-center">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-yellow-400">Singleplayer Games</h1>
                <p className="text-lg mt-4 text-gray-300">
                    Ontdek de beste singleplayer spellen en duik in de wereld van avontuur, actie en plezier!
                </p>
            </header>

            {/* Stokstaartje afbeelding en tekst */}
            <div className="flex justify-center mb-16">
                <img
                    src="/meerkat.jpg"
                    alt="Stokstaartje"
                    className="rounded-xl shadow-lg w-full max-w-md"
                />

            </div>

            {/* Game Cards */}
            <div className="flex justify-center gap-8">
            <div className="bg-gray-700 rounded-lg shadow-lg w-64 p-4 text-center">
                    <h3 className="text-xl font-semibold text-yellow-400">Game 1</h3>
                    <p className="text-gray-300 mt-2">Een spannend avontuur in een open wereld.</p>
                    <button className="bg-yellow-400 text-gray-800 p-2 rounded mt-4">Speel nu</button>
                </div>

                <div className="bg-gray-700 rounded-lg shadow-lg w-64 p-4 text-center">
                    <h3 className="text-xl font-semibold text-yellow-400">Game 2</h3>
                    <p className="text-gray-300 mt-2">Verken magische werelden vol gevaren.</p>
                    <button className="bg-yellow-400 text-gray-800 p-2 rounded mt-4">Speel nu</button>
                </div>

                <div className="bg-gray-700 rounded-lg shadow-lg w-64 p-4 text-center">
                    <h3 className="text-xl font-semibold text-yellow-400">Game 3</h3>
                    <p className="text-gray-300 mt-2">Leid je held naar overwinningen in intense gevechten.</p>
                    <button className="bg-yellow-400 text-gray-800 p-2 rounded mt-4">Speel nu</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 text-center text-gray-400">
                <p>&copy; 2025 Singleplayer Games. Alle rechten voorbehouden.</p>
            </footer>
        </div>
    );
}

export default Home;
