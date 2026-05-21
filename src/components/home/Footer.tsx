export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-xs font-bold text-gradient-accent">
            E
          </div>
          <span className="text-sm font-medium text-white/70">
            Edu<span className="text-gradient-accent">AI</span>
          </span>
        </div>
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} EduAI. Built for learners who aim higher.
        </p>
      </div>
    </footer>
  );
}
