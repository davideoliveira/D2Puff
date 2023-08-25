import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../FireBase/Configuracao';


import './Formulario.css'

function VendaFormModal({ onClose, title, venda, operacaoBD }) {
  const [data, setData] = useState(venda.data);
  const [vendedor, setVendedor] = useState(venda.vendedor);
  const [modeloSabor, setModeloSabor] = useState(venda.modeloSabor);
  const [precoVenda, setPrecoVenda] = useState(venda.precoVenda);

  const [items, setItems] = useState([]);
  const [produto, setProduto] = useState('')
  
  useEffect(() => {

    try{
      onValue(ref(database, '/estoque'), (snapshot) => {
      setItems([])
      const data = snapshot.val()
      if(data!== null) {
        Object.values(data).map((item) =>setItems((oldarray) => [...oldarray,item]))
      }
    })
    }
    catch(error){
      console.log(error)
    }  
  }, []);


  const handleFormSubmit = (e) => {

    try{
      e.preventDefault();
      items.forEach(element => {
        if (modeloSabor==element.modeloSabor){
          const modelovenda = {...venda,
            data: new Date(Date.now()).toLocaleDateString(),
            vendedor: vendedor,
            modeloSabor: modeloSabor,
            precoVenda: precoVenda,
            produto: element
          }
          operacaoBD(modelovenda)
      
          onClose();
        }
        
      });
    // Aqui você pode adicionar a lógica para salvar a venda
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
              </select>
            </div>
            <div className="form-group">
              <label>Modelo:</label>
              <select className='form-select' onChange={(item) =>setModeloSabor(item.target.value)}>
                <option></option>

                {items.map((item) => (
                  <option>{item.modeloSabor}</option>
                ))}
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
