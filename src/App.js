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
import './css/App.css';

// Componente para o cabeçalho (agora com um botão de logout)
const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    return (
        <header>
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
                <div className="app-container">
                    <Header />
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
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;