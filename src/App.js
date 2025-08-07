import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MotoList from './js/MotoList';
import MotoForm from './js/MotoForm';
import MotoDetails from './js/MotoDetails';
import DeleteMoto from './js/DeleteMoto';
import EditMoto from './js/EditMoto';
import LoginPage from './js/LoginPage'; // Importe a página de login
import PrivateRoute from './js/PrivateRoute'; // Importe o componente de rota privada
import { AuthProvider, useAuth } from './js/AuthContext'; // Importe o AuthProvider e useAuth
import Localizacao from './js/localizacao';
import Footer from './js/Footer'; // Importe o novo componente de rodapé
import './css/App.css';


// Componente para o cabeçalho (agora com um botão de logout)
const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    return (
    <header>
            <div className="logo-container">
                <h1><span className="edson">Edson</span><span className="motos">Motos</span></h1>
            </div>
            <p className="slogan">Compra, venda e troca de motos novas e usadas</p>
            <nav>
                <a href="/">Home</a>
                {isAuthenticated && <a href="/admin">Admin</a>}
                {!isAuthenticated && <a href="/login">Login</a>}
                {isAuthenticated && <button onClick={logout}>Sair</button>}
            </nav>
    
        </header>
    );
};
const App = () => {
    return (
        <Router>
            <AuthProvider> 
                <Header /> {/* O cabeçalho agora está fora do .app-container */}
                <div className="app-container"> {/* Este div limita a largura do conteúdo principal */}
                    <main>
                        <Routes>
                            <Route path="/" element={<MotoList />} />
                            <Route path="/motos/:id" element={<MotoDetails />} />
                            <Route path="/login" element={<LoginPage />} />

                            {/* Rotas protegidas */}
                            <Route path="/admin" element={
                                <PrivateRoute>
                                    <MotoForm />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/edit/:id" element={
                                <PrivateRoute>
                                    <EditMoto />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/delete/:id" element={
                                <PrivateRoute>
                                    <DeleteMoto />
                                </PrivateRoute>
                            } />
                             
                        </Routes>  
                        <Localizacao />
                    </main>
                </div>
              
                <Footer /> {/* O rodapé agora está fora do .app-container */}
            </AuthProvider>
        </Router>
    );
};

export default App;