// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MotoList from './js/MotoList';
import MotoForm from './js/MotoForm';
import MotoDetails from './js/MotoDetails'; // Importa o novo componente
import EditMoto from './js/EditMoto'; // Importa o novo componente
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <header>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/admin">Admin</a>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<MotoList />} />
                        <Route path="/admin" element={<MotoForm />} />
                        
                        {/* Rota para edição */}
                        <Route path="/admin/edit/:id" element={<EditMoto />} /> 
                        
                        {/* Rota para detalhes */}
                        <Route path="/motos/:id" element={<MotoDetails />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;