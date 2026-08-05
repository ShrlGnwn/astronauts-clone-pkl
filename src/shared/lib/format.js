export function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount || 0)
}

export function formatDate(isoDate) {
  if (!isoDate) return '-'
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) return '-'

  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(d)
}

