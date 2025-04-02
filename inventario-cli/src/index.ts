import inquirer from "inquirer";
import chalk from "chalk";
import { criarCategoria, listarCategorias } from "./categoriaService";
import { criarProduto, listarProdutos } from "./produtoService";
import { promises } from "dns";

async function mainMenu(): Promise<void> {
    const resposta = await inquirer.prompt({
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
            console.log(chalk.green("Saindo..."));
            process.exit();
    }
}

    async function menuCategorias() {
        const resposta = await inquirer.prompt({
        type: "list",
        name: "acao",
        message: "Escolha uma ação para categorias:",
        choices: ["Criar", "Listar", "Voltar"],
    });

    if (resposta.acao === "Criar") {
        const { nome, descricao } = await inquirer.prompt([
            { type: "input", name: "nome", message: "Nome da categoria:" },
            { type: "input", name: "descricao", message: "Descrição:" },
            ]);
        
            criarCategoria(nome, descricao);
            console.log(chalk.blue("Categoria criada!"));
        }
        
        if (resposta.acao === "Listar") {
            console.table(listarCategorias());
        }
        
        mainMenu();
    }

    async function menuProdutos(): Promise<void> { 
        const resposta = await inquirer.prompt({
            type: "list",
            name: "acao",
            message: "Escolha uma ação para produtos:",
            choices: ["Criar", "Listar", "Voltar"],
            });
        
            if (resposta.acao === "Criar") {
            const categorias = listarCategorias();
            if (categorias.length === 0) {
                console.log(chalk.red("Nenhuma categoria cadastrada. Cadastre uma antes!"));
                return mainMenu();
            }
        
            const { nome, descricao, preco, quantidade, categoriaId } = await inquirer.prompt([
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
        
            criarProduto(nome, descricao, preco, quantidade, categoriaId);
            console.log(chalk.blue("Produto criado!"));
            }
        
            if (resposta.acao === "Listar") {
            console.table(listarProdutos());
        }

    mainMenu();
}

console.log("Hello, TypeScript CLI!");

// comando para caso o terminal power shell não executar por conta da política de scripts:
// Set-ExecutionPolicy Unrestricted -Scope Process (temporário, rodar todas as vezes que gerar um novo terminal power shell)
// Set-ExecutionPolicy RemoteSigned -Scope CurrentUser (permanente, rodar só uma vez)