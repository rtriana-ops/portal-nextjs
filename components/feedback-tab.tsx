"use client"

export function FeedbackTab() {
  return (
    <button className="fixed right-0 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground py-6 px-3 rounded-l-lg shadow-lg hover:bg-accent/90 transition-colors z-50">
      <span className="writing-mode-vertical text-sm font-medium tracking-wider">Feedback</span>
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </button>
  )
}
