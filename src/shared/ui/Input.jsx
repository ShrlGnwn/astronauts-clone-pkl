export default function Input({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label ? (
        <span className="block text-sm text-gray-700">{label}</span>
      ) : null}
      <input
        className={`mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
        {...props}
      />
    </label>
  )
}

