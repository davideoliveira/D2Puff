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
      data: data,
      vendedor: vendedor,
      modelo: modelo,
      sabor: sabor,
      precoVenda: precoVenda
    }
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
              <label>Data:</label>
              <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Vendedor:</label>
              <input type="text" value={vendedor} onChange={(e) => setVendedor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Modelo:</label>
              <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Sabor:</label>
              <input type="text" value={sabor} onChange={(e) => setSabor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Preço de venda:</label>
              <input type="text" value={precoVenda} onChange={(e) => setPrecoVenda(e.target.value)} />
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
