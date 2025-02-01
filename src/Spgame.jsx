import { Link } from "react-router";
import React from "react";



function Spgame({ spgame, fetchSpgames }) {
    const deleteSpgame = async () => {
        try {
            const response = await fetch(`http://145.24.223.60:8001/spgames/${spgame.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            });

            if (response.status === 204) {
                fetchSpgames();
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
                <div className="flex justify-center mb-4">
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
                <div className="text-gray-800">



                        <span className="font-semibold">Release Date:</span>

                    <div className="text-sm text-gray-600">{spgame.date}</div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <Link
                        className="border-2 border-black bg-white p-2 rounded-lg text-center font-semibold text-black hover:bg-gray-100 transition-colors"
                        to={`/spgames/${spgame.id}`}>
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

export default Spgame;
