// Aqui vamos importar o axios e usar o dontenv para configurar a base URL da API
import axios from "axios";
// Usar URL relativa em produção, localhost em desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || '/api/';

// Criando Api
export const Api = async (pergunta) => {
  // O try catch serve para tratar erros na requisição
  try {
    // Aqui vou criar minha resposta que vai acessar a API
    const response = await axios.post(`${API_URL}receitas/perguntar`, {
      // Meus dados vai ser o que vou receber na pergunta
      pergunta,
    });
    // Aqui retorno minha resposta
    return response.data.resposta;
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    throw error;
  }
};
