const items = [
  { cat: "AI Tool", title: "Perplexity adds study mode", tag: "Try in Prep" },
  { cat: "Tech", title: "OpenAI releases faster mini model", tag: "News" },
  { cat: "Internship", title: "Summer SWE openings — FAANG list", tag: "Apply" },
  { cat: "Productivity", title: "Deep work templates for exam season", tag: "Guide" },
];

export default function NewsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gradient mb-2">News & Updates</h1>
      <p className="text-white/45 text-sm mb-6">AI tools, tech, internships, productivity.</p>
      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="glass-panel rounded-xl p-4 flex items-center justify-between gap-4 hover:border-cyan-500/30 transition-colors"
          >
            <div>
              <span className="text-[10px] uppercase tracking-wider text-cyan-400/80">{item.cat}</span>
              <p className="text-sm font-medium text-white/90 mt-1">{item.title}</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-white/[0.06] text-white/50">{item.tag}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
