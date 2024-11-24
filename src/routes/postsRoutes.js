import express from "express"; // Import express
import cors from "cors"; // Import cors
import multer from "multer"; // Import multer
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Import the function to list all posts

const corsOptions = {
    origin: "http://localhost:8000", // URL do front-end
    optionsSuccessStatus: 200 // Status code 200
}

// "Receita de bolo" para o multer para windows
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage }); // Set the destination folder for the images

const routes = (app)=> { // função que recebe o app
    app.use(express.json()); // Permite que o servidor interprete JSON
    app.use(cors(corsOptions)); // Habilita o CORS
    //create route
    app.get("/posts", listarPosts); // Route for listing all posts+
    app.post("/posts", postarNovoPost); // Route for creating a new post
    app.post("/upload", upload.single("imagem"), uploadImagem); // Route for uploading an image
    app.put("/upload/:id", atualizarNovoPost); // Route for updating a post
}

export default routes; // Export the routes function



