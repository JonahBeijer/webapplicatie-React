import React, { useEffect, useState } from "react";

function SpgameDetail() {
    const [spgame, setSpgame] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        date: "",
        img_url: "",
    });
    const [previousUrl, setPreviousUrl] = useState(""); // Opslaan van de vorige URL
    const [isEditing, setIsEditing] = useState(false); // State om bij te houden of we in bewerkingsmodus zijn

    const id = window.location.pathname.split('/')[2]; // Haal het id op uit de URL

    useEffect(() => {
        loadSpgame();
    }, [id]);

    useEffect(() => {
        // Als we van de bewerkingspagina afgaan, reset dan de URL naar de originele
        if (!isEditing) {
            window.history.pushState(null, "", previousUrl);
        }
    }, [isEditing, previousUrl]);

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

            const formattedDate = formatDateForInput(data.date);

            setSpgame(data);
            setFormData({
                title: data.title,
                body: data.body,
                date: formattedDate,
                img_url: data.img_url,
            });
        } catch (error) {
            setError("Er is een fout opgetreden: " + error.message);
        }
    }

    function formatDateForInput(dateString) {
        if (!dateString) return "";
        const parts = dateString.split("-");
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month}-${day}`;
        }
        return dateString;
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleUpdate(e) {
        e.preventDefault();

        const formattedDate = formatDateForRequest(formData.date);
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

            setSpgame((prev) => ({
                ...prev,
                ...updatedData,
            }));

            setShowModal(false);
            setIsEditing(false); // Zet bewerkingsmodus uit
        } catch (error) {
            setError("Er is een fout opgetreden bij het bijwerken: " + error.message);
        }
    }

    function formatDateForRequest(dateString) {
        const [day, month, year] = dateString.split("-");
        return `${year}-${month}-${day}`;
    }

    function handleEditClick() {
        setPreviousUrl(window.location.pathname); // Sla de vorige URL op
        window.history.pushState(null, "", `/spgames/${id}/edit`); // Wijzig de URL naar de edit-pagina
        setShowModal(true);
        setIsEditing(true); // Zet bewerkingsmodus aan
    }

    // Annuleer bewerking en zet de URL terug naar de oorspronkelijke
    function handleCancelClick() {
        if (showModal) { // Check of de bewerkingsmodus actief is
            window.history.pushState(null, "", previousUrl); // Zet de URL terug naar de vorige
            setShowModal(false);
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
                    <div className="relative">
                        <img
                            src={spgame.img_url}
                            alt={spgame.title}
                            className="rounded-xl shadow-lg w-full max-w-md"
                        />
                    </div>

                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{spgame.title}</h1>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">{spgame.body}</p>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">{spgame.date}</p>

                        <div className="mt-4 flex flex-col gap-2">
                            <button
                                className="border-2 border-black bg-white p-2 rounded-lg text-center font-semibold text-black hover:bg-gray-100 transition-colors"
                                onClick={handleEditClick}
                            >
                                Bewerk
                            </button>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            <a
                                href={`/spgames/`}
                                className="border-2 border-black bg-white p-2 rounded-lg text-center font-semibold text-black hover:bg-gray-100 transition-colors"
                            >
                                Terug
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-gray-700 text-lg animate-pulse">Loading...</p>
                </div>
            )}

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
                                    value={formData.date || ""}
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
                                    onClick={handleCancelClick} // Annuleer bewerking
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
