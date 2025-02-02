import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function SpgameDetail() {
    const { id } = useParams();
    const [spgame, setSpgame] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Nieuwe loading state
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        date: "",
        img_url: "",
        review: "",
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadSpgame();
    }, [id]);

    useEffect(() => {
        if (window.location.pathname.includes("/edit")) {
            setShowModal(true);
            setIsEditing(true);
        } else {
            setShowModal(false);
            setIsEditing(false);
        }
    }, [window.location.pathname]);

    async function loadSpgame() {
        try {
            const response = await fetch(`http://145.24.223.60:8001/spgames/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 404) {
                setError("Singleplayer game niet gevonden (404)");
                return;
            }

            if (!response.ok) {
                throw new Error("Kon de Singleplayer game niet ophalen");
            }

            const data = await response.json();

            if (!data || Object.keys(data).length === 0) {
                setError("Singleplayer game niet gevonden (404)");
                return;
            }

            const formattedDate = formatDateForInput(data.date);
            setFormData({
                title: data.title,
                body: data.body,
                date: formattedDate,  // Deze datum zou nu in yyyy-mm-dd formaat moeten zijn
                img_url: data.img_url,
                review: data.review,
            });

            setSpgame(data);
            setLoading(false); // Laadstatus ingesteld op false wanneer data is geladen

        } catch (error) {
            setError("Er is een fout opgetreden: Geen game gevonden");
            setLoading(false); // Zorg ervoor dat de loading status stopt bij een fout
        }
    }

    const renderStars = (rating) => {
        const totalStars = 5;
        const filledStars = Math.round(rating);
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <span key={i} className={`text-2xl ${i <= filledStars ? "text-yellow-400" : "text-gray-300"}`} >
                    ★
                </span>
            );
        }

        return stars;
    };

    function formatDateForInput(dateString) {
        if (!dateString) return "";
        const parts = dateString.split("-");
        if (parts.length === 3) {
            const [day, month, year] = parts;
            // Zorg ervoor dat de datum in yyyy-mm-dd formaat wordt weergegeven
            return `${year}-${month}-${day}`;
        }
        return dateString;  // Als het al goed is geformatteerd, doe dan niets
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function validateForm() {
        const errors = {};

        // Verplichte velden
        if (!formData.title) errors.title = "Titel is verplicht";
        if (!formData.body) errors.body = "Beschrijving is verplicht";
        if (!formData.date) errors.date = "Datum is verplicht";
        if (!formData.img_url) errors.img_url = "Afbeelding URL is verplicht";
        if (!formData.review) errors.review = "Review is verplicht";

        // Review tussen 1 en 5
        if (formData.review < 1 || formData.review > 5) {
            errors.review = "Review moet tussen 1 en 5 zijn";
        }

        // Datum validatie
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;  // Verander dit naar yyyy-mm-dd formaat
        if (formData.date && !datePattern.test(formData.date)) {
            errors.date = "Datum moet in het formaat yyyy-mm-dd zijn";
        }

        setValidationErrors(errors);

        // Als er fouten zijn, geef dan false terug
        return Object.keys(errors).length === 0;
    }

    async function handleUpdate(e) {
        e.preventDefault();

        if (!validateForm()) return; // Stop als er validatiefouten zijn

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
            setIsEditing(false);

            // Navigeer terug naar de detailpagina
            navigate(`/spgames/${id}`);
        } catch (error) {
            setError("Er is een fout opgetreden bij het bijwerken: Geen game gevonden");
        }
    }

    function formatDateForRequest(dateString) {
        const [day, month, year] = dateString.split("-");
        return `${year}-${month}-${day}`;
    }

    function handleEditClick() {
        navigate(`/spgames/${id}/edit`); // Navigeer naar de bewerkingspagina
    }

    function handleCancelClick() {
        setShowModal(false);
        setIsEditing(false);

        // Navigeer terug naar de detailpagina zonder wijzigingen
        navigate(`/spgames/${id}`);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
            {error ? (
                <div className="bg-red-100 text-red-600 border border-red-400 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold">Foutmelding 404</h2>
                    <p>{error}</p>
                    <a href="/spgames" className="text-blue-600 underline">Terug naar overzicht</a>
                </div>
            ) : loading ? (  // Hier checken we de loading status
                <div className="text-center">
                    <p className="text-gray-700 text-lg animate-pulse">Loading...</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-lg">
                    <div className="relative ml-8 mt-8">
                        <img
                            src={spgame.img_url}
                            alt={spgame.title}
                            className="rounded-xl shadow-lg w-full max-w-md"
                        />
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-center mr-20 ml-6 mb-2">
                            <span className="font-semibold">Rating:</span>
                            <div className="flex space-x-2 items-center justify-center">
                                {renderStars(spgame.review)}
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{spgame.title}</h1>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">{spgame.body}</p>
                        <span className="font-semibold">Release date:</span>
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
                                href="/spgames"
                                className="border-2 border-black bg-white p-2 rounded-lg text-center font-semibold text-black hover:bg-gray-100 transition-colors"
                            >
                                Terug
                            </a>
                        </div>
                    </div>
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
                                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                                />
                                {validationErrors.title && <p className="text-red-600 text-sm">{validationErrors.title}</p>}
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
                                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                                />
                                {validationErrors.body && <p className="text-red-600 text-sm">{validationErrors.body}</p>}
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
                                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                                />
                                {validationErrors.date && <p className="text-red-600 text-sm">{validationErrors.date}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="img_url" className="block text-gray-700 font-semibold mb-2">
                                    Afbeelding URL
                                </label>
                                <input
                                    type="text"
                                    id="img_url"
                                    name="img_url"
                                    value={formData.img_url}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                                />
                                {validationErrors.img_url && <p className="text-red-600 text-sm">{validationErrors.img_url}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="review" className="block text-gray-700 font-semibold mb-2">
                                    Review (1-5)
                                </label>
                                <input
                                    type="number"
                                    id="review"
                                    name="review"
                                    value={formData.review}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="5"
                                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                                />
                                {validationErrors.review && <p className="text-red-600 text-sm">{validationErrors.review}</p>}
                            </div>

                            <div className="mt-4 flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Opslaan
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelClick}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Annuleren
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
