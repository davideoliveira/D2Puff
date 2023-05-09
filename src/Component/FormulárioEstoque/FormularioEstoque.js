import React, { useState } from 'react';
import './FormularioEstoque.css'

function EstoqueFormModal({ onClose, title, produto, operacaoBD }) {
  const [qtdDavi, setQtdDavi] = useState(produto.qtdDavi);
  const [qtdDuda, setQtdDuda] = useState(produto.qtdDuda);
  const [qtdNicole, setQtdNicole] = useState(produto.qtdNicole);

  const [modelo, setModelo] = useState(produto.modelo);
  const [sabor, setSabor] = useState(produto.sabor);

  const handleFormSubmit = (e) => {

    try{
      e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar a venda
    const modeloproduto = {...produto,
        modelo: modelo,
        sabor: sabor,
        qtdDavi: qtdDavi,
        qtdDuda: qtdDuda,
        qtdNicole: qtdNicole
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
              <label>Modelo:</label>
              <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Sabor:</label>
              <input type="text" value={sabor} onChange={(e) => setSabor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Qtd. Davi:</label>
              <input type="text" value={qtdDavi} onChange={(e) => setQtdDavi(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Qtd. Duda</label>
              <input type="text" value={qtdDuda} onChange={(e) => setQtdDuda(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Qtd. Nicole</label>
              <input type="text" value={qtdNicole} onChange={(e) => setQtdNicole(e.target.value)} />
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
