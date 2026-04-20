interface ProgressBarProps {
  progress: number // 0-100
  currentStep?: number
  totalSteps?: number
}

export function ProgressBar({ progress, currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-600 transition-all duration-300 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
