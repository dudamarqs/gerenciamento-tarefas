import { Categoria } from "./types";
import { categorias } from "./database";
import { v4 as uuidv4 } from "uuid"; // Correção na importação

export function criarCategoria(nome: string, descricao: string): Categoria {
    const novaCategoria: Categoria = {
        id: uuidv4(), // Mudança na geração do ID
        nome,
        descricao,
        dataCriacao: new Date(),
    };
    categorias.push(novaCategoria);
    return novaCategoria;
}

export function listarCategorias(): Categoria[] {
    return categorias;
}

export function buscarCategoria(id: string): Categoria | undefined {
    return categorias.find(cat => cat.id === id);
}
