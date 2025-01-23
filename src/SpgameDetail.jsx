import {Link, useParams} from "react-router";
import React, { useEffect, useState } from "react";

function SpgameDetail() {
    const { id } = useParams();
    const [spgame, setSpgame] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadSpgame();
    }, [id]);

    async function loadSpgame() {
        try {
            const response = await fetch(`http://145.24.223.60:8001/spgames/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch the Singleplayer game");
            }

            const data = await response.json();
            setSpgame(data);
        } catch (error) {
            setError("Er is een fout opgetreden: " + error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
            {error && (
                <div className="bg-red-100 text-red-600 border border-red-400 p-4 rounded-lg shadow-lg">
                    <p>{error}</p>
                </div>
            )}
            {spgame ? (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-lg">
                    {/* Dynamische afbeelding */}
                    <div className="relative">
                        <img
                            src={spgame.img_url}
                            alt={spgame.title}
                            className="rounded-xl shadow-lg w-full max-w-md"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{spgame.title}</h1>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">
                            {spgame.body}
                        </p>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">
                            {spgame.date}
                        </p>

                        <div className="mt-4 flex flex-col gap-2">
                            <Link
                                className="border-2 border-black bg-white p-2 rounded-lg text-center font-semibold text-black hover:bg-gray-100 transition-colors"
                                to={`/spgames/`}>
                                Terug
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-gray-700 text-lg animate-pulse">Loading...</p>
                </div>
            )}
        </div>
    );
}

export default SpgameDetail;
