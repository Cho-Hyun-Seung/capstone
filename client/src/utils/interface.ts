import internal from 'stream'

export interface ITouristSpot {
  content_id: number
  category_code?: string
  title: string
  positive: number
  negative: number
  total_review: number
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

export interface IFestival {
  addr1: string
  addr2?: string
  // age_limit?: string
  // booktour: boolean
  // category_code: string
  // charge?: string
  content_id: number
  // content_type_id: number
  // discount_info?: string
  event_end_date: string
  event_start_date: string
  first_image?: string
  first_image2?: string
  // homepage?: string
  mapx: number
  mapy: number
  overview?: string
  // tel?: string
  title: string
}

export interface Category {
  category_code: string
  category_name: string
  children: Category[]
}

export interface IRegion {
  id: number
  region: string
  parent_code: number
  sigungu_code: number
}
