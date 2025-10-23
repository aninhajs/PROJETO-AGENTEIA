const Mensagem = ({ mensagem }) => {
  // Aqui preciso saber de quem é a mensagem (usuário ou bot) pra poder colocar a istilização correta
  const isBot = mensagem.remetente === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-5 py-4 rounded-2xl shadow-2xl hover:shadow-xl cursor-pointer
       ${
         isBot
           ? "bg-gray-50 text-gray-900  rounded-bl-none border border-gray-400 "
           : "bg-gradient-to-r from-purple-300 to-emerald-400 text-gray-900 rounded-br-none"
       }

        `}
      >
        <p className="text-sm whitespace-pre-line">{mensagem.texto}</p>
      </div>
    </div>
  );
};
export default Mensagem;
