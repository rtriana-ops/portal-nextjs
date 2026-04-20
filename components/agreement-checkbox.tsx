interface AgreementCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string | React.ReactNode
  helperText?: string | React.ReactNode
  required?: boolean
}

export function AgreementCheckbox({
  checked,
  onChange,
  label,
  helperText,
  required = false,
}: AgreementCheckboxProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-start cursor-pointer gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
        />
        <span className="leading-relaxed text-gray-500 font-sans text-xs">
          {label}
        </span>
      </label>
      {helperText && (
        <div className="ml-6 text-xs text-gray-500 leading-relaxed font-sans">
          {helperText}
        </div>
      )}
    </div>
  )
}
