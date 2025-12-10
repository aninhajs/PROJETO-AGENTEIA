const Mensagem = ({ mensagem }) => {
  const isBot = mensagem.remetente === "bot";

  return (
    <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start gap-4 max-w-4xl mx-auto">
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isBot ? "bg-green-600" : "bg-blue-600"
          }`}
        >
          <span className="text-white text-sm font-semibold">
            {isBot ? "👨‍🍳" : "U"}
          </span>
        </div>

        {/* Conteúdo da mensagem */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {isBot ? "Dev Chef" : "Você"}
            </span>
          </div>

          <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
            <div
              className={`whitespace-pre-line leading-relaxed ${
                mensagem.texto.length > 1000
                  ? "message-content custom-scroll"
                  : ""
              }`}
            >
              <p>{mensagem.texto}</p>
            </div>
          </div>

          {/* Botões de ação (apenas para mensagens do bot) */}
          {isBot && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(mensagem.texto);
                    // Aqui poderia adicionar um toast de sucesso
                  } catch (err) {
                    console.error("Falha ao copiar texto: ", err);
                  }
                }}
                className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Copiar mensagem"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button
                className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                title="Gostei"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V8a2 2 0 00-2-2H4.5a2.5 2.5 0 000 5L7 12m7-2v2m0 0v2m0-2h2m-2 0h-2"
                  />
                </svg>
              </button>
              <button
                className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Não gostei"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  transform="rotate(180)"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V8a2 2 0 00-2-2H4.5a2.5 2.5 0 000 5L7 12m7-2v2m0 0v2m0-2h2m-2 0h-2"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Mensagem;
