import { useRef, useState } from 'react'
import { Photo } from '../types.ts'

interface PhotoGridProps {
  photos: Photo[]
  onReorder: (photos: Photo[]) => void
  onUploadFiles: (files: FileList) => void
  onPhotoClick: (photo: Photo) => void
}

// Grid de fotos com tile de upload e reordenacao por drag-and-drop nativo.
// Nota de tutoria: o drag-and-drop nativo do HTML5 nao funciona bem em
// touch (celular). Quando formos polir o mobile, trocamos isso por uma
// lib como dnd-kit ou @dnd-kit/sortable, que abstrai mouse + touch juntos.
export default function PhotoGrid({ photos, onReorder, onUploadFiles, onPhotoClick }: PhotoGridProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  function handleDrop(targetId: string) {
    if (draggedId === null || draggedId === targetId) return
    const current = [...photos]
    const fromIndex = current.findIndex((p) => p.id === draggedId)
    const toIndex = current.findIndex((p) => p.id === targetId)
    const [moved] = current.splice(fromIndex, 1)
    current.splice(toIndex, 0, moved)
    onReorder(current)
  }

  return (
    <div>
      <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--neutral-muted)' }}>
        arraste para reorganizar · toque para abrir a memoria
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files?.length) onUploadFiles(e.target.files)
          e.target.value = ''
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
          gap: 10,
        }}
      >
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            aspectRatio: '1',
            borderRadius: 10,
            border: '1.5px dashed #E0B8C8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#B87A98',
            background: 'none',
          }}
        >
          <i className="ti ti-plus" style={{ fontSize: 20 }} />
          <span style={{ fontSize: 10, marginTop: 2 }}>adicionar</span>
        </button>

        {photos.map((photo) => (
          <div
            key={photo.id}
            draggable
            onDragStart={() => setDraggedId(photo.id)}
            onDragEnd={() => setDraggedId(null)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(photo.id)}
            onClick={() => onPhotoClick(photo)}
            style={{
              aspectRatio: '1',
              borderRadius: 10,
              backgroundImage: `url(${photo.thumbnailUrl || photo.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'grab',
              position: 'relative',
              transition: 'opacity .15s, transform .15s',
              opacity: draggedId === photo.id ? 0.4 : 1,
            }}
          >
            {photo.favorite && (
              <i
                className="ti ti-heart"
                style={{ position: 'absolute', top: 6, right: 6, fontSize: 13, color: '#FFFBF5' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
