"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarCategoria = criarCategoria;
exports.listarCategorias = listarCategorias;
exports.buscarCategoria = buscarCategoria;
const database_1 = require("./database");
const uuid_1 = require("uuid"); // Correção na importação
function criarCategoria(nome, descricao) {
    const novaCategoria = {
        id: (0, uuid_1.v4)(), // Mudança na geração do ID
        nome,
        descricao,
        dataCriacao: new Date(),
    };
    database_1.categorias.push(novaCategoria);
    return novaCategoria;
}
function listarCategorias() {
    return database_1.categorias;
}
function buscarCategoria(id) {
    return database_1.categorias.find(cat => cat.id === id);
}
