import openaiService from "../openai.services.js";

export const perguntarReceita = async (req, res) => {
  const { pergunta } = req.body;
  //   Vamos fazer uma ferificação simples para garantir que a pergunta não está vazia
  if (!pergunta || pergunta.trim() === "") {
    return res.status(400).json({ error: "A pergunta não pode estar vazia" });
  }
  //   O try catch é para garantir que se der algum erro na hora de chamar o openai a gente consiga tratar esse erro e devolver uma mensagem amigável para o usuário
  try {
    const resposta = await openaiService.obterRespostaReceita(pergunta);
    res.json({ resposta });
  } catch (error) {
    console.error("Erro ao perguntar receita:", error);
    res.status(500).json({ error: "Erro ao perguntar receita" });
  }
};
