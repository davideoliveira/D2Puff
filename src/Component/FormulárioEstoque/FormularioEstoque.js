import React, { useState } from 'react';
import './FormularioEstoque.css'

function EstoqueFormModal({ onClose, title, produto, operacaoBD }) {
  const [quantidade, setQuantidade] = useState(produto.quantidade);
  const [modeloSabor, setModeloSabor] = useState(produto.modeloSabor);
  const [custo, setCusto] = useState(produto.custo)

  const handleFormSubmit = (e) => {

    try{
      e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar a venda
    const modeloproduto = {...produto,
        modeloSabor: modeloSabor,
        quantidade: quantidade,
        custo: custo
    }
    operacaoBD(modeloproduto)
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
              <label>Modelo/Sabor:</label>
              <input type="text" value={modeloSabor} onChange={(e) => setModeloSabor(e.target.value)} />
            </div>
            
            <div className="form-group">
              <label>Quantidade:</label>
              <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Custo:</label>
              <input type="number" value={custo} onChange={(e) => setCusto(e.target.value)} />
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

export default EstoqueFormModal;
