// Header.tsx
import React from 'react';
import './Header.css';

interface HeaderProps {
  showHomeButton: boolean;
  onBack: () => void;
}

function Header({ showHomeButton, onBack }: HeaderProps) {
  return (
    <header>  
      {showHomeButton && <button onClick={onBack} className='back'>Volver</button>}
      <h1> Gestor de incidencias </h1>
    </header>
  );
}

export default Header;
