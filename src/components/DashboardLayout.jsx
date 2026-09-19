import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between border-b border-border bg-surface px-6 py-3">
        <Link to="/" className="text-sm font-bold text-white">Digi<span className="text-accent">Shield</span></Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          <Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link>
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}