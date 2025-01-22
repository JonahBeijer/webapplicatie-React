import {  useState } from "react";

function SpgameCreateForm(){

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
                    body: JSON.stringify(formData),  // Verzend de formData in de body van de request
                });

                if (result.ok) {
                    const data = await result.json();  // Verkrijg de JSON response
                    console.log('Gegevens succesvol verstuurd:', data);  // Log het resultaat van de server
                } else {
                    console.error('Fout bij versturen van gegevens:', result.statusText);  // Log een foutbericht als de status niet goed is
                }
            } catch (error) {
                console.error('Fout bij het versturen van de gegevens:', error);  // Log een foutmelding als er een netwerkfout optreedt
            }
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            postData();  // Roep de postData functie aan bij het verzenden van het formulier
        }

        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                />

                <label htmlFor="review">Review:</label>
                <input
                    type="text"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />

                <button type="submit">Verzenden</button>
            </form>
        );
    }


export default SpgameCreateForm