// import { update } from "firebase/database";
import { database } from "./Configuracao";
import { push, child, ref, update, remove, set } from "firebase/database";

export function adicionarVenda(venda) {
    const id = push(child(ref(database), 'vendas')).key

    set(ref(database, `vendas/${id}`), {
        id: id,
        data: venda.data,
        vendedor: venda.vendedor,
        modelo: venda.modelo,
        sabor: venda.sabor,
        precoVenda: venda.precoVenda
    })
    .catch((erro) => {
        alert(erro.message)
    })
}


export function editarVenda(venda) {
    update(ref(database,`vendas/${venda.id}`), {
        data: venda.data,
        vendedor: venda.vendedor,
        modelo: venda.modelo,
        sabor: venda.sabor,
        precoVenda: venda.precoVenda
    })
    .catch((erro) => {
        alert(erro.message)
    })
}

export function deletaVenda(id) {
    remove(ref(database, `vendas/${id}`))
    .catch((erro) => {
        alert(erro.message)
    })

}

export function addEstoque(produto){
    const id = push(child(ref(database), 'estoque')).key

    set(ref(database, `estoque/${id}`), {
        id: id,
        modelo: produto.modelo,
        sabor: produto.sabor,
        qtdDavi: produto.qtdDavi,
        qtdDuda: produto.qtdDuda,
        qtdNicole: produto.qtdNicole
    })
    .catch((erro) => {
        alert(erro.message)
    })

}

export function editItem(produto) {
    update(ref(database,`estoque/${produto.id}`), {
        modelo: produto.modelo,
        sabor: produto.sabor,
        qtdDavi: produto.qtdDavi,
        qtdDuda: produto.qtdDuda,
        qtdNicole: produto.qtdNicole
    })
    .catch((erro) => {
        alert(erro.message)
    })
}