export interface Plants {
  data: PlantsProps[]
  to: number
  per_page: number
  current_page: number
  from: number
  last_page: number
  total: number
}

export interface PlantsProps {
  id: number
  quantity?: number
  common_name: string
  scientific_name: string[]
  other_name: string[]
  cycle: string
  watering: string
  sunlight: string[]
  inclusion_date: string
  price: number
  default_image?: DefaultImage
}

export interface DefaultImage {
  license: number
  license_name: string
  license_url: string
  original_url: string
  regular_url?: string
  medium_url?: string
  small_url?: string
  thumbnail?: string
}
