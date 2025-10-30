export const LearnEcokids = () => {
  const trashTypes = [
    {
      title: 'Lixo Orgânico',
      description:
        'São restos de comida, cascas de frutas, verduras e folhas. Eles podem virar adubo e ajudar novas plantas a crescerem!',
      color: '#8B4513',
      textColor: '#5A3210',
      background: '#F3E5D0',
    },
    {
      title: 'Lixo de Papel',
      description:
        'Inclui jornais, revistas, caixas e folhas de papel. Sempre que puder, dobre e coloque no lixo azul!',
      color: '#0000FF',
      textColor: '#1E3A8A',
      background: '#E0E7FF',
    },
    {
      title: 'Lixo de Plástico',
      description:
        'Garrafas, potes, sacolas e brinquedos velhos são plásticos. Lave e seque antes de colocar no lixo vermelho!',
      color: '#FF0000',
      textColor: '#B91C1C',
      background: '#FEE2E2',
    },
    {
      title: 'Lixo Metálico',
      description:
        'Latas de refrigerante, tampinhas e pedaços de metal vão no lixo amarelo. Eles podem ser derretidos e virar coisas novas!',
      color: '#DAA520',
      textColor: '#4A3B00',
      background: '#FFF9DB',
    },
    {
      title: 'Lixo de Vidro',
      description:
        'Garrafas, potes e copos quebrados vão no lixo verde. Cuidado ao manusear para não se cortar!',
      color: '#008000',
      textColor: '#065F46',
      background: '#DCFCE7',
    }
  ];

  return (
    <main className="p-10 mb-10 mt-0 bg-green-50 rounded-2xl shadow-md text-center w-3/4 lg:mt-10 mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Aprender sobre Reciclagem</h1>

      <p className="text-lg text-gray-700 mb-8">
        Vamos descobrir juntos como cuidar do nosso planeta separando o lixo do jeito certo!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {trashTypes.map((type, index) => (
          <div
            key={index}
            className="p-4 rounded-xl shadow-sm transition-transform hover:scale-105"
            style={{
              borderLeft: `6px solid ${type.color}`,
              backgroundColor: type.background,
            }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: type.textColor }}>
              {type.title}
            </h2>
            <p className="text-gray-700">{type.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-green-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-green-900">Dica do EcoAmigo!</h2>
        <p className="text-gray-800">
          Sempre que puder, reduza o uso de plásticos e recicle o que der. Cada pedacinho de lixo no
          lugar certo ajuda o planeta a sorrir!
        </p>
      </div>
    </main>
  );
};
