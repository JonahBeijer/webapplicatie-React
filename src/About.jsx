import React from "react";

function About() {
    return (
        <div className="bg-[#2f1c75] text-white min-h-screen flex flex-col">

            <header className="relative h-96">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/about-us-bg.png')" }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-5xl font-extrabold text-[#d9a7ff]">Over Meerkat Gaming</h1>
                    <p className="mt-4 text-2xl text-[#f0c8f0] max-w-3xl">
                        Al jarenlang jouw betrouwbare bron voor eerlijke en diepgaande recensies van singleplayer-games.
                    </p>
                </div>
            </header>


            <main className="py-12 px-6 flex-grow bg-[#f5f5f5]">
                {/* About Section */}
                <section className="text-center mb-16">
                    <h2 className="text-4xl font-semibold text-[#7d47dd] mb-6">Onze Missie</h2>
                    <p className="text-gray-600 text-lg max-w-4xl mx-auto">
                        Meerkat Gaming is opgericht in 2004 en specialiseert zich in het reviewen van singleplayer-games. Ons doel is om gamers te ondersteunen met eerlijke, objectieve en diepgaande analyses, zodat ze vol vertrouwen de beste games kunnen kiezen. Transparantie en passie staan bij ons centraal.
                    </p>
                </section>


                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-[#7d47dd] text-center mb-6">Ontmoet Het Team</h2>
                    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
                        <img
                            src="/meerkats.jpg"
                            alt="Teamfoto"
                            className="w-full rounded-lg border-4 border-[#7d47dd]"
                        />
                        <p className="text-gray-600 text-center mt-4">
                            Ons toegewijde team van reviewers en analisten zet zich in om de meest betrouwbare informatie over games te bieden.
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className="text-center">
                    <h2 className="text-3xl font-semibold text-[#7d47dd] mb-6">Onze Waarden</h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Bij Meerkat Gaming geloven we in kwaliteit, eerlijkheid en een gedeelde passie voor singleplayer-ervaringen. Samen bouwen we aan een gemeenschap van gamers die onze toewijding waarderen.
                    </p>
                </section>
            </main>

        </div>
    );
}

export default About;
