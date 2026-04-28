import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import AppShell from '@/components/layout/AppShell';
import { ToastProvider } from '@/components/shared/Toast';
import ErrorBoundary from '@/components/ErrorBoundary';

function lazyRetry<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
) {
  return lazy(() =>
    importFn().catch(() => {
      const hasReloaded = sessionStorage.getItem('chunk-reload');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk-reload', '1');
        window.location.reload();
      }
      sessionStorage.removeItem('chunk-reload');
      return importFn();
    }),
  );
}

const LandingPage = lazyRetry(() => import('@/pages/landing/LandingPage'));
const SellDashboard = lazyRetry(() => import('@/pages/sell/SellDashboard'));
const IntakePage = lazyRetry(() => import('@/pages/sell/IntakePage'));
const SellCmaPage = lazyRetry(() => import('@/pages/sell/CmaPage'));
const ListingPreview = lazyRetry(() => import('@/pages/sell/ListingPreview'));
const MarketingPage = lazyRetry(() => import('@/pages/sell/MarketingPage'));
const BuyDashboard = lazyRetry(() => import('@/pages/buy/BuyDashboard'));
const BuyFeed = lazyRetry(() => import('@/pages/buy/BuyFeed'));
const BuyListingDetail = lazyRetry(() => import('@/pages/buy/BuyListingDetail'));
const BuyOfferBuilder = lazyRetry(() => import('@/pages/buy/BuyOfferBuilder'));
const TimelinePage = lazyRetry(() => import('@/pages/timeline/TimelinePage'));
const HowItWorks = lazyRetry(() => import('@/pages/how/HowItWorks'));
const NotFound = lazyRetry(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <div className="p-8">
      <div className="h-7 w-48 bg-border/40 rounded animate-pulse mb-4" />
      <div className="h-4 w-64 bg-border/30 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-border/20 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              <Route element={<AppShell />}>
                {/* Sell flow */}
                <Route path="sell" element={<SellDashboard />} />
                <Route path="sell/intake" element={<IntakePage />} />
                <Route path="sell/valuation" element={<SellCmaPage />} />
                <Route path="sell/listing" element={<ListingPreview />} />
                <Route path="sell/marketing" element={<MarketingPage />} />
                <Route path="sell/timeline" element={<TimelinePage />} />

                {/* Buy flow */}
                <Route path="buy" element={<BuyDashboard />} />
                <Route path="buy/feed" element={<BuyFeed />} />
                <Route path="buy/listings/:id" element={<BuyListingDetail />} />
                <Route path="buy/listings/:id/offer" element={<BuyOfferBuilder />} />
                <Route path="buy/timeline" element={<TimelinePage />} />

                {/* Shared */}
                <Route path="how-it-works" element={<HowItWorks />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}
