import './styles/app.postcss';
import { useState } from 'react';

import { EcokidsDarkLogo } from './assets/images/logos/EcokidsDarkLogo';
import { TrashIcon } from './assets/images/icons/TrashIcon';
import RecyclingIcon from './assets/images/icons/RecyclingIcon.png';

import { SelectGameModal } from './components/SelectGameModal';

function App() {
  document.title = "EcoKids - Seja um pequeno herói!";

  const [showModal, setShowModal] = useState(false);

  const trashTypes = [
    'DB0F0F', 'DBB30F', '0F86DB', '0FDB27', '653409'];

  return (
    <main className='h-screen w-screen p-10 flex justify-center items-center relative'>
      <EcokidsDarkLogo primaryColor="#0FDB27" secondaryColor="#00150B" svgClass='absolute left-8 top-8 md:left-10 md:top-10' />

      <section className='flex flex-col items-center gap-20'>
        <div className='flex flex-col gap-20'>
          <button className="relative inline-block transition-all hover:scale-105 hover:cursor-pointer" onClick={() => setShowModal(true)}>
            <img src={RecyclingIcon} alt="Ícone de Reciclagem" className="block h-40 mx-auto" />

            <p className="absolute inset-0 flex items-center justify-center font-semibold px-2 py-1 rounded text-[var(--color-brand-dark)] text-5xl">
              Jogar
            </p>
          </button>

          <div className='flex flex-col gap-6 mx-auto'>
            <a href="" className='bg-[var(--color-brand)] text-[var(--color-accent-light)] py-3 px-12 rounded-xl w-46 text-center text-xl transition-all hover:bg-[var(--color-brand)]/80 hover:scale-103'>Aprender</a>
            <a href="" className='bg-[var(--color-brand)] text-[var(--color-accent-light)] py-3 px-12 rounded-xl w-46 text-center text-xl transition-all hover:bg-[var(--color-brand)]/80 hover:scale-103'>Conquistas</a>
          </div>
        </div>

        <div className='flex flex-col items-center gap-6'>
          <p className='text-[var(--color-brand-darkest)] text-2xl'>Seja um pequeno herói!</p>

          <div>
            {trashTypes.map((color, index) => (
              <TrashIcon
                key={index}
                svgClass='inline-block mx-2 cursor-pointer hover:scale-110 transition-transform'
                color={`#${color}`}
              />
            ))}
          </div>
        </div>
      </section>

      <SelectGameModal showModal={showModal} setShowModal={setShowModal} />
    </main>
  )
}

export default App;
