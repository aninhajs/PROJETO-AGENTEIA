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
    <div className="p-4 max-w-4xl mx-auto">
      <form className="relative" onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <textarea
            className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            rows={1}
            value={mensagem}
            onChange={(e) => {
              setMensagem(e.target.value);
              // Auto-resize
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            placeholder="Digite sua pergunta sobre receitas..."
            disabled={desabilitado}
            style={{ minHeight: "44px", maxHeight: "200px" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (mensagem.trim()) {
                  handleSubmit(e);
                }
              }
            }}
          />
          <button
            type="submit"
            disabled={desabilitado || !mensagem.trim()}
            className="absolute right-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
export default ChatBox;
