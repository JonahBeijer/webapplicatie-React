import React from "react";

function Home() {
    return (
        <div className="bg-[#2f1c75] text-white min-h-screen flex flex-col justify-center">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-[#d9a7ff]">Singleplayer Games</h1>
                <p className="text-xl mt-4 text-gray-300 max-w-2xl mx-auto">
                    Ontdek de beste singleplayer spellen en duik in de wereld van avontuur, actie en plezier!
                </p>
            </header>

            {/* Stokstaartje afbeelding en tekst */}
            <div className="flex justify-center mb-16">
                <img
                    src="/meerkat.jpg"
                    alt="Stokstaartje"
                    className="rounded-xl shadow-xl w-full max-w-md"
                />
            </div>

            {/* Game Cards */}
            <div className="flex justify-center gap-8 flex-wrap">
                <div className="bg-[#7d47dd] rounded-lg shadow-2xl w-64 p-6 text-center hover:scale-105 transition-transform duration-300 ease-in-out">
                    <h3 className="text-2xl font-semibold text-white">Game 1</h3>
                    <p className="text-gray-100 mt-2 mb-4">Een spannend avontuur in een open wereld.</p>
                    <button className="bg-[#f0c8f0] text-[#7d47dd] py-2 px-6 rounded-full hover:bg-[#d9a7ff] transition-all duration-300 ease-in-out">
                        Speel nu
                    </button>
                </div>

                <div className="bg-[#7d47dd] rounded-lg shadow-2xl w-64 p-6 text-center hover:scale-105 transition-transform duration-300 ease-in-out">
                    <h3 className="text-2xl font-semibold text-white">Game 2</h3>
                    <p className="text-gray-100 mt-2 mb-4">Verken magische werelden vol gevaren.</p>
                    <button className="bg-[#f0c8f0] text-[#7d47dd] py-2 px-6 rounded-full hover:bg-[#d9a7ff] transition-all duration-300 ease-in-out">
                        Speel nu
                    </button>
                </div>

                <div className="bg-[#7d47dd] rounded-lg shadow-2xl w-64 p-6 text-center hover:scale-105 transition-transform duration-300 ease-in-out">
                    <h3 className="text-2xl font-semibold text-white">Game 3</h3>
                    <p className="text-gray-100 mt-2 mb-4">Leid je held naar overwinningen in intense gevechten.</p>
                    <button className="bg-[#f0c8f0] text-[#7d47dd] py-2 px-6 rounded-full hover:bg-[#d9a7ff] transition-all duration-300 ease-in-out">
                        Speel nu
                    </button>
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
