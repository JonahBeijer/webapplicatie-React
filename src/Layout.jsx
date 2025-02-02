import {Link, Outlet} from "react-router";
import React from "react";

function Layout(){
    return(
      <div className="mx-auto max-w-screen">
          <header>
              <nav className="flex justify-between items-center gap-4">
                  {/* Foto links */}
                  <div>
                      <img
                          src="/mglogo%20trans.png"
                          alt="Stokstaartje"
                          className="w-64 max- "
                      />
                  </div>
                  {/* Links rechts */}
                  <div className="flex gap-4">
                      <Link
                          to={'/'}
                          className="p-4 font-bold relative group transition duration-300"
                      >
                          Home
                          <span
                              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#d9a7ff] transition-all duration-300 group-hover:w-full"></span>
                      </Link>

                      <Link
                          to={'/spgames'}
                          className="p-4 font-bold relative group transition duration-300"
                      >
                          Spgames
                          <span
                              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#d9a7ff] transition-all duration-300 group-hover:w-full"></span>
                      </Link>

                      <Link
                          to={'/about'}
                          className="p-4 font-bold relative group transition duration-300"
                      >
                          About
                          <span
                              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#d9a7ff] transition-all duration-300 group-hover:w-full"></span>
                      </Link>

                      <Link
                          to={'/spgames/create'}
                          className="p-4 font-bold relative group transition duration-300"
                      >
                          Create
                          <span
                              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#d9a7ff] transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                  </div>

              </nav>

          </header>
          <main>
              <Outlet/>
          </main>
          <footer className=" bg-[#3a226d] text-gray-300 py-8 text-center">
              <div className="max-w-4xl mx-auto">

                  <div className="mt-4 flex justify-center gap-6">
                      <Link to="/privacy" className="hover:underline">Privacybeleid</Link>
                      <Link to="/terms" className="hover:underline">Gebruiksvoorwaarden</Link>
                      <Link to="/contact" className="hover:underline">Contact</Link>
                  </div>
                  <p className="mt-6 text-gray-400">&copy; 2025 Singleplayer Games. Alle rechten voorbehouden.</p>
              </div>
          </footer>
      </div>
    );
}

export default Layout