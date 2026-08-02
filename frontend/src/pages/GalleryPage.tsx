import { useState, useEffect, useCallback } from 'react'
import Header from '../components/Header.tsx'
import PhotoGrid from '../components/PhotoGrid.tsx'
import PhotoModal from '../components/PhotoModal.tsx'
import FlowerCarousel from '../components/FlowerCarousel.tsx'
import api from '../api/client.ts'
import { Photo, Flower } from '../types.ts'

type Tab = 'fotos' | 'flores'

export default function GalleryPage() {
  const [tab, setTab] = useState<Tab>('fotos')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [flowers, setFlowers] = useState<Flower[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    api.get<Photo[]>('/images').then((res) => setPhotos(res.data)).catch(() => setPhotos([]))
    api.get<Flower[]>('/flowers').then((res) => setFlowers(res.data)).catch(() => setFlowers([]))
  }, [])

  const handleReorder = useCallback(async (reordered: Photo[]) => {
    setPhotos(reordered)
    try {
      await api.put('/images/order', { orderedIds: reordered.map((p) => p.id) })
    } catch {
      // se falhar, um proximo fetch/refresh corrige a ordem de volta
    }
  }, [])

  async function handleUploadFiles(fileList: FileList) {
    const formData = new FormData()
    Array.from(fileList).forEach((file) => formData.append('files', file))
    const res = await api.post<Photo[]>('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    setPhotos((prev) => [...prev, ...res.data])
  }

  async function handleSavePhoto(updated: Photo) {
    setPhotos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    await api.put(`/images/${updated.id}`, { date: updated.date, description: updated.description })
  }

  return (
    <div className="page-shell" style={{ background: 'var(--cream)' }}>
      <div className="section-full" style={{ borderBottom: '0.5px solid var(--border)' }}>
        <Header onAvatarClick={() => { /* abrir seletor de nova foto de perfil */ }} />
      </div>

      <div className="section-full">
        <div className="section-inner" style={{ maxWidth: 1000, paddingTop: 16 }}>
          <div style={{ display: 'flex', gap: 4, borderBottom: '0.5px solid var(--border)' }}>
            {([['fotos', 'Fotos'], ['flores', 'Flores']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: '8px 4px',
                  marginLeft: key === 'flores' ? 16 : 0,
                  fontSize: 14,
                  fontWeight: 500,
                  color: tab === key ? 'var(--pink-deep)' : 'var(--neutral-muted)',
                  borderBottom: tab === key ? '2px solid var(--pink-strong)' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ padding: '20px 0 40px' }}>
            {tab === 'fotos' ? (
              <PhotoGrid
                photos={photos}
                onReorder={handleReorder}
                onUploadFiles={handleUploadFiles}
                onPhotoClick={setSelectedPhoto}
              />
            ) : (
              <FlowerCarousel flowers={flowers} />
            )}
          </div>
        </div>
      </div>

      <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} onSave={handleSavePhoto} />
    </div>
  )
}
