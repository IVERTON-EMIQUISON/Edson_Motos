// MotoList.js
import React, { useEffect, useState } from 'react';
import { getMotos } from '../api/api';
import '../css/App.css';
import { Link } from 'react-router-dom';

const MotoList = () => {
    const [motos, setMotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMotos = async () => {
            try {
                const data = await getMotos();
                setMotos(data);
            } catch (err) {
                setError('Erro ao carregar as motos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMotos();
    }, []); // O array vazio [] garante que o useEffect rode apenas uma vez, na montagem do componente.

    if (loading) {
        return <p>Carregando motos...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

     return (
        <div className="moto-list-container">
            <h1>Estoque de Motos</h1>
            {motos.length === 0 ? (
                <p>Nenhuma moto encontrada.</p>
            ) : (
                <div className="motos-grid">
                    {motos.map(moto => (
                        <div key={moto.id} className="moto-card">
                            {moto.imagens && moto.imagens.length > 0 && (
                                <img src={moto.imagens[0]} alt={moto.modelo} className="moto-image" />
                            )}
                            <div className="moto-info">
                                <h3>{moto.modelo} - {moto.marca}</h3>
                                <p>Preço: R$ {moto.preco.toFixed(2)}</p>
                                <p>Ano: {moto.ano}</p>
                                <div className="moto-actions">
                                    <Link to={`/motos/${moto.id}`} className="btn-detalhes">Ver Detalhes</Link>
                                </div>
                            </div>
                        </div>
                    ))}    
                    <section className="location-section">
                        <div className="container">
                            <h2>Onde Estamos</h2>
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.7679666617321!2d-38.20728132487272!3d-6.121029398628038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7bb33397f21d709%3A0x12447efcbe656a7!2sEDSON%20MOTOS!5e0!3m2!1spt-BR!2sbr!4v1754095537700!5m2!1spt-BR!2sbr"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localização da loja"
                                ></iframe>
                            </div>
                        
                            <a href="https://maps.app.goo.gl/6VNAZeQXrv1mVbGj6" target="_blank" className="btn-secondary" rel="noopener noreferrer">
                                Traçar Rota <i className="fas fa-map-marker-alt"></i>
                            </a>
                        </div>
                    </section>
                </div>

            )}
        </div>
    );
};
 


export default MotoList;