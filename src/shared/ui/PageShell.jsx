export default function PageShell({ title, children }) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      {children ? (
        <div className="mt-4">{children}</div>
      ) : (
        <p className="mt-2 text-sm text-gray-500">Halaman kosong — isi UI di sini.</p>
      )}
    </div>
  )
}
