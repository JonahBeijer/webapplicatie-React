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
                      <Link to={'/'} className="p-4 font-bold">Home</Link>
                      <Link to={'/spgames'} className="p-4 font-bold">Spgames</Link>
                      <Link to={'/about'} className="p-4 font-bold">About</Link>
                      <Link to={'/spgames/create'} className="p-4 font-bold">Create</Link>
                  </div>
              </nav>

          </header>
          <main>
              <Outlet/>
          </main>
          <footer>

          </footer>
      </div>
    );
}

export default Layout