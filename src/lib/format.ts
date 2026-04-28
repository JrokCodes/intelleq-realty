export function formatCurrency(n: number, opts?: { compact?: boolean }): string {
  if (opts?.compact && Math.abs(n) >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(2)}M`;
  }
  if (opts?.compact && Math.abs(n) >= 1_000) {
    return `$${Math.round(n / 1000)}k`;
  }
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

export function formatSqft(n: number): string {
  return `${n.toLocaleString('en-US')} sqft`;
}

export function formatDate(iso: string, opts?: { short?: boolean }): string {
  const d = new Date(iso);
  if (opts?.short) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function relativeDate(iso: string): string {
  const target = new Date(iso).getTime();
  const now = Date.now();
  const diffDays = Math.round((target - now) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays < 14) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays > -14) return `${Math.abs(diffDays)} days ago`;
  return formatDate(iso, { short: true });
}

export function pct(n: number, opts?: { decimals?: number }): string {
  return `${(n * 100).toFixed(opts?.decimals ?? 0)}%`;
}

export function addressLine(a: { line1: string; city: string; state: string; zip: string }): string {
  return `${a.line1}, ${a.city}, ${a.state} ${a.zip}`;
}

export function shortAddress(a: { line1: string; city: string }): string {
  return `${a.line1}, ${a.city}`;
}
