const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-red-100 text-red-600 border border-red-400 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold">404 - Pagina niet gevonden</h2>
                <p className="text-lg">De pagina die je zoekt bestaat niet.</p>
                <a href="/" className="text-blue-600 underline">Terug naar Home</a>
            </div>
        </div>
    );
};

export default NotFound;
