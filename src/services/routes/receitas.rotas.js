import express from "express";
import { perguntarReceita } from "../controllers/receitas.controller.js";
// Precisamos usar o roteamento do express
const router = express.Router();
router.post("/perguntar", perguntarReceita);
export default router;
