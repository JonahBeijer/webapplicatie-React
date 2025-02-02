import { useEffect, useState } from "react";
import Spgame from "./Spgame.jsx";

function Home() {
    const [spgames, setSpgames] = useState([]); // Original full collection
    const [filteredSpgames, setFilteredSpgames] = useState([]); // Filtered collection
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);  // Default to 8 items per page
    const [totalPages, setTotalPages] = useState(0);
    const [ratingFilter, setRatingFilter] = useState(0); // Rating filter
    const [searchQuery, setSearchQuery] = useState(''); // Search query
    const [transitioning, setTransitioning] = useState(false);

    // Fetch all games from the API
    const fetchSpgames = async () => {
        try {
            const url = `http://145.24.223.60:8001/spgames?limit=10000`;  // Get the full collection
            console.log("Fetching data from URL:", url);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                console.error("Error fetching data:", response.statusText);
                return;
            }

            const data = await response.json();
            setSpgames(data.items);  // Set the full collection
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // Apply filters based on search query and rating filter
    const applyFilters = () => {
        let filtered = spgames;

        // Apply rating filter - only include games with the exact rating
        if (ratingFilter > 0) {
            filtered = filtered.filter(spgame => Number(spgame.review) === ratingFilter);
        }

        // Apply search query filter
        if (searchQuery) {
            filtered = filtered.filter(spgame => spgame.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredSpgames(filtered); // Update the filtered collection
        setTotalPages(Math.ceil(filtered.length / limit)); // Recalculate total pages
        setCurrentPage(1); // Reset to the first page after applying filter
    };

    useEffect(() => {
        fetchSpgames();
    }, []);

    // Apply filters when ratingFilter or searchQuery change
    useEffect(() => {
        if (spgames.length > 0) {
            applyFilters();
        }
    }, [ratingFilter, searchQuery, spgames]);

    // Ensure currentPage is within valid bounds
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages); // Reset to last page if currentPage is out of bounds
        }
    }, [currentPage, totalPages]);

    // Change limit and reset to first page
    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value)); // Convert limit to number
        setCurrentPage(1); // Reset to first page when limit changes
    };

    const onDelete = (id) => {
        // Remove the game from the full collection and the filtered collection
        const updatedSpgames = spgames.filter(spgame => spgame.id !== id);
        const updatedFilteredSpgames = filteredSpgames.filter(spgame => spgame.id !== id);

        // Update the state with the new collections
        setSpgames(updatedSpgames);
        setFilteredSpgames(updatedFilteredSpgames);

        // Calculate the new paginated games after deletion
        const newPaginatedSpgames = updatedFilteredSpgames.slice((currentPage - 1) * limit, currentPage * limit);

        // If the current page has no items left, check if we can go to the previous page
        if (newPaginatedSpgames.length === 0) {
            // If the current page is greater than 1, go to the previous page
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1); // Go to the previous page
            } else {
                setCurrentPage(1); // If there are no previous pages, stay on the first page
            }
        }
    };

    // Paginate the filtered games
    const paginatedSpgames = filteredSpgames.slice((currentPage - 1) * limit, currentPage * limit);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setTransitioning(true); // Set transition state to true
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setTransitioning(false); // Set transitioning back to false after transition
            }, 300); // Match the duration of the transition
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setTransitioning(true); // Set transition state to true
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setTransitioning(false); // Set transitioning back to false after transition
            }, 300); // Match the duration of the transition
        }
    };

    // Adjust current page if filtered data is less than limit
    useEffect(() => {
        if (filteredSpgames.length < limit && currentPage > 1) {
            setCurrentPage(1);  // Reset to first page if the filtered data is smaller than limit
        }
    }, [filteredSpgames.length, limit]);

    return (
        <div className="bg-[#2f1c75] text-white min-h-screen flex flex-col">
            <header className="relative h-96">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/spgames-achter.png')" }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-5xl font-extrabold text-[#d9a7ff]">Dit zijn de reviews van Meerkat Gaming!</h1>
                    <p className="mt-4 text-2xl text-[#f0c8f0]">Ontdek singleplayer games voor jou!</p>
                </div>
            </header>

            <main className="py-12 px-6 flex-grow bg-[#f5f5f5]">
                <h2 className="text-4xl font-semibold text-center mb-10 text-[#7d47dd]">Onze Singleplayer Games</h2>

                {/* Search bar */}
                <div className="flex justify-between items-center mb-6 space-x-6">
                    {/* Search bar */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Zoek op titel..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 w-full border border-[#7d47dd] rounded-lg text-[#7d47dd] bg-white hover:bg-[#f1f1f1] focus:outline-none focus:ring-2 focus:ring-[#7d47dd]"
                        />
                    </div>

                    {/* Star rating filter */}
                    <div className="flex-shrink-0">
                        <label htmlFor="ratingFilter" className="text-lg font-semibold mr-2 text-[#7d47dd]">Filter op Sterren:</label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => setRatingFilter(rating)}
                                    className={`p-2 ${rating <= ratingFilter ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                                >
                                    &#9733; {/* Star Icon */}
                                </button>
                            ))}
                            <button
                                onClick={() => setRatingFilter(0)} // Reset filter
                                className={`p-2 ${ratingFilter === 0 ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                            >
                                Alle
                            </button>
                        </div>
                    </div>
                </div>

                {/* Display filtered games */}
                {paginatedSpgames.length > 0 ? (
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ${transitioning ? 'transition-opacity duration-300 opacity-50' : 'opacity-100'}`}>
                        {paginatedSpgames.map((spgame) => (
                            <Spgame key={spgame.id} spgame={spgame} onDelete={onDelete} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl text-gray-600">Geen games gevonden...</div>
                )}

                {/* Pagination */}
                {limit !== 'all' && (
                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 border border-[#7d47dd] rounded-lg text-[#7d47dd] ${currentPage === 1 ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-[#7d47dd] text-white hover:bg-[#5e2d9e]"} transition-all`}
                        >
                            Vorige
                        </button>

                        <span className="text-lg font-semibold mx-2 text-[#7d47dd]">
                            Pagina {currentPage} van {totalPages}
                        </span>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 border border-[#7d47dd] rounded-lg text-[#7d47dd] ${currentPage === totalPages ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-[#7d47dd] text-white hover:bg-[#5e2d9e]"} transition-all`}
                        >
                            Volgende
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;
