import React, { useState } from 'react';
import './Formulario.css'

function VendaFormModal({ onClose, title, venda, operacaoBD }) {
  const [data, setData] = useState(venda.data);
  const [vendedor, setVendedor] = useState(venda.vendedor);
  const [modelo, setModelo] = useState(venda.modelo);
  const [sabor, setSabor] = useState(venda.sabor);
  const [precoVenda, setPrecoVenda] = useState(venda.precoVenda);

  const handleFormSubmit = (e) => {

    try{
      e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar a venda
    const modelovenda = {...venda,
      data: new Date(Date.now()).toLocaleDateString(),
      vendedor: vendedor,
      modelo: modelo,
      sabor: sabor,
      precoVenda: precoVenda
    }
    console.log(modelovenda.precoVenda)

    operacaoBD(modelovenda)

    onClose();
    }catch(erro){
      
    }
    
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="modal-close">
            X
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleFormSubmit}>
            
            
            <div className="form-group">
              <label>Vendedor:</label>
              <select className='form-select' onChange={(item) =>setVendedor(item.target.value)}>
                <option></option>
                <option value="Davi">Davi</option>
                <option value="Duda">Duda</option>
                <option value="Nicole">Nicole</option>
              </select>
            </div>
            <div className="form-group">
              <label>Modelo:</label>
              <select className='form-select' onChange={(item) =>setModelo(item.target.value)}>
                <option></option>
                <option value="ELFBAR BC4000">ELFBAR BC4000</option>
                <option value="ELFBAR TE5000">ELFBAR TE5000</option>
              </select>
            </div>
            <div className="form-group">
              <label>Sabor:</label>
              <select className='form-select' onChange={(item) =>setSabor(item.target.value)}>
                <option></option>
                <option value="GREEN APPLE">GREEN APPLE</option>
                <option value="WATERMELON ICE">WATERMELON ICE</option>
                <option value="GRAPE">GRAPE</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preço de venda:</label>
              <input type="number" value={precoVenda} onChange={(e) => setPrecoVenda(e.target.value)} />
            </div>
            <div className="form-group">
              <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VendaFormModal;
