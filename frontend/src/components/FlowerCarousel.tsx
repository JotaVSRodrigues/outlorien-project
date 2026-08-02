import { Flower } from '../types.ts'

interface FlowerCarouselProps {
  flowers: Flower[]
}

// Carrossel horizontal de flores. Cada flor tem nome, imagem (ilustracao
// gerada por IA, fundo transparente) e a data em que foi "dada" -- ou null
// se ainda nao foi conquistada (fica acinzentada, com "?" no lugar da data).
export default function FlowerCarousel({ flowers }: FlowerCarouselProps) {
  return (
    <div>
      <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--neutral-muted)' }}>
        flores conquistadas ganham cor e data
      </p>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
        {flowers.map((flower) => {
          const unlocked = Boolean(flower.dateGiven)
          return (
            <div key={flower.id} style={{ minWidth: 88, textAlign: 'center' }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 12,
                  background: unlocked ? 'var(--pink-soft)' : '#F1EFE8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: unlocked ? 'none' : 'grayscale(1)',
                  opacity: unlocked ? 1 : 0.55,
                }}
              >
                <img
                  src={flower.imageUrl}
                  alt={flower.name}
                  style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                />
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: unlocked ? 'var(--pink-deep)' : 'var(--neutral-muted)' }}>
                {flower.name}
              </p>
              <p style={{ margin: '1px 0 0', fontSize: 10, color: '#B4B2A9' }}>
                {flower.dateGiven || '?'}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
