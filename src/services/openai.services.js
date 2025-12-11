import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const obterRespostaReceita = async (pergunta) => {
  try {
    // Verificar se a chave existe
    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "sua_chave_openai_aqui"
    ) {
      // Versão DEMO sem OpenAI
      return gerarRespostaDEMO(pergunta);
    }

    // Aqui é o que vou mandar para o chatgpt, a pergunta do usuério com o nosso código por baixo dos panos.
    const resposta = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Você é um assistente culinário especializado em ajudar pessoas leigas a cozinharem receitas deliciosas com base em um ingrediente informado pelo usuário.
Responda sempre em português brasileiro, com linguagem clara, amigável e fácil de entender,  como se estivesse explicando para alguém que está começando a cozinhar.

Siga estas instruções de formatação obrigatórias para facilitar a leitura no chat:

Use quebra de linha entre as seções (nome da receita, ingredientes, modo de preparo, dicas, etc.)
Apresente os ingredientes em lista, com um item por linha
Divida o modo de preparo em passos numerados, simples e objetivos
Insira espaçamento entre parágrafos diferentes, para tornar a leitura mais confortável
 
 A receita sugerida deve ser saborosa, fácil de preparar e bem explicada, mesmo para quem não tem experiência na cozinha.`,
        },
        {
          role: "user",
          content: pergunta,
        },
      ],
    });
    return resposta.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao obter resposta:", error);
    // Fallback para versão DEMO em caso de erro
    return gerarRespostaDEMO(pergunta);
  }
};

// Função DEMO - remove depois que tiver a chave real da OpenAI
const gerarRespostaDEMO = (pergunta) => {
  const receitasDEMO = [
    "🍝 **Macarrão Italiano Simples**\n\n**Ingredientes:**\n- 200g macarrão\n- 3 dentes de alho\n- Azeite, sal, queijo parmesão\n\n**Modo de Preparo:**\n1. Cozinhe o macarrão al dente\n2. Refogue o alho no azeite\n3. Misture tudo e finalize com queijo!",

    "🥗 **Salada Tropical Refrescante**\n\n**Ingredientes:**\n- Alface, tomate, abacaxi\n- Peito de frango grelhado\n- Molho de mostarda e mel\n\n**Modo de Preparo:**\n1. Monte a salada em camadas\n2. Adicione o frango em cubos\n3. Regue com o molho!",

    "🍰 **Bolo de Chocolate Fácil**\n\n**Ingredientes:**\n- 2 xícaras de farinha\n- 1 xícara de açúcar\n- Chocolate em pó, ovos, leite\n\n**Modo de Preparo:**\n1. Misture todos os ingredientes\n2. Asse por 30 minutos a 180°C\n3. Cubra com ganache!",
  ];

  return receitasDEMO[Math.floor(Math.random() * receitasDEMO.length)];
};

export default { obterRespostaReceita };
