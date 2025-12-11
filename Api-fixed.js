// Aqui vamos importar o axios e usar o dontenv para configurar a base URL da API
import axios from "axios";
const API_URL = '/api/';

// Criando Api
export const Api = async (pergunta) => {
  // O try catch serve para tratar erros na requisição
  try {
    // Aqui vou criar minha resposta que vai acessar a API
    const response = await axios.post(`${API_URL}receitas/perguntar`, {
      pergunta: pergunta,
    });

    // O data do response é onde vai estar armazenada a resposta da API
    return response.data;
  } catch (error) {
    // Em caso de erro, vou retornar uma mensagem de erro
    console.error("Erro na API:", error);
    throw error;
  }
};