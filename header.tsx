import { Link, useRouterState } from '@tanstack/react-router';
import { Sprout, Users, Trophy, User, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', label: 'Garden', icon: Sprout },
    { path: '/social', label: 'Social', icon: Users },
    { path: '/achievements', label: 'Achievements', icon: Trophy },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/ui-customization', label: 'UI', icon: Palette },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">BloomLoop</span>
        </Link>
        
        <nav className="flex items-center space-x-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path}>
              <Button
                variant={currentPath === path ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
