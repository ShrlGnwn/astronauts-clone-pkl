export default function Button({
  variant = 'primary',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const styles =
    variant === 'secondary'
      ? 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
      : 'bg-purple-600 text-white hover:bg-purple-700'

  return <button className={`${base} ${styles} ${className}`} {...props} />
}

