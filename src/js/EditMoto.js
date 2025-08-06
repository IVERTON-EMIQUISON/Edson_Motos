// EditMoto.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMotoDetails } from '../api/api'; // Importa a função da API
import MotoForm from './MotoForm'; // Importa o componente de formulário

const EditMoto = () => {
    const { id } = useParams(); // Pega o 'id' da URL
    const navigate = useNavigate();
    const [moto, setMoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMoto = async () => {
            try {
                const data = await getMotoDetails(id);
                setMoto(data);
            } catch (err) {
                setError('Erro ao carregar os dados da moto.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMoto();
    }, [id]); // O efeito roda novamente se o ID da URL mudar

    const handleSave = () => {
        // Lógica para o que fazer após salvar (ex: redirecionar para a lista)
        navigate('/admin'); 
    };

    if (loading) {
        return <p>Carregando dados da moto...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }
    
    if (!moto) {
        return <p>Moto não encontrada.</p>;
    }

    return (
        <div>
            <h1>Editar Moto</h1>
            <MotoForm motoToEdit={moto} onSave={handleSave} />
        </div>
    );
};

export default EditMoto;