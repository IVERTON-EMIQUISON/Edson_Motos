// MotoDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMotoDetails } from '../api/api'; // Certifique-se de que o caminho está correto

const MotoDetails = () => {
    const { id } = useParams();
    const [moto, setMoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchMoto = async () => {
            try {
                const data = await getMotoDetails(id);
                setMoto(data);
            } catch (err) {
                setError('Erro ao carregar os detalhes da moto.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMoto();
    }, [id]);

    const nextImage = () => {
        if (moto.imagens && moto.imagens.length > 1) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % moto.imagens.length);
        }
    };
    
    const prevImage = () => {
        if (moto.imagens && moto.imagens.length > 1) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + moto.imagens.length) % moto.imagens.length);
        }
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    if (loading) {
        return <p>Carregando detalhes da moto...</p>;
    }
    
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!moto) {
        return <p>Moto não encontrada.</p>;
    }

    return (
        <div className="moto-details-container">
            <div className="moto-gallery">
                <div className="carousel">
                    {moto.imagens && moto.imagens.length > 0 ? (
                        <>
                            <img src={moto.imagens[currentImageIndex]} alt={moto.modelo} className="main-image" />
                            {moto.imagens.length > 1 && (
                                <>
                                    <button onClick={prevImage} className="carousel-control prev">‹</button>
                                    <button onClick={nextImage} className="carousel-control next">›</button>
                                </>
                            )}
                        </>
                    ) : (
                        <p>Nenhuma imagem disponível.</p>
                    )}
                </div>
                {/* Miniaturas das imagens */}
                {moto.imagens && moto.imagens.length > 1 && (
                    <div className="thumbnails">
                        {moto.imagens.map((url, index) => (
                            <img 
                                key={index}
                                src={url} 
                                alt={`Miniatura ${index + 1}`} 
                                className={`thumbnail-image ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => handleThumbnailClick(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
            
            <div className="moto-info-container"> {/* Container para os detalhes */}
                <h1>{moto.modelo}</h1>
                <p className="moto-marca">{moto.marca}</p>
                <p className="moto-price">R$ {moto.preco.toFixed(2)}</p>
                <p className="moto-status">{moto.status}</p>
                <div className="moto-specs">
                    <p><strong>Ano:</strong> {moto.ano}</p>
                    <p><strong>Cor:</strong> {moto.cor}</p>
                    <p><strong>Cilindradas:</strong> {moto.cilindradas}cc</p>
                    <p><strong>Descrição:</strong> {moto.descricao}</p>
                </div>
            </div>
        </div>
    );
};

export default MotoDetails;