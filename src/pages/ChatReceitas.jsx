import { useState } from "react";
import ListaMenssagens from "../componentes/ListaMenssagens";
import ChatBox from "../componentes/ChatBox.jsx";
import { Api } from "../services/Api";

const ChatReceitas = () => {
  const [loading, setLoading] = useState(false);
  // criando estrutura para estilizar o chat
  const [mensagens, setMensagens] = useState([
    // rinado mensagens de exemplo, a estrura da mensagem será um obeto
    {
      id: 1,
      texto:
        "Olá! Eu sou o Dev Chef, seu assistente pessoal para receitas deliciosas. Como posso ajudar você hoje?",
      remetente: "bot",
    },
  ]);
  // Aqui vamos fazer uma chamada API para enviar a mensagem do usuário e receber a resposta do bot
  const onEnviarMessagem = async (Mensagem) => {
    const novaMensagemUsuario = {
      id: Date.now(),
      texto: Mensagem,
      remetente: "usuario",
    };
    setMensagens((prevMensagens) => [...prevMensagens, novaMensagemUsuario]);
    setLoading(true);
    try {
      const resposta = await Api(Mensagem);

      const novaMensagemBot = {
        id: Date.now() + 1,
        texto: resposta,
        remetente: "bot",
      };
      setMensagens((prevMensagens) => [...prevMensagens, novaMensagemBot]);
    } catch (error) {
      const novaMensagem = {
        id: Date.now(),
        texto: "Falha ao enviar, tente novamente.",
        remetente: "bot",
      };
      setMensagens((prevMensagens) => [...prevMensagens, novaMensagem]);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 via-gray-50 to-emerald-50 p-4">
      <div className=" container mx-auto max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-950 to-emerald-600 text-transparent bg-clip-text mb-2">
            👨‍🍳 Dev Chef
          </h1>

          <p className="text-black-600 text-lg font-bold">
            Seu assistente pessoal para receitas deliciosas
          </p>
        </header>
        {/* Aqui vou criar componentes separados */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl flex flex-col overflow-hidden shadow-xl h-[600px] border border-gray-300">
          <ListaMenssagens mensagens={mensagens} loading={loading} />
          <ChatBox onEnviarMessagem={onEnviarMessagem} desabilitado={loading} />
        </div>
      </div>
    </div>
  );
};
export default ChatReceitas;
