import React from 'react';
import { Link } from 'wouter';
import './Home.css'
function Home() {
  return (
    <div className='container-home'>
      <h1>¿Quién eres?</h1>
      <nav>
        <Link className='links' href="/admin">Administrador</Link>
        <Link className='links' href="/resident">Residente</Link>
      </nav>
    </div>
  );
}

export default Home;
