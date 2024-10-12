export interface ITouristSpot {
  content_id: number
  category_code?: string
  title: string
  // content_id: number
  // content_type_id?: number
  addr1: string
  addr2?: string
  // booktour: boolean
  // culture_heritage: boolean
  // natural_heritage: boolean
  // memory_heritage: boolean
  // open_date?: string
  // rest_date?: string
  // age_limit?: string
  first_image?: string
  // first_image2?: string
  // tel?: string
  dist?: string
  mapx: string
  mapy: string
  overview?: string
}

export interface Category {
  category_code: string
  category_name: string
  children: Category[]
}
