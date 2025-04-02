"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const categoriaService_1 = require("./categoriaService");
const produtoService_1 = require("./produtoService");
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const resposta = yield inquirer_1.default.prompt({
            type: "list",
            name: "opcao",
            message: "O que deseja fazer?",
            choices: ["Gerenciar Categorias", "Gerenciar Produtos", "Sair"],
        });
        switch (resposta.opcao) {
            case "Gerenciar Categorias":
                return menuCategorias();
            case "Gerenciar Produtos":
                return menuProdutos();
            case "Sair":
                console.log(chalk_1.default.green("Saindo..."));
                process.exit();
        }
    });
}
function menuCategorias() {
    return __awaiter(this, void 0, void 0, function* () {
        const resposta = yield inquirer_1.default.prompt({
            type: "list",
            name: "acao",
            message: "Escolha uma ação para categorias:",
            choices: ["Criar", "Listar", "Voltar"],
        });
        if (resposta.acao === "Criar") {
            const { nome, descricao } = yield inquirer_1.default.prompt([
                { type: "input", name: "nome", message: "Nome da categoria:" },
                { type: "input", name: "descricao", message: "Descrição:" },
            ]);
            (0, categoriaService_1.criarCategoria)(nome, descricao);
            console.log(chalk_1.default.blue("Categoria criada!"));
        }
        if (resposta.acao === "Listar") {
            console.table((0, categoriaService_1.listarCategorias)());
        }
        mainMenu();
    });
}
function menuProdutos() {
    return __awaiter(this, void 0, void 0, function* () {
        const resposta = yield inquirer_1.default.prompt({
            type: "list",
            name: "acao",
            message: "Escolha uma ação para produtos:",
            choices: ["Criar", "Listar", "Voltar"],
        });
        if (resposta.acao === "Criar") {
            const categorias = (0, categoriaService_1.listarCategorias)();
            if (categorias.length === 0) {
                console.log(chalk_1.default.red("Nenhuma categoria cadastrada. Cadastre uma antes!"));
                return mainMenu();
            }
            const { nome, descricao, preco, quantidade, categoriaId } = yield inquirer_1.default.prompt([
                { type: "input", name: "nome", message: "Nome do produto:" },
                { type: "input", name: "descricao", message: "Descrição:" },
                { type: "number", name: "preco", message: "Preço:" },
                { type: "number", name: "quantidade", message: "Quantidade:" },
                {
                    type: "list",
                    name: "categoriaId",
                    message: "Escolha uma categoria:",
                    choices: categorias.map(cat => ({ name: cat.nome, value: cat.id })),
                },
            ]);
            (0, produtoService_1.criarProduto)(nome, descricao, preco, quantidade, categoriaId);
            console.log(chalk_1.default.blue("Produto criado!"));
        }
        if (resposta.acao === "Listar") {
            console.table((0, produtoService_1.listarProdutos)());
        }
        mainMenu();
    });
}
console.log("Hello, TypeScript CLI!");
// comando para caso o terminal power shell não executar por conta da política de scripts:
// Set-ExecutionPolicy Unrestricted -Scope Process (temporário, rodar todas as vezes que gerar um novo terminal power shell)
// Set-ExecutionPolicy RemoteSigned -Scope CurrentUser (permanente, rodar só uma vez)
