import { useEffect, useState } from "react";
import Spgame from "./Spgame.jsx";

function Home() {
    const [spgames, setSpgames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(5); // Standaard 2 objecten per pagina
    const [totalItems, setTotalItems] = useState(0); // Totaal aantal items om paginering goed weer te geven

    // Haal de games op voor de huidige pagina
    const fetchSpgames = async () => {
        try {
            // Zorg ervoor dat limit goed wordt doorgegeven
            const url = `http://145.24.223.60:8001/spgames?page=${currentPage}&limit=${limit === 'all' ? 10000 : limit}`;
            console.log("API URL:", url); // Log de API URL om te controleren
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                console.error("Fout bij het ophalen van de data:", response.statusText);
                return;
            }

            const data = await response.json();
            console.log("Opgehaalde data:", data); // Log de opgehaalde data

            // Stel in de verkregen data in
            setSpgames(data.items); // Veronderstel dat de server een `items` array stuurt
            setTotalItems(data.pagination.totalItems); // Gebruik pagination voor het totaal aantal items
            setTotalPages(data.pagination.totalPages); // Gebruik pagination voor het aantal pagina's


        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    };

    // Haal gegevens op bij het laden of wanneer currentPage of limit verandert
    useEffect(() => {
        fetchSpgames();
    }, [currentPage, limit]); // We roepen fetchSpgames aan wanneer currentPage of limit verandert

    // Paginering functies
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            console.log("Je bevindt je al op de laatste pagina!");
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            console.log("Je bevindt je al op de eerste pagina!");
        }
    };

    // Verander de limit en reset de pagina naar 1 als de limit verandert
    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setCurrentPage(1); // Reset naar pagina 1 bij het veranderen van de limiet
    };

    return (
        <div className="bg-[#2f1c75] text-white min-h-screen flex flex-col">
            {/* Header */}
            <header className="relative h-96">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/spgames-achter.png')" }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-5xl font-extrabold text-[#d9a7ff]">Dit zijn de favoriete van Meerkat Gaming!</h1>
                    <p className="mt-4 text-2xl text-[#f0c8f0]">Ontdek de spannendste singleplayer games!</p>
                </div>
            </header>

            {/* Main content */}
            <main className="py-12 px-6 flex-grow bg-[#f5f5f5]">
                <h2 className="text-4xl font-semibold text-center mb-10 text-[#7d47dd]">Onze Singleplayer Games</h2>

                {/* Limit keuzemenu */}
                <div className="text-center mb-6">
                    <label htmlFor="limit" className="text-lg font-semibold mr-2 text-[#7d47dd]">Aantal per pagina:</label>
                    <select
                        id="limit"
                        value={limit}
                        onChange={handleLimitChange}
                        className="p-2 border border-[#7d47dd] rounded-lg text-[#7d47dd] bg-white hover:bg-[#f1f1f1] focus:outline-none focus:ring-2 focus:ring-[#7d47dd]"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="all">Alles</option>
                    </select>
                </div>

                {/* Weergave van spellen */}
                {spgames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {spgames.map((spgame) => (
                            <Spgame key={spgame.id} spgame={spgame} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl text-gray-600">Singleplayer games worden geladen...</div>
                )}

                {/* Paginering */}
                {limit !== 'all' && (
                    <div className="flex justify-center items-center mt-6 space-x-4">
                        {/* Vorige Pagina Knop */}
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 border border-[#7d47dd] rounded-lg text-[#7d47dd] ${currentPage === 1 ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-[#7d47dd] text-white hover:bg-[#5e2d9e]"} transition-all`}
                        >
                            Vorige
                        </button>

                        {/* Huidige Pagina */}
                        <span className="text-lg font-semibold mx-2 text-[#7d47dd]">
                            Pagina {currentPage} van {totalPages}
                        </span>

                        {/* Volgende Pagina Knop */}
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

            {/* Footer */}
            <footer className="mt-16 text-center text-gray-400">
                <p>&copy; 2025 Meerkat Gaming. Alle rechten voorbehouden.</p>
            </footer>
        </div>
    );
}

export default Home;
