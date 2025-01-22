import {Link, Outlet} from "react-router";

function Layout(){
    return(
      <div className="mx-auto max-w-screen">
          <header>
              <nav className=" flex gap-4">
                  <Link to={'/'} className="p-4 font-bold">Home</Link>
                  <Link to={'/spgames'} className="p-4 font-bold">Spgames</Link>
                  <Link to={'/about'} className="p-4 font-bold">About</Link>
                  <Link to={'/spgames/create'} className="p-4 font-bold">Create</Link>

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