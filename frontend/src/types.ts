// Tipos compartilhados entre paginas e componentes.
// Ajustem os campos aqui conforme o contrato real do backend for fechando.

export interface Photo {
  id: string
  url: string
  thumbnailUrl?: string
  date?: string
  description?: string
  favorite?: boolean
}

export interface Flower {
  id: string
  name: string
  imageUrl: string
  dateGiven?: string | null
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
}

export interface AuthFormData {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}
