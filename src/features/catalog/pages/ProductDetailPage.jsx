import { useParams } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'

export default function ProductDetailPage() {
  const { slug } = useParams()

  return <PageShell title={`Produk: ${slug}`} />
}
