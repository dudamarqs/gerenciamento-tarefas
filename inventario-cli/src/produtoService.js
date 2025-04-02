"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarProduto = criarProduto;
exports.listarProdutos = listarProdutos;
const database_1 = require("./database"); // Importando categorias
const uuid = __importStar(require("uuid"));
function criarProduto(nome, descricao, preco, quantidade, categoriaId) {
    const categoria = database_1.categorias.find(cat => cat.id === categoriaId);
    if (!categoria)
        throw new Error("Categoria não encontrada.");
    const novoProduto = {
        id: uuid.v4(),
        nome,
        descricao,
        preco,
        quantidade,
        categoriaId,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
    };
    database_1.produtos.push(novoProduto);
    return novoProduto;
}
function listarProdutos() {
    return database_1.produtos;
}
