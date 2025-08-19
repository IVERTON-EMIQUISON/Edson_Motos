// src/js/DeleteMoto.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteMoto } from '../api/api';

const DeleteMoto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
 
    useEffect(() => {
        const handleDelete = async () => {
            const resultado = await Swal.fire({
                title: 'Tem certeza?',
                text: 'Você não poderá desfazer isso!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            });
            
            if (resultado.isConfirmed) {
                try {
                    await deleteMoto(id);
                    Swal.fire(
                        'Excluído!',
                        'A moto foi excluída com sucesso.',
                        'success'
                    );
                    navigate("/");
                } catch (err) {
                    Swal.fire(
                        'Erro!',
                        'Erro ao excluir a moto. Tente novamente.',
                        'error'
                    );
                    console.error(err);
                    navigate(`/motos/${id}`); // Volta para a página de detalhes se der erro
                }
            } else {
                navigate(`/motos/${id}`); // Se o usuário cancelar, volta para a página de detalhes
            }
        };

        handleDelete();
    }, [id, navigate]);

    return (
        
        <p>Redirecionando...</p>
    );
};

export default DeleteMoto;