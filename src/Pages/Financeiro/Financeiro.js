import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './Financeiro.css';
import Header from '../../Component/Header.js/Header';

function Financeiro() {
  const [saldo, setSaldo] = useState(0);
  const [receita, setReceita] = useState(0);
  const [lucro, setLucro] = useState(0);
  const [ultimasDespesas, setUltimasDespesas] = useState([]);
  const [ultimasVendas, setUltimasVendas] = useState([]);

//   useEffect(() => {
//     const dbRef = firebase.database().ref();

//     // Buscando as vendas e somando as receitas e lucros
//     dbRef.child('vendas').on('value', (snapshot) => {
//       let totalVendas = 0;
//       let totalLucro = 0;
//       const vendasArray = [];

//       snapshot.forEach((childSnapshot) => {
//         const venda = childSnapshot.val();
//         vendasArray.push({ id: childSnapshot.key, ...venda });

//         // Soma o preço de venda de cada venda para calcular a receita
//         totalVendas += parseFloat(venda.precoVenda);

//         // Calcula o lucro da venda subtraindo o preço de venda do preço de custo
//         const lucroVenda = parseFloat(venda.precoVenda) - parseFloat(venda.precoCusto);
//         totalLucro += lucroVenda;
//       });

//       setReceita(totalVendas.toFixed(2));
//       setLucro(totalLucro.toFixed(2));
//       setUltimasVendas(vendasArray.slice(Math.max(vendasArray.length - 5, 0)));
//     });

//     // Buscando as despesas
//     dbRef.child('despesas').on('value', (snapshot) => {
//       const despesasArray = [];
//       let totalDespesas = 0;

//       snapshot.forEach((childSnapshot) => {
//         const despesa = childSnapshot.val();
//         despesasArray.push({ id: childSnapshot.key, ...despesa });
//         totalDespesas += parseFloat(despesa.valor);
//       });

//       setUltimasDespesas(despesasArray.slice(Math.max(despesasArray.length - 5, 0)));
//       setSaldo((receita - totalDespesas).toFixed(2));
//     });
//   }, [receita]);

//   const handleDeleteDespesa = (id) => {
//     firebase.database().ref(`despesas/${id}`).remove();
//   };

  return (
    <div>
        <Header/>
      <h2>Financeiro</h2>
      <div className="saldo-container">
        <h3>Saldo:</h3>
        <h4>{`R$ ${saldo}`}</h4>
      </div>
      <div className="resumo-container">
        <div className="resumo-item">
          <h3>Receita</h3>
          <h4>{`R$ ${receita}`}</h4>
        </div>
        <div className="resumo-item">
          <h3>Lucro sobre vendas</h3>
          <h4>{`R$ ${lucro}`}</h4>
        </div>
        <div className="resumo-item">
          <h3>Últimas Vendas</h3>
          <ul>
            {ultimasVendas.map((venda) => (
              <li key={venda.id}>{`${venda.data} - R$ ${venda.precoVenda}`}</li>
            ))}
          </ul>
        </div>
        <div className="resumo-item">
          <h3>Últimas Despesas</h3>
          <ul>
            {ultimasDespesas.map((despesa) => (
              <li key={despesa.id}>
                {`${despesa.descricao}: R$ ${despesa.valor}`}
                <button >Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Financeiro;
