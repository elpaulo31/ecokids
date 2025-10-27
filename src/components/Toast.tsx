import { ErrorIcon } from '../assets/images/icons/ErrorIcon';
import { InfoIcon } from '../assets/images/icons/InfoIcon';
import { SuccessIcon } from '../assets/images/icons/SuccessIcon';

export function Toast(
  typeToast: 'success' | 'info' | 'error',
  message: string,
  setShowModal?: (show: boolean) => void,
) {
  setTimeout(() => {
    setShowModal && setShowModal(false);
  }, 3000);

  return (
    <div
      className={`fixed top-4 right-4 z-50 border transition-all bg-[#f2f2f2] text-black 
                         px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 ${typeToast === 'success' ? 'border-green-500' : typeToast === 'info' ? 'border-blue-500' : 'border-red-500'}`}
    >
      {typeToast === 'success' && <SuccessIcon />}
      {typeToast === 'info' && <InfoIcon />}
      {typeToast === 'error' && <ErrorIcon />}

      <p>{message}</p>
    </div>
  );
}
