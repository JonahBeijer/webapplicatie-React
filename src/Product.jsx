import { Link } from "react-router";

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
        <article className="bg-amber-100 rounded-lg shadow-md p-4 max-w-sm mx-auto mb-2">
            <section className="flex items-center space-x-4">
                {/*<img*/}
                {/*    className="w-20 h-20 rounded-full object-cover"*/}
                {/*    src={product.imageUrl}*/}
                {/*    alt={`${product.title} photo`}*/}
                {/*/>*/}
                <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
            </section>
            <section className="mt-4 text-gray-700">
                <div>
                    <div className="mb-2">
                        <span className="font-semibold">Description:</span>
                    </div>
                    <div>{truncateText(product.body, 7)}</div>

                    <div className="mb-2 mt-2">
                        <span className="font-semibold">Review:</span>
                    </div>
                    <div>{truncateText(product.date, 7)}</div>
                </div>

                <div className="mt-4 flex justify-center">
                    <Link
                        className="border-2 border-black font-semibold bg-white p-2 rounded-lg w-full text-center"
                        to={`/spgames/${product.id}`}>
                        Read more
                    </Link>
                </div>

                <button
                    onClick={deleteSpgame}
                    className="border-2 border-black font-semibold p-2 rounded-lg w-full text-center bg-red-500">
                    Delete
                </button>
            </section>
        </article>
    );
}

export default Product;
