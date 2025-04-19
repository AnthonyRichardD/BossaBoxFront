import { useEffect, useState } from "react";
import { useErrorStore } from "../stores/errorStore";

export const ErrorPopup = () => {
  const { error, clearError } = useErrorStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
    }
  }, [error]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(clearError, 300);
  };

  if (!error) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-60 max-w-md flex-col items-center justify-center gap-3 rounded-lg bg-gray-800 p-4 text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-16 w-16 text-red-500"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <div>
            <p className="text-sm">{error}</p>
          </div>

          <button
            onClick={handleClose}
            className="flex w-[100px] items-center justify-center rounded-lg bg-purple-500 py-1 font-bold text-white hover:bg-purple-700"
            aria-label="Fechar mensagem de erro"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
