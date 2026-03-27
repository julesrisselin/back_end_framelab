import cors from 'cors';
import express from "express";
// Import de la table de routage
import router from "./router.js";
import cookieParser from "cookie-parser";
import * as errorcontroller from "./controllers/errorhandler.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: "json"};
// Creation du serveur
// Utilisation de la table de routage dans l’application
const app = express();
app.use(express.json());
const corsOption = {
    origin: process.env.AUTHORIZED_CLIENT,
    credentials: true
}
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//on redirige le / vers public
app.use("/", express.static("public"))

app.use(errorcontroller.errorHandler);
// Demarrage du serveur sur le port 3000
app.listen(process.env.PORT);