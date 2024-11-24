//Conecta a APP com o banco de dados
import 'dotenv/config'; // Import the dotenv module to use environment variables
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; // Import the function to connect to the database

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Connect to the database

//async porque a função vai demorar para ser executada, como requisição ao banco de dados
//Enquanto isso, o código pode continuar rodando
export async function getTodosOsPosts(){ //Função para buscar todos os posts
    const db = conexao.db("imersao-instabytes");//conexão com o banco de dados
    const colecao = db.collection("posts"); //coleção de posts
    return colecao.find().toArray(); //retorna todos os posts
};

export async function criarPost(novoPost) { //Função para criar um novo post
    const db = conexao.db("imersao-instabytes"); //conexão com o banco de dados
    const colecao = db.collection("posts"); //coleção de posts
    return colecao.insertOne(novoPost); //insere um novo post
}

export async function atualizarPost(id, novoPost){ //Função para atualizar um post
    const db = conexao.db("imersao-instabytes"); //conexão com o banco de dados
    const colecao = db.collection("posts"); //coleção de posts
    const objID = ObjectId.createFromHexString(id); // Pegar id que recebemos e transformar em um objeto que o
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost}); // 1o parametro um objeto e o 2o criamos um
}
