import { useState } from "react";

function SpgameCreateForm() {
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        date: "",
        img_url: "",
        review: "",
    });

    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "date") {
            const partialDateRegex = /^[0-9\-]*$/;
            if (!partialDateRegex.test(value)) {
                return;
            }

            const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
            if (value && !dateRegex.test(value)) {
                setError((prev) => ({
                    ...prev,
                    date: "Datum moet in het formaat dd-mm-yyyy zijn.",
                }));
            } else {
                setError((prev) => {
                    const { date, ...rest } = prev;
                    return rest;
                });
            }
        }

        if (name === "review") {
            const reviewValue = parseInt(value, 10);
            if (reviewValue < 1 || reviewValue > 5 || isNaN(reviewValue)) {
                setError((prev) => ({
                    ...prev,
                    review: "Review moet een getal tussen 1 en 5 zijn.",
                }));
            } else {
                setError((prev) => {
                    const { review, ...rest } = prev;
                    return rest;
                });
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const postData = async () => {
        if (!formData.title || !formData.body || !formData.date || !formData.img_url || !formData.review) {
            setError({
                title: formData.title ? "" : "Titel is verplicht.",
                body: formData.body ? "" : "Beschrijving is verplicht.",
                date: formData.date ? "" : "Datum is verplicht.",
                img_url: formData.img_url ? "" : "Afbeelding URL is verplicht.",
                review: formData.review ? "" : "Review is verplicht.",
            });
            return;
        }

        if (!/\d{2}-\d{2}-\d{4}/.test(formData.date)) {
            console.error("De datum is niet geldig.");
            return;
        }

        setIsSubmitting(true);
        setSuccessMessage("");
        try {
            const result = await fetch("http://145.24.223.60:8001/spgames", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (result.ok) {
                setSuccessMessage("Spel succesvol toegevoegd!");
                setFormData({ title: "", body: "", date: "", img_url: "", review: "" });
            } else {
                console.error("Fout bij versturen van gegevens:", result.statusText);
            }
        } catch (error) {
            console.error("Fout bij het versturen van de gegevens:", error);
        }
        setIsSubmitting(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isSubmitting) {
            postData();
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Maak een Nieuw Singleplayer Game
            </h2>
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                {Object.entries({
                    title: "Titel",
                    body: "Beschrijving",
                    img_url: "Foto URL",
                    date: "Datum (dd-mm-jjjj)",
                    review: "Review van sterren (1-5)",
                }).map(([name, label]) => (
                    <div className="mb-4" key={name}>
                        <label htmlFor={name} className="block text-gray-700 font-medium">
                            {label}:
                        </label>
                        <input
                            type={name === "review" ? "number" : "text"}
                            id={name}
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Voer ${label.toLowerCase()} in`}
                            disabled={isSubmitting}
                            min={name === "review" ? 1 : undefined}
                            max={name === "review" ? 5 : undefined}
                        />
                        {error[name] && <p className="text-red-500 text-sm mt-2">{error[name]}</p>}
                    </div>
                ))}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className={`w-full p-3 font-semibold rounded-md transition duration-200 ${
                            isSubmitting
                                ? "border-2 border-[#7d47dd] text-white bg-[#d9a7ff] hover:bg-[#7d47dd]"
                                : "bg-[#7d47dd] text-white hover:bg-[#7d47dd]"
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Verzenden..." : "Verzenden"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SpgameCreateForm;
