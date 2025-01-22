import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Spgame from "./Spgame.jsx";

function SpgameDetail() {
    const { id } = useParams();
    const [spgame, setSpgame] = useState(null);
    const [error, setError] = useState(null);
    console.log(id);

    useEffect(() => {
        loadSpgame();
    }, [id]);  // Laad opnieuw wanneer de id verandert

    async function loadSpgame() {
        try {
            const response = await fetch(`http://145.24.223.60:8001/spgames/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch the Singleplayer game');
            }

            const data = await response.json();
            setSpgame(data); // Pas aan op basis van jouw API-structuur
        } catch (error) {
            setError('Er is een fout opgetreden: ' + error.message);
        }
    }

    return (
        <div>
            {error && <p>{error}</p>}
            {spgame ? (
                <div>
                    <h1>{spgame.title}</h1>
                    <p>{spgame.body}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SpgameDetail;
