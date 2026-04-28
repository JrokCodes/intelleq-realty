import type { ListingStatus, OfferStatus, MilestoneStatus, DocumentStatus, PreApprovalStatus, AnyStage, Side } from './types';

export const listingStatusStyles: Record<ListingStatus, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Draft' },
  pre_market: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pre-market' },
  active: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Active' },
  pending: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Pending' },
  sold: { bg: 'bg-slate-200', text: 'text-slate-700', label: 'Sold' },
};

export const offerStatusStyles: Record<OfferStatus, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Draft' },
  sent: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Sent' },
  countered: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Countered' },
  accepted: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Accepted' },
  rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' },
};

export const milestoneStatusStyles: Record<MilestoneStatus, { bg: string; text: string; ring: string; label: string }> = {
  upcoming: { bg: 'bg-slate-100', text: 'text-slate-600', ring: 'border-l-slate-200', label: 'Upcoming' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', ring: 'border-l-blue-400', label: 'In progress' },
  done: { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'border-l-emerald-400', label: 'Done' },
  overdue: { bg: 'bg-red-100', text: 'text-red-700', ring: 'border-l-red-500', label: 'Overdue' },
  at_risk: { bg: 'bg-amber-100', text: 'text-amber-800', ring: 'border-l-amber-500', label: 'At risk' },
};

export const documentStatusStyles: Record<DocumentStatus, { bg: string; text: string; label: string }> = {
  unsigned: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Unsigned' },
  sent: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sent' },
  signed: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Signed' },
};

export const preApprovalStyles: Record<PreApprovalStatus, { bg: string; text: string; label: string }> = {
  none: { bg: 'bg-red-100', text: 'text-red-700', label: 'Not pre-approved' },
  pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pre-approval pending' },
  approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Pre-approved' },
};

export const sellStageOrder: AnyStage[] = ['lead', 'verified', 'cma', 'listed', 'under_contract', 'closing', 'closed'];
export const buyStageOrder: AnyStage[] = ['pre_approval', 'searching', 'rep_signed', 'offer', 'under_contract', 'closing', 'closed'];

export const stageLabels: Record<AnyStage, string> = {
  lead: 'Lead',
  verified: 'Verified',
  cma: 'CMA',
  listed: 'Listed',
  under_contract: 'Under contract',
  closing: 'Closing',
  closed: 'Closed',
  pre_approval: 'Pre-approval',
  searching: 'Searching',
  rep_signed: 'Rep signed',
  offer: 'Offer',
};

export function stagesForSide(side: Side): AnyStage[] {
  return side === 'sell' ? sellStageOrder : buyStageOrder;
}
