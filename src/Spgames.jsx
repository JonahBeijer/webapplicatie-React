import { useEffect, useState } from "react";
import Product from "./Product.jsx";

function Home() {
    const [products, setProducts] = useState(null);

    async function fetchProducts() {
        try {
            const response = await fetch('http://145.24.223.60:8001/spgames', {
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
            <header className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/achtergrondprg6.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <h1 className="text-4xl font-bold">Welkom bij Singleplayer Games</h1>
                    <p className="mt-2 text-xl">Ontdek de spannendste singleplayer games!</p>
                </div>
            </header>

            <main className="py-8 px-4">
                <h2 className="text-3xl font-semibold text-center mb-6">Onze Singleplayer games</h2>
                {products ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <Product key={product.id} product={product} fetchProducts={fetchProducts} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl">Spots worden geladen...</div>
                )}
            </main>
        </>
    );
}

export default Home;
