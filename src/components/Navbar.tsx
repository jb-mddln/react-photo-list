import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  setSearchText: (text: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchText }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/add-photo">Ajouter une photo</Link>
        </li>
      </ul>
      <input
        type="text"
        placeholder="Rechercher par titre"
        onChange={handleSearch}
      />
    </nav>
  );
};

export default Navbar;
