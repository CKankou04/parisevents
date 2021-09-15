import React from 'react';
import { Link} from 'react-router-dom';
import '../css/Navbar.css'

function NavBar() {
    return (
        <>
            <nav className="containerNav">
                <ul className="navlist">
                    <li><Link to="/" className="link">Accueil</Link></li>
                    <li><Link to="/search" className="link">Liste des évènements</Link></li>
                    <li><Link to="/favoris" className="link">Favoris</Link></li>
                </ul>
            </nav>

        </>
    )
}

export default NavBar
