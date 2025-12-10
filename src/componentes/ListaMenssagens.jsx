import { useEffect, useRef } from "react";
import Mensagem from "./Mensagem.jsx";

const ListaMenssagens = ({ mensagens, loading }) => {
  const mensagemRef = useRef();

  const scrollBaixo = () => {
    mensagemRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollBaixo();
  }, [mensagens]);

  return (
    <div className="h-full overflow-y-auto custom-scroll px-4 py-4">
      <div className="max-w-4xl mx-auto">
        {mensagens.map((mensagem) => (
          <Mensagem key={mensagem.id} mensagem={mensagem} />
        ))}

        {loading && (
          <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-semibold">👨‍🍳</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Dev Chef
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    está digitando...
                  </span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={mensagemRef}></div>
      </div>
    </div>
  );
};
export default ListaMenssagens;
