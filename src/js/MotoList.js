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
                </div>
            )}
        </div>
    );
};

export default MotoList;