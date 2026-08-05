import { useParams } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'

export default function CollectionPage() {
  const { collectionKey } = useParams()

  return <PageShell title={`Koleksi: ${collectionKey}`} />
}
