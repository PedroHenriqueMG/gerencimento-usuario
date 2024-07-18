import "express-async-errors";
import Express from "express";
import cors from "cors";
import { router } from "./router";
import { errorMiddleware } from "./middleware/error-middleware";
import { db } from "./db/db";
import { corsMiddleware } from "./middleware/cors-middleware";

const PORT = 8080;

const app = Express();
app.use(Express.json());

app.use(corsMiddleware, cors());

app.use(router);

db.query("SELECT 1")
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error: Error) => {
    throw new Error(error.message);
  });

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`API rodando na porta: ${PORT}`);
});
