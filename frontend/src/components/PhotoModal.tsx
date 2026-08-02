import { useState, useEffect } from 'react'
import { Photo } from '../types.ts'

interface PhotoModalProps {
  photo: Photo | null
  onClose: () => void
  onSave: (photo: Photo) => void
}

// Modal centralizado, fundo desfocado, imagem inteira visivel (object-fit: contain).
export default function PhotoModal({ photo, onClose, onSave }: PhotoModalProps) {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (photo) {
      setDate(photo.date || '')
      setDescription(photo.description || '')
    }
  }, [photo])

  if (!photo) return null

  function handleSave() {
    if (!photo) return
    onSave({ ...photo, date, description })
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(74,59,18,0.4)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--cream)',
          borderRadius: 14,
          width: '100%',
          maxWidth: 340,
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '14px 14px 0', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            aria-label="Fechar"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <i className="ti ti-x" style={{ fontSize: 18, color: 'var(--neutral-muted)' }} />
          </button>
        </div>

        <div style={{ padding: '6px 20px 0', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: 10,
              background: '#F1EFE8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={photo.url}
              alt={photo.description || 'Foto do album'}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>

        <div style={{ padding: '14px 20px 18px' }}>
          <label htmlFor="photo-date" style={{ fontSize: 11, color: 'var(--neutral-muted)' }}>
            data
          </label>
          <input
            id="photo-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '100%', margin: '2px 0 10px' }}
          />
          <label htmlFor="photo-desc" style={{ fontSize: 11, color: 'var(--neutral-muted)' }}>
            o momento
          </label>
          <textarea
            id="photo-desc"
            rows={3}
            placeholder="escreva uma pequena descricao..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', marginTop: 2, resize: 'none' }}
          />
          <button className="btn-primary" onClick={handleSave} style={{ width: '100%', marginTop: 12 }}>
            salvar
          </button>
        </div>
      </div>
    </div>
  )
}
