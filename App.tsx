import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import GardenDashboard from './pages/GardenDashboard';
import SocialFeed from './pages/SocialFeed';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import UICustomization from './pages/UICustomization';
import { AppProvider } from './lib/AppContext';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GardenDashboard,
});

const socialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/social',
  component: SocialFeed,
});

const achievementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/achievements',
  component: Achievements,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

const uiCustomizationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ui-customization',
  component: UICustomization,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  socialRoute,
  achievementsRoute,
  profileRoute,
  uiCustomizationRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  );
}
