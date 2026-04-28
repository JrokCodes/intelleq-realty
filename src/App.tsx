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

// Sell wizard
const SellWelcome = lazyRetry(() => import('@/pages/sell/WelcomePage'));
const AddressStep = lazyRetry(() => import('@/pages/sell/AddressStep'));
const VerifyStep = lazyRetry(() => import('@/pages/sell/VerifyStep'));
const AboutStep = lazyRetry(() => import('@/pages/sell/AboutStep'));
const PhotosStep = lazyRetry(() => import('@/pages/sell/PhotosStep'));
const SellCmaPage = lazyRetry(() => import('@/pages/sell/CmaPage'));
const PriceStep = lazyRetry(() => import('@/pages/sell/PriceStep'));
const ListingPreview = lazyRetry(() => import('@/pages/sell/ListingPreview'));
const SignStep = lazyRetry(() => import('@/pages/sell/SignStep'));
const SellLive = lazyRetry(() => import('@/pages/sell/LivePage'));
const MarketingPage = lazyRetry(() => import('@/pages/sell/MarketingPage'));

// Buy flow
const BuyDashboard = lazyRetry(() => import('@/pages/buy/BuyDashboard'));
const BuyFeed = lazyRetry(() => import('@/pages/buy/BuyFeed'));
const BuyListingDetail = lazyRetry(() => import('@/pages/buy/BuyListingDetail'));
const BuyOfferBuilder = lazyRetry(() => import('@/pages/buy/BuyOfferBuilder'));

// Shared
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

              {/* Wizard pages render their own layout — only AppShell wraps non-wizard */}
              <Route element={<AppShell />}>
                {/* Sell wizard */}
                <Route path="sell" element={<SellWelcome />} />
                <Route path="sell/address" element={<AddressStep />} />
                <Route path="sell/verify" element={<VerifyStep />} />
                <Route path="sell/about" element={<AboutStep />} />
                <Route path="sell/photos" element={<PhotosStep />} />
                <Route path="sell/valuation" element={<SellCmaPage />} />
                <Route path="sell/price" element={<PriceStep />} />
                <Route path="sell/preview" element={<ListingPreview />} />
                <Route path="sell/sign" element={<SignStep />} />
                <Route path="sell/live" element={<SellLive />} />
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
