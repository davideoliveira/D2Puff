// import { update } from "firebase/database";
import { database } from "./Configuracao";
import { push, child, ref, update, remove, set } from "firebase/database";

export function adicionarVenda(venda) {
    const id = push(child(ref(database), 'vendas')).key
    //adiciona venda
    set(ref(database, `vendas/${id}`), {
        id: id,
        data: venda.data,
        vendedor: venda.vendedor,
        modeloSabor: venda.modeloSabor,
        precoVenda: venda.precoVenda
    },
    //diminui estoque
    update(ref(database,`estoque/${venda.produto.id}`), {
        quantidade: venda.produto.quantidade - 1

    })
    )
    .catch((erro) => {
        alert(erro.message)
    })
}


export function editarVenda(venda) {
    update(ref(database,`vendas/${venda.id}`), {
        data: venda.data,
        vendedor: venda.vendedor,
        modeloSabor: venda.modeloSabor,
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
        modeloSabor: produto.modeloSabor,
        quantidade: produto.quantidade,
        custo: produto.custo
        
    })
    .catch((erro) => {
        alert(erro.message)
    })

}

export function editItem(produto) {
    update(ref(database,`estoque/${produto.id}`), {
        modeloSabor: produto.modeloSabor,
        quantidade: produto.quantidade,
        custo: produto.custo

    })
    .catch((erro) => {
        alert(erro.message)
    })
}

export function deletaEstoque(id) {
    remove(ref(database, `estoque/${id}`))
    .catch((erro) => {
        alert(erro.message)
    })

}