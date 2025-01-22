import { useParams } from "react-router";
import { useEffect, useState } from "react";

function SpotDetail() {
    const { id } = useParams();
    const [products, setProducts] = useState(null);

    useEffect(() => {
        loadSpot();
    }, []);

    async function loadSpot() {
        try {
            const response = await fetch(`http://145.24.223.60:8001/spgames${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setProducts(data); // Pas aan op basis van jouw API-structuur
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }

    return (
        <div>
            {products ? (
                <div>
                    <h1>{products.title}</h1>
                    <p>{products.description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SpotDetail;
