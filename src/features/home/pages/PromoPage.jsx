import { useParams } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'

export default function PromoPage() {
  const { promoSlug } = useParams()

  return <PageShell title={`Promo: ${promoSlug}`} />
}
