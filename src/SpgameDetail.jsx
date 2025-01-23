import { Link, useParams } from "react-router";
import React, { useEffect, useState } from "react";

function SpgameDetail() {
    const { id } = useParams();
    const [spgame, setSpgame] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Voor modal
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        date: "",
        img_url: "",
    }); // Formulierdata

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

            // Zet de datum om naar yyyy-mm-dd formaat voor het formulier
            const formattedDate = formatDateForInput(data.date);
            setFormData({
                title: data.title,
                body: data.body,
                date: formattedDate, // Formatteer naar yyyy-mm-dd
                img_url: data.img_url,
            });

        } catch (error) {
            setError("Er is een fout opgetreden: " + error.message);
        }
    }

    // Functie om de datum om te zetten naar yyyy-mm-dd voor de input
    function formatDateForInput(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // yyyy-mm-dd formaat voor de input
    }

    // Handeling van formulier wijzigingen
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Verzenden van PATCH-verzoek
    async function handleUpdate(e) {
        e.preventDefault();

        // Zet de datum om naar yyyy-mm-dd formaat voor de PATCH-aanvraag
        const formattedDate = formatDateForRequest(formData.date);

        // Werk de formulierdata bij met de geformatteerde datum
        const updatedData = { ...formData, date: formattedDate };

        try {
            const response = await fetch(`http://145.24.223.60:8001/spgames/${id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update the Singleplayer game");
            }

            const data = await response.json();
            setSpgame(data); // Update de weergave
            setShowModal(false); // Sluit de modal
        } catch (error) {
            setError("Er is een fout opgetreden bij het bijwerken: " + error.message);
        }
    }

    // Functie om de datum om te zetten naar yyyy-mm-dd voor de PATCH-aanvraag
    function formatDateForRequest(dateString) {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`; // yyyy-mm-dd
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

                        {/* Bewerkknop */}
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => {
                                setShowModal(true);
                                setFormData({
                                    title: spgame.title,
                                    body: spgame.body,
                                    date: spgame.date,
                                    img_url: spgame.img_url,
                                });
                            }}
                        >
                            Bewerk
                        </button>

                        {/* Terugknop */}
                        <div className="mt-4 flex flex-col gap-2">
                            <Link
                                className="border-2 border-black bg-white p-2 rounded-lg text-center font-semibold text-black hover:bg-gray-100 transition-colors"
                                to={`/spgames/`}
                            >
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

            {/* Modal Pop-up */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Bewerk Singleplayer Game</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                                    Titel
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="body" className="block text-gray-700 font-semibold mb-2">
                                    Beschrijving
                                </label>
                                <textarea
                                    id="body"
                                    name="body"
                                    value={formData.body}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg p-2"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">
                                    Datum
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="img_url" className="block text-gray-700 font-semibold mb-2">
                                    Afbeeldings-URL
                                </label>
                                <input
                                    type="text"
                                    id="img_url"
                                    name="img_url"
                                    value={formData.img_url}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                                    onClick={() => setShowModal(false)}
                                >
                                    Annuleer
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Opslaan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SpgameDetail;
