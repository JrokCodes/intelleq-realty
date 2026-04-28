interface Props {
  bg: string;
  text: string;
  label: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ bg, text, label, size = 'md' }: Props) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`inline-flex items-center rounded-full font-bold uppercase tracking-wider ${bg} ${text} ${sizeClass}`}>
      {label}
    </span>
  );
}
