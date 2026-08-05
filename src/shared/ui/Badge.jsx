export default function Badge({ tone = 'neutral', className = '', ...props }) {
  const styles =
    tone === 'success'
      ? 'bg-green-50 text-green-700 border border-green-200'
      : tone === 'danger'
        ? 'bg-red-50 text-red-700 border border-red-200'
        : tone === 'warning'
          ? 'bg-amber-50 text-amber-700 border border-amber-200'
          : 'bg-gray-50 text-gray-700 border border-gray-200'

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles} ${className}`}
      {...props}
    />
  )
}

