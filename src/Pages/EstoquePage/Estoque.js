import React, { useState, useEffect } from 'react';
import Header from '../../Component/Header.js/Header';
import EstoqueFormModal from '../../Component/FormulárioEstoque/FormularioEstoque';
import { addEstoque, editItem } from '../../FireBase/DataBase';
import { database } from '../../FireBase/Configuracao';
import { ref, onValue } from 'firebase/database';
import './Estoque.css'


// import firebase from 'firebase/app';
// import 'firebase/database';

function EstoqueManager() {

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalEstoque, setModalEstoque] = useState('')
  const [operacaoBD, setopracaoBD] = useState(null)


  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0 });

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
    // const itemsRef = firebase.database().ref('estoque');
    // itemsRef.on('value', (snapshot) => {
    //   const items = snapshot.val();
    //   const itemList = [];
    //   for (let id in items) {
    //     itemList.push({ id, ...items[id] });
    //   }
    //   setItems(itemList);
    // });
  }, []);

  const handleAddItem = (e) => {

    setModalTitle('Adicionar Estoque');
    setModalEstoque(e);
    setShowModal(true);
    setopracaoBD(() => addEstoque)

    // // e.preventDefault();
    // // const itemsRef = firebase.database().ref('estoque');
    // itemsRef.push(newItem);
    // setNewItem({ name: '', quantity: 0, price: 0 });
  };

  const editProduto = (produto) => {

    setModalTitle('Editar Venda');
    setModalEstoque(produto);
    setShowModal(true);
    setopracaoBD(() => editItem)
    // const itemRef = firebase.database().ref(`/estoque/${id}`);
    // itemRef.remove();
  };

  const handleReportLoss = (id, lossQuantity) => {
    // // const itemRef = firebase.database().ref(`/estoque/${id}`);
    // const updatedQuantity = items.find((item) => item.id === id).quantity - lossQuantity;
    // itemRef.update({ quantity: updatedQuantity });
  };

  const handleChangeNewItem = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
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
        <button className="btnestoque" type="submit" onClick={handleAddItem}>Adicionar</button>
        
      <table>
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Sabor</th>
            <th>Qtd. Davi</th>
            <th>Qtd. Duda</th>
            <th>Qtd. Nicole</th>

          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.modelo}</td>
              <td>{item.sabor}</td>
              <td>{item.qtdDavi}</td>
              <td>{item.qtdDuda}</td>
              <td>{item.qtdNicole}</td>


              <td>
                <button class="btn-edit"  onClick={() => editProduto(item)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstoqueManager;
