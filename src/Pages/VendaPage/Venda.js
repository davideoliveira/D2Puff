import React, { useEffect, useState } from 'react';
import './Venda.css';
import Header from '../../Component/Header.js/Header';
import VendaFormModal from '../../Component/FormularioVenda/Formulario';
import { database } from '../../FireBase/Configuracao';
import { ref, onValue } from 'firebase/database';
import { adicionarVenda, deletaVenda, editarVenda } from '../../FireBase/DataBase';


function SalesPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalVenda, setModalVenda] = useState(null);
  const [operacaoBD, setopracaoBD] = useState(null)
  const [vendas, setVendas] = useState([])

  useEffect(() => {
    try{
      onValue(ref(database, '/vendas'), (snapshot) => {
      setVendas([])
      const data = snapshot.val()
      if(data!== null) {
        Object.values(data).map((item) =>setVendas((oldarray) => [...oldarray,item]))
      }
    })
    }
    catch(error){
      console.log(error)
    }  
    
  },[])

  // const dbRef = ref(getDatabase());
  // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

  // const tablevenda = () => {
  //   get(child(database,))
  // }



  const handleNovaVendaClick = (venda) => {
    setModalTitle('Nova Venda');
    setModalVenda(venda);
    setShowModal(true);
    setopracaoBD(() => adicionarVenda)
  };

  const handleEditarVendaClick = (venda) => {
    setModalTitle('Editar Venda');
    setModalVenda(venda);
    setShowModal(true);
    setopracaoBD(() => editarVenda)
  };

  const handleExcluirVendaClick = (idvenda) => {
    deletaVenda(idvenda)
  }; 

  return (
    <div>
      <Header />
      <h1>Vendas</h1>
      {showModal && (
        <VendaFormModal
          onClose={() => setShowModal(false)}
          title={modalTitle}
          venda={modalVenda}
          operacaoBD={operacaoBD}
        />
      )}
      <div style={{textAlign:'center'}}>
        <button className="btn btn-primary me-2" onClick={handleNovaVendaClick}>Nova venda</button>
      </div>
      <div className="table-responsive">
      <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Data</th>
              <th scope="col">Modelo/Sabor</th>
              <th scope="col">Preço de venda</th>
              <th scope="col">Vendedor</th>
            </tr>
          </thead>
          <tbody>
            {vendas.reverse().map((venda, index) => (
              <tr key={venda.id}>
                <th scope="row">{index + 1}</th>
                <td>{venda.data}</td>
                <td>{venda.modeloSabor}</td>
                <td>R${venda.precoVenda},00</td>
                <td>{venda.vendedor}</td>
                <td>
                  <button className="btn btn-danger editaveis" onClick={() => handleExcluirVendaClick(venda.id)}>
                    Excluir venda
                  </button>
                  <button className="btn btn-secondary editaveis" onClick={() => handleEditarVendaClick(venda)}>
                    Editar venda
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesPage;
