import { Link } from "react-router";
import React from "react";

const truncateText = (text, wordLimit) => {
    if (!text) return ""; // Controleer of de tekst bestaat
    const words = text.split(" ");
    const truncated = words.slice(0, wordLimit).join(" ");
    return words.length > wordLimit ? `${truncated}...` : truncated;
};

function Product({ product, fetchProducts }) {
    const deleteSpgame = async () => {
        try {
            const response = await fetch(`http://145.24.223.60:8001/spgames/${product.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            });

            if (response.status === 204) {
                fetchProducts();
            } else {
                console.error("Failed to delete the Singleplayer game ");
            }
        } catch (error) {
            console.error("An error occurred while deleting the Singleplayer game:", error);
        }
    };

    return (
        <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-200">
            <section className="relative">
                <div className="flex justify-center mb-16">
                    <img
                        src="/meerkat.jpg"
                        alt="Stokstaartje"
                        className="rounded-xl shadow-lg w-full max-w-md"
                    />

                </div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-semibold">{product.title}</h2>
                </div>
            </section>

            <section className="p-4">
                <div className="text-gray-800">
                    <div className="mb-2">
                        <span className="font-semibold">Description:</span>
                    </div>
                    <div className="text-sm text-gray-600">{truncateText(product.body, 15)}</div>

                    <div className="mb-2 mt-4">
                        <span className="font-semibold">Release Date:</span>
                    </div>
                    <div className="text-sm text-gray-600">{product.date}</div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <Link
                        className="border-2 border-black bg-white p-2 rounded-lg text-center font-semibold text-black hover:bg-gray-100 transition-colors"
                        to={`/spgames/${product.id}`}>
                        Read More
                    </Link>

                    <button
                        onClick={deleteSpgame}
                        className="border-2 border-red-500 text-white bg-red-500 p-2 rounded-lg text-center font-semibold hover:bg-red-600 transition-colors">
                        Delete
                    </button>
                </div>
            </section>
        </article>
    );
}

export default Product;
