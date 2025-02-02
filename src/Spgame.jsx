import { Link } from "react-router";
import React from "react";

function Spgame({ spgame, onDelete }) {
    const deleteSpgame = async () => {
        try {
            console.log(`Attempting to delete spgame with ID: ${spgame.id}`); // Log the ID
            const response = await fetch(`http://145.24.223.60:8001/spgames/${spgame.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            });

            if (response.status === 204) {
                console.log(`Successfully deleted spgame with ID: ${spgame.id}`); // Log success
                onDelete(spgame.id); // Call the onDelete callback
            } else {
                console.error("Failed to delete the Singleplayer game. Status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred while deleting the Singleplayer game:", error);
        }
    };

    // Function to generate stars based on review score
    const renderStars = (rating) => {
        const totalStars = 5;
        const filledStars = Math.round(rating); // Rond het cijfer af naar het dichtstbijzijnde gehele getal
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <span
                    key={i}
                    className={`text-2xl ${i <= filledStars ? "text-yellow-400" : "text-gray-300"}`}>
                ★
            </span>
            );
        }

        return stars;
    };


    return (
        <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-200">
            <section className="relative">
                <div className="flex justify-center ">
                    <img
                        src={spgame.img_url}
                        alt={spgame.title}
                        className="rounded-xl shadow-lg w-full max-w-md h-48 object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-semibold">{spgame.title}</h2>
                </div>
            </section>

            <section className="p-4">
                {/* Display stars based on review */}
                <div className="flex items-center justify-center mr-20 ml-6">
                    <span className="font-semibold">Rating:</span>
                    <div className="flex space-x-2 items-center justify-center">
                        {renderStars(spgame.review)} {/* Render stars based on review */}
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <Link
                        className="border-2 border-black bg-white p-2 rounded-lg text-center font-semibold text-black hover:bg-gray-100 transition-colors"
                        to={`/spgames/${spgame.id}`}>
                        Read More
                    </Link>

                    <button
                        onClick={deleteSpgame}
                        className="border-2 border-[#d9a7ff] text-white bg-[#d9a7ff] p-2 rounded-lg text-center font-semibold hover:bg-[#7d47dd] transition-colors">
                        Delete
                    </button>
                </div>
            </section>
        </article>
    );
}

export default Spgame;