import { useState } from "react";

function SpgameCreateForm() {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        date: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const postData = async () => {
        try {
            const result = await fetch('http://145.24.223.60:8001/spgames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (result.ok) {
                const data = await result.json();
                console.log('Gegevens succesvol verstuurd:', data);
            } else {
                console.error('Fout bij versturen van gegevens:', result.statusText);
            }
        } catch (error) {
            console.error('Fout bij het versturen van de gegevens:', error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postData();
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Maak een Nieuw Singleplayer Game</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Voer de titel in"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="body" className="block text-gray-700 font-medium">Description:</label>
                    <input
                        type="text"
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Geef een beschrijving van het spel"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="date" className="block text-gray-700 font-medium">Date:</label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Voer de datum in"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
                        Verzenden
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SpgameCreateForm;
