import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function Home() {
    const [spgames, setSpgames] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Haal de games op van de API
    const fetchSpgames = async () => {
        try {
            const url = `http://145.24.223.60:8001/spgames?limit=10000`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Fout bij het ophalen van data: ${response.statusText}`);
            }

            const data = await response.json();
            setSpgames(data.items);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // Kies willekeurige games met 1 of 5 sterren
    const selectRandomGames = () => {
        const filteredGames = spgames.filter(game => game.review === "1" || game.review === "5");

        if (filteredGames.length === 0) {
            setError("Geen games met 1 of 5 sterren gevonden.");
            return;
        }

        const selected = [];
        while (selected.length < 3 && filteredGames.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredGames.length);
            selected.push(filteredGames[randomIndex]);
            filteredGames.splice(randomIndex, 1); // Verwijder de gekozen game
        }

        setSelectedGames(selected);
    };

    useEffect(() => {
        fetchSpgames();
    }, []);

    useEffect(() => {
        if (spgames.length > 0) {
            selectRandomGames();
        } else if (!loading) {
            setError("Geen games beschikbaar.");
        }
    }, [spgames, loading]);

    // Functie om sterren weer te geven op basis van de beoordeling
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else {
                stars.push(<span key={i} className="text-gray-400">★</span>);
            }
        }
        return stars;
    };

    return (
        <div className="bg-[#2f1c75] text-white min-h-screen flex flex-col justify-center">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-[#d9a7ff] mt-6">Singleplayer Games</h1>
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

            {/* Laad- en foutmelding */}
            {loading && (
                <div className="text-center text-xl text-gray-600">Laden...</div>
            )}
            {error && !loading && (
                <div className="text-center text-xl text-red-500">{error}</div>
            )}

            <h1 className="text-5xl font-extrabold text-[#d9a7ff] text-center mb-8">Onze games van de dag</h1>

            {/* Game Cards */}
            {!loading && !error && (
                <div className="flex justify-center gap-8 flex-wrap mb-10">
                    {selectedGames.length > 0 ? (
                        selectedGames.map((spgame, index) => (
                            <div key={index}
                                 className="bg-[#3a226d] text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-200 w-80">
                                {/* Game afbeelding */}
                                <section className="relative">
                                    <img
                                        src={spgame.img_url || "default-image.jpg"} // Fallback afbeelding
                                        alt={spgame.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-30"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h2 className="text-2xl font-semibold">{spgame.title}</h2>
                                    </div>
                                </section>

                                {/* Beoordeling */}
                                <section className="p-4">
                                    <div className="flex items-center justify-center">
                                        <span className="font-semibold">Rating:</span>
                                        <div className="ml-2 flex space-x-1">{renderStars(spgame.review)}</div>
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            className="block border-2 border-white p-2 rounded-lg text-center font-semibold text-white hover:bg-white hover:text-[#3a226d] transition-colors"
                                            to={`/spgames/${spgame.id}`}>
                                            Meer informatie
                                        </Link>
                                    </div>
                                </section>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-xl text-gray-600">Geen games gevonden...</div>
                    )}
                </div>
            )}


        </div>
    );
}

export default Home;
