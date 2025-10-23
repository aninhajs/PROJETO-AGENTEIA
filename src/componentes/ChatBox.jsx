import { useState } from "react";

const ChatBox = ({ onEnviarMessagem, desabilitado }) => {
  // Aqui vou usar o useState para ter as informações que o usuário digitar
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    // Aqui estou previnindo que ele recarregue a página ao enviar a mensagem
    e.preventDefault();
    onEnviarMessagem(mensagem);
    setMensagem("");
  };

  return (
    <div className="border-t border-gray-200 bg-gray50/80 p-4">
      <form className="flex space-x-3" onSubmit={handleSubmit}>
        <input
          className="flex-1 px-5 py-3 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-2 outline-none  focus:ring-purple-500"
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={desabilitado}
        />
        <button
          type="submit"
          disabled={desabilitado}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-700 cursor-pointer text-white rounded-full disable:from-gray-400 disable:to-gray-300 disable:cursor-not-allowed"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
export default ChatBox;
