export interface Categoria {
    id: string;
    nome: string;
    descricao: string;
    dataCriacao: Date;
}

export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoriaId: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
}