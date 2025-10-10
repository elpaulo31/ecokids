import SelectGame from './../assets/images/general/selectGame.png';

interface SelectGameModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

export const SelectGameModal = ({ showModal, setShowModal }: SelectGameModalProps) => {
    if (!showModal) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center 
                       bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-50"
            onClick={() => setShowModal(false)}
        >
            <div 
                className="relative bg-[var(--color-brand)] w-80 py-10 px-10 rounded-2xl 
                           flex flex-col items-center gap-8 shadow-lg text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold text-center">
                    Escolha seu jogo
                </h2>

                <button 
                    type="button" 
                    className="flex flex-col items-center gap-2 
                               bg-white/10 hover:bg-white/20 transition-all py-4 px-8 rounded-xl 
                               text-white hover:cursor-pointer"
                >
                    <img 
                        src={SelectGame} 
                        alt="Jogo Separe o Lixo" 
                        className="w-24 h-24 object-contain"
                    />
                    <span className="font-medium">Separe o Lixo</span>
                </button>

                <button 
                    type="button" 
                    aria-label="Fechar"
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-5 text-2xl font-bold 
                               text-white hover:text-gray-200 hover:cursor-pointer transition-colors"
                >
                    ×
                </button>
            </div>
        </div>
    );
};


