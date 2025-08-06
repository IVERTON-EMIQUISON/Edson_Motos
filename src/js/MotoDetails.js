// MotoDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMotoDetails} from '../api/api'; // Certifique-se de que o caminho está correto
import { Link } from 'react-router-dom';
import '../css/Detalhes.css'; // Importe o CSS para estilização
import { AuthProvider, useAuth } from '../js/AuthContext'; // Importe o AuthProvider e useAuth
import { deleteMoto } from '../api/api'; // Certifique-se de que a API de deleção existe
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MotoDetails = () => {
    const { isAuthenticated } = useAuth();
    const { id } = useParams();
    const [moto, setMoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

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
    const handleDelete = async () => {
        // Use o modal do SweetAlert2 para a confirmação
        const resultado = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá desfazer isso!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        // Se o usuário confirmar, faça a exclusão
        if (resultado.isConfirmed) {
            try {
                await deleteMoto(id);
                // Feedback de sucesso com SweetAlert2
                Swal.fire(
                    'Excluído!',
                    'A moto foi excluída com sucesso.',
                    'success'
                );
                navigate("/");
            } catch (err) {
                // Feedback de erro com SweetAlert2
                Swal.fire(
                    'Erro!',
                    'Erro ao excluir a moto. Tente novamente.',
                    'error'
                );
                console.error(err);
            }
        }
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
        <AuthProvider> 
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
                <div className="moto-actions">
                    <Link to="/" className="btn-voltar">Voltar</Link>
                    {/* Links protegidos para editar e excluir */}
                    {isAuthenticated && (
                        <>
                            <Link to={`/admin/edit/${moto.id}`} className="btn-editar">Editar</Link>
                            <Link to={`/admin/delete/${moto.id}`} className="btn-excluir">Excluir</Link>
                        </>
                    )}
                </div>
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
     </AuthProvider>
    );
};

export default MotoDetails;