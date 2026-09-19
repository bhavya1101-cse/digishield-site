export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.08),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <span className="text-lg font-bold text-white">Digi<span className="text-accent">Shield</span></span>
        <a href="#features" className="text-sm text-muted hover:text-white transition-colors">How it works</a>
      </nav>

      {/* hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center sm:pt-32">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          Know who you are really connecting with.
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
          AI-powered public identity resolution, evidence-backed and uncertainty-aware, built for NeuraX Hackathon 3.0.
        </p>
        <a href="/app" className="mt-10 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-transform hover:scale-105 hover:bg-accent-dim">Run an investigation</a>
      </div>
    </section>
  );
}