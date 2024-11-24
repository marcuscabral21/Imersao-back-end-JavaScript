import express from "express"; // Import express
import routes from "./src/routes/postsRoutes.js"; // Import the routes function

const app = express(); // Create an express app

app.use(express.static("uploads")); // Tudo q tiver na pasta uploads vai ser usado como conteúdo estático

routes(app); // Call the routes function and pass the app as an argument

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
}); // Server listens on port 3000




