import { Produto } from "./types";
import { produtos, categorias } from "./database"; // Importando categorias
import * as uuid from "uuid";

export function criarProduto(nome: string, descricao: string, preco: number, quantidade: number, categoriaId: string): Produto {
    const categoria = categorias.find(cat => cat.id === categoriaId);
    if (!categoria) throw new Error("Categoria não encontrada.");

    const novoProduto: Produto = {
        id: uuid.v4(),
        nome, 
        descricao,
        preco,
        quantidade,
        categoriaId,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(), 
    };

    produtos.push(novoProduto);
    return novoProduto;
}

export function listarProdutos(): Produto[] {
    return produtos;
}
