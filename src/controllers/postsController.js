//Responsabilidade de listar os posts (recebe requisição, executa e envia resposta)
import gerarDescricaoComGemini from "../services/geminiService.js"; // Import the function to generate alt-text
import fs from "fs"; //file system
import { getTodosOsPosts, criarPost, atualizarPost } from "../models/postsModel.js"; //importa a função que busca todos os posts

export async function listarPosts(req, res){ //(requisição,resposta) //async pq embaixo tenho um await
    const posts =  await getTodosOsPosts(); //await para esperar a função ser executada 
    res.status(200).json(posts); //status 200 = ok for server side
};

export async function postarNovoPost(req, res){
    const novoPost = req.body; //pega o corpo da requisição
    try{ // Tratamento de exceções
        const postCriado = await criarPost(novoPost); //cria um post
        res.status(200).json(postCriado); 
    }catch(erro) { //se der erro...
        console.error(erro.message); //imprime o erro no console
        res.status(500).json({"Erro":"Falha na requisição"}); //status 500 = erro no servidor
    }
};

export async function uploadImagem(req, res){
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" }); 
    }
};

export async function atualizarNovoPost(req, res){
    const id = req.params.id; // Guarda o id do post
    const urlImagem = `http://localhost:3000/${id}.png`; // Guarda a url da imagem
    try {
        // Buffer é um tipo de dado que armazena dados binários 
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`); // Lê a imagem
        const descricao = await gerarDescricaoComGemini(imgBuffer); // Gera a descrição da imagem

        const post = {
            imgUrl: urlImagem,
            descricao: descricao, // vem do put
            alt: req.body.alt // vem do put
        }; 
        
        const postCriado = await atualizarPost(id, post); //Atualizar onde (id) e o que (post)

        res.status(200).json(postCriado); 
    }catch(erro) { //se der erro...
        console.error(erro.message); //imprime o erro no console
        res.status(500).json({"Erro":"Falha na requisição"}); //status 500 = erro no servidor
    }
};

