export interface RouteLink {
  to: string;
  label: string;
}

// Fonte unica per Navbar e breadcrumb del Layout.
export const ROUTES: RouteLink[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Profilo' },
  { to: '/skills', label: 'Competenze' },
  { to: '/experience', label: 'Esperienza' },
  { to: '/contact', label: 'Contatti' },
];
