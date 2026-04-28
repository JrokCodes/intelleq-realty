import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import AppShell from '@/components/layout/AppShell';
import { LoginForm } from '@/components/auth/LoginForm';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
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

const Dashboard = lazyRetry(() => import('@/pages/dashboard/Dashboard'));
const PipelinePage = lazyRetry(() => import('@/pages/pipeline/PipelinePage'));
const ListingsPage = lazyRetry(() => import('@/pages/listings/ListingsPage'));
const ListingDetail = lazyRetry(() => import('@/pages/listings/ListingDetail'));
const CmaPage = lazyRetry(() => import('@/pages/listings/CmaPage'));
const BuyersPage = lazyRetry(() => import('@/pages/buyers/BuyersPage'));
const BuyerDetail = lazyRetry(() => import('@/pages/buyers/BuyerDetail'));
const OfferBuilder = lazyRetry(() => import('@/pages/buyers/OfferBuilder'));
const DealTimeline = lazyRetry(() => import('@/pages/deals/DealTimeline'));
const ContactsPage = lazyRetry(() => import('@/pages/contacts/ContactsPage'));
const ToolsPage = lazyRetry(() => import('@/pages/tools/ToolsPage'));
const RoadmapPage = lazyRetry(() => import('@/pages/roadmap/RoadmapPage'));
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
              <Route path="/login" element={<LoginForm />} />

              <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="pipeline" element={<PipelinePage />} />
                <Route path="listings" element={<ListingsPage />} />
                <Route path="listings/:id" element={<ListingDetail />} />
                <Route path="listings/:id/cma" element={<CmaPage />} />
                <Route path="buyers" element={<BuyersPage />} />
                <Route path="buyers/:id" element={<BuyerDetail />} />
                <Route path="buyers/:id/offer" element={<OfferBuilder />} />
                <Route path="deals/:id" element={<DealTimeline />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="tools" element={<ToolsPage />} />
                <Route path="roadmap" element={<RoadmapPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}
