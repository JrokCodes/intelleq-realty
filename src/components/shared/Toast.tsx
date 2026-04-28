import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-20 md:bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastBubble key={t.id} item={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const icons = {
  success: <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />,
  error: <XCircle size={16} className="text-red-600 flex-shrink-0" />,
  info: <Info size={16} className="text-blue-600 flex-shrink-0" />,
};

const bgColors = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
};

function ToastBubble({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(item.id), 3000);
    return () => clearTimeout(timer);
  }, [item.id, onDismiss]);

  return (
    <div className={`pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-lg border shadow-lg text-sm text-text-primary animate-slide-in ${bgColors[item.type]}`}>
      {icons[item.type]}
      <span>{item.message}</span>
      <button onClick={() => onDismiss(item.id)} className="ml-2 p-0.5 rounded hover:bg-black/5 text-text-muted">
        <X size={14} />
      </button>
    </div>
  );
}
