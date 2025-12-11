import express from "express";
import receitasRoutes from "./src/services/routes/receitas.rotas.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Servir arquivos estáticos do build do React
app.use(express.static(path.join(__dirname, "interfaces-receitas/dist")));

// Rotas da API
app.use("/api/receitas", receitasRoutes);

// Rota catch-all para SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "interfaces-receitas/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
