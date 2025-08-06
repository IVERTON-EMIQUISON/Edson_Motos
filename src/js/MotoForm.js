// MotoForm.js
import React, { useState } from 'react';
import { createMoto, updateMoto } from '../api/api';
import Swal from 'sweetalert2'; 

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
        preco: motoToEdit?.preco || '',
        cor: motoToEdit?.cor || '',
        status: motoToEdit?.status || '',
        descricao: motoToEdit?.descricao || '',
        imagensBase64: [],
        imagensExistentes: motoToEdit?.imagens || [],
        imagensParaRemover: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const base64Images = await Promise.all(files.map(file => convertFileToBase64(file)));
        setFormData(prev => ({ ...prev, imagensBase64: base64Images }));
    };
    
    const handleImageRemove = (urlToRemove) => {
        setFormData(prev => ({
            ...prev,
            imagensExistentes: prev.imagensExistentes.filter(url => url !== urlToRemove),
            imagensParaRemover: [...prev.imagensParaRemover, urlToRemove],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (motoToEdit) {
                await updateMoto(motoToEdit.id, formData);
                 Swal.fire({
                    title: 'Sucesso!',
                    text: 'Moto atualizada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
               
            } else {
                await createMoto(formData);
                 Swal.fire({
                    title: 'Sucesso!',
                    text: 'Moto adicionada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
               
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
            
            {/* Campos do formulário */}
            <label>Modelo: <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required /></label>
            <label>Marca: <input type="text" name="marca" value={formData.marca} onChange={handleChange} required /></label>
            
            {/* Adicione os outros campos aqui */}
            <label>Cilindradas: <input type="number" name="cilindradas" value={formData.cilindradas} onChange={handleChange} required /></label>
            <label>Ano: <input type="number" name="ano" value={formData.ano} onChange={handleChange} required /></label>
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
            
            {/* ... (Resto do código do formulário permanece o mesmo) */}

            <button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Moto'}
            </button>
        </form>
    );
};

export default MotoForm;