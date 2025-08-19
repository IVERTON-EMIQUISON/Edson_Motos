// MotoForm.js
import React, { useState } from 'react';
import { createMoto, updateMoto } from '../api/api';
import Swal from 'sweetalert2'; 
import '../css/App.css'; // Certifique-se de ter um CSS para as miniaturas

import { useNavigate } from 'react-router-dom';

// Função auxiliar para converter arquivo para Base64
const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

 const MotoForm = ({ motoToEdit = null, onSave = () => {} }) => {
    const [formData, setFormData] = useState({
        modelo: motoToEdit?.modelo || '',
        marca: motoToEdit?.marca || '',
        cilindradas: motoToEdit?.cilindradas || '',
        ano: motoToEdit?.ano || '',
        kilometragem: motoToEdit?.kilometragem || '',
        preco: motoToEdit?.preco || '',
        cor: motoToEdit?.cor || '',
        status: motoToEdit?.status || '',
        descricao: motoToEdit?.descricao || '',
        // Armazena os arquivos de imagem antes de serem convertidos
        novasImagens: [], 
        imagensExistentes: motoToEdit?.imagens || [],
        imagensParaRemover: [],
        
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Função para converter e adicionar novos arquivos
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            novasImagens: [...prev.novasImagens, ...files]
        }));
    };
    
    // Função para remover uma imagem existente
    const handleImageRemove = (urlToRemove) => {
        setFormData(prev => ({
            ...prev,
            imagensExistentes: prev.imagensExistentes.filter(url => url !== urlToRemove),
            imagensParaRemover: [...prev.imagensParaRemover, urlToRemove],
        }));
    };

    // Função para remover uma imagem nova antes de enviar
    const handleNewImageRemove = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            novasImagens: prev.novasImagens.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Converte apenas os novos arquivos para Base64 antes de enviar
            const base64Images = await Promise.all(
                formData.novasImagens.map(file => convertFileToBase64(file))
            );

            const motoDataToSubmit = {
                ...formData,
                imagensBase64: base64Images, // Envia as novas imagens em base64
                // A API precisa saber quais imagens manter e quais remover
                imagens: formData.imagensExistentes, 
            };

            if (motoToEdit) {
                await updateMoto(motoToEdit.id, motoDataToSubmit);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Moto atualizada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate('/');
            } else {
                await createMoto(motoDataToSubmit);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Moto adicionada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate('/'); // Redireciona para a lista de motos após adicionar
            }
            if (typeof onSave === 'function') {
                onSave();
            }
        } catch (err) {
            setError('Erro ao salvar a moto. Tente novamente.');
            console.error(err);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao salvar a moto. Tente novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="moto-form">
            <h2>{motoToEdit ? 'Editar Moto' : 'Adicionar Nova Moto'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <label>Modelo: <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required /></label>
            <label>Marca: <input type="text" name="marca" value={formData.marca} onChange={handleChange} required /></label>
            <label>Cilindradas: <input type="number" name="cilindradas" value={formData.cilindradas} onChange={handleChange} required /></label>
            <label>Ano: <input type="number" name="ano" value={formData.ano} onChange={handleChange} required /></label>
            <label>Kilometragem: <input type="number" name="kilometragem" value={formData.kilometragem} onChange={handleChange} required /></label>
            <label>Preço: <input type="number" name="preco" value={formData.preco} onChange={handleChange} step="0.01" required /></label>
            <label>Cor: <input type="text" name="cor" value={formData.cor} onChange={handleChange} required /></label>
            
            <label>Status:
                <select name="status" value={formData.status} onChange={handleChange} required>
                    <option value="">Selecione um status</option>
                    <option value="disponivel">Disponível</option>
                    <option value="vendida">Vendida</option>
                    <option value="manutencao">Em Manutenção</option>
                </select>
            </label>
            
            <label>Descrição: <textarea name="descricao" value={formData.descricao} onChange={handleChange} /></label>
            
            <label>Imagens: <input type="file" onChange={handleFileChange} multiple /></label>
            
            {/* Seção para visualizar miniaturas e remover imagens */}
            <div className="image-preview-container">
                {/* Miniaturas de imagens existentes (no modo de edição) */}
                {formData.imagensExistentes.map((url, index) => (
                    <div key={`existing-${index}`} className="image-preview">
                        <img src={url} alt={`Imagem existente ${index}`} />
                        <button type="button" onClick={() => handleImageRemove(url)}>Remover</button>
                    </div>
                ))}

                {/* Miniaturas de novas imagens selecionadas */}
                {formData.novasImagens.map((file, index) => (
                    <div key={`new-${index}`} className="image-preview">
                        <img src={URL.createObjectURL(file)} alt={`Nova imagem ${index}`} />
                        <button type="button" onClick={() => handleNewImageRemove(index)}>Remover</button>
                    </div>
                ))}
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Moto'}
            </button>
        </form>
    );
};

export default MotoForm;