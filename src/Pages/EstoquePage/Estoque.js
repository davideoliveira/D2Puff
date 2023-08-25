import React, { useState, useEffect } from 'react';
import Header from '../../Component/Header.js/Header';
import EstoqueFormModal from '../../Component/FormulárioEstoque/FormularioEstoque';
import { addEstoque, editItem, deletaEstoque } from '../../FireBase/DataBase';
import { database } from '../../FireBase/Configuracao';
import { ref, onValue } from 'firebase/database';
import './Estoque.css'

function EstoqueManager() {

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalEstoque, setModalEstoque] = useState(null)
  const [operacaoBD, setopracaoBD] = useState(null)


 const [items, setItems] = useState([]);
  
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
 
  const handleAddItem = (e) => {

    setModalTitle('Adicionar Estoque');
    setModalEstoque(e);
    setShowModal(true);
    setopracaoBD(() => addEstoque)
  };

  const editProduto = (produto) => {

    setModalTitle('Editar Venda');
    setModalEstoque(produto);
    setShowModal(true);
    setopracaoBD(() => editItem)
    
  };

  const handleExcluirEstoque = (idvenda) => {
    deletaEstoque(idvenda)
  }; 

  return (
    <div>
      <Header/>
      <h1>Gerenciamento de Estoque</h1>

      {showModal && (
        <EstoqueFormModal
          onClose={() => setShowModal(false)}
          title={modalTitle}
          produto={modalEstoque}
          operacaoBD={operacaoBD}
        />
      )}
      <div style={{textAlign:'center'}}>
        <button className="btnestoque" type="submit" onClick={handleAddItem}>Adicionar</button>
      </div>
        
      <table>
        <thead>
          <tr>
            <th>Modelo/Sabor</th>
            <th>Quantidade</th>
            <th>Custo</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.modeloSabor}</td>
              <td>{item.quantidade} Unidade(s)</td>
              <td>R${item.custo},00</td>

              <td>
                <button class="btn-edit"  onClick={() => editProduto(item)}>Editar</button> 
                <button class="btn-edit btn-danger"  onClick={() => handleExcluirEstoque(item.id)}>Excluir</button> 

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstoqueManager;
