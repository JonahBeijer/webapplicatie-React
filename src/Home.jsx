import { useEffect, useState } from "react";
import Product from "./Product.jsx"

function Home() {
    const [products, setProducts] = useState(null);
    async function fetchProducts() {
        try {
            const response = await fetch('https://prg06-node-express.antwan.eu/spots/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            setProducts(data.items); // Assuming `data.items` contains the list of spots
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }
    useEffect(() => {


        fetchProducts(); // Call the async function inside useEffect
    }, []); // Empty dependency array ensures the effect runs only once

    console.log(products);

    return (
        <>

            <h1>Producten</h1>
            <main>
                {products ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
                        {products.map((product) => (
                            <Product key={product.id} product={product} fetchProducts={fetchProducts}/>
                        ))}
                    </div>
                ) : (
                    <div>Spots worden geladen...</div>
                )}
            </main>
        </>
    );
}

    export default Home