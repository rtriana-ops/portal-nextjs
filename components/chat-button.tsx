export function ChatButton() {
  return (
    <button className="fixed bottom-6 right-6 w-14 h-14 bg-success text-success-foreground rounded-full shadow-xl hover:bg-success/90 transition-all hover:scale-110 flex items-center justify-center z-50">
      <svg className="text-center text-sm" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H9L5 21V7C5 6.46957 5.21071 5.96086 5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V15Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
