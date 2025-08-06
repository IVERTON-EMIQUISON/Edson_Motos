// MotoList.js
import React, { useEffect, useState } from 'react';
import { getMotos } from '../api/api';
import '../App.css';

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
                                {/* Exemplo de link para página de detalhes, se você tiver uma */}
                                <a href={`/motos/${moto.id}`}>Ver Detalhes</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MotoList;