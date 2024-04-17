import axios from 'axios'
import { useEffect, useState } from 'react'
import RegionList from './RegionList'
import { Col, Container, Row } from 'react-bootstrap'
import Pagenation from './Pagenation'
import '../../css/ListPage.css'

interface ITouristSpot {
  tourist_spot_id: number
  category_code: string
  title: string
  content_id: number
  content_type_id: number
  address1: string
  address2?: string
  booktour: boolean
  culture_heritage: boolean
  natural_heritage: boolean
  memory_heritage: boolean
  open_date?: string
  rest_date?: string
  age_limit?: string
  first_image?: string
  first_image2?: string
  tel?: string
  nx: number
  ny: number
  overview?: string
}

interface Category {
  category_code: string
  category_name: string
  children: Category[]
}

const TouristSpotList = () => {
  const [touristSpots, setTouristSpots] = useState<ITouristSpot[]>([])
  const [childRegions, setChildRegions] = useState<String[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [maxPage, setMaxPage] = useState<number>(1)
  const [page, setPage] = useState<number>(1)

  const getTouristSpot = async () => {
    try {
      const response = await axios.get(`/api/touristspot/all`, {
        params: {
          pageNum: page,
          pageSize: 21,
          regions: childRegions,
          category_code: selectedCategory,
        },
      })
      setTouristSpots(response.data)
    } catch (error) {
      console.error('관광지 가져오기 오류:', error)
      throw new Error('관광지를 가져오는 중 오류가 발생했습니다.')
    }
  }

  const getChildRegions = (regions: string[]) => {
    setChildRegions(regions)
    console.log(regions)
  }

  const getCategoryArray = (categories: Category[]) => {
    const setData = categories.map((v: Category) => {
      return v.category_code
    })
    setSelectedCategory([...setData])
  }

  const getMaxPage = async () => {
    const response = await axios.get(`/api/touristspot/count`, {
      params: {
        regions: childRegions,
        category_code: selectedCategory,
      },
    })
    setMaxPage(Math.ceil(response.data / 21))
  }

  const onClickButton = async () => {
    await getTouristSpot() // 축제 가져오기를 완료한 후에 페이지 번호를 설정
    await getMaxPage()
  }

  useEffect(() => {
    getMaxPage()
    getTouristSpot() // 초기 검색
  }, [page])

  return (
    <Container>
      <RegionList
        getChildRegions={getChildRegions}
        onClickButton={onClickButton}
        getCategoryArray={getCategoryArray}
      />
      <Row xs={1} md={3} className='g-4'>
        {touristSpots.map((touristSpot) => (
          <Col key={touristSpot.tourist_spot_id}>
            <div className='listpage-box'>
              <img
                src={touristSpot.first_image}
                // alt={touristSpot.title}
                className='img-fluid'
              />
              <h5>{touristSpot.title}</h5>
              <a className='listpage-address'>
                {touristSpot.address1.split(' ').slice(0, 2).join(' ')}
              </a>
            </div>
          </Col>
        ))}
      </Row>
      <Pagenation page={page} setPage={setPage} maxPage={maxPage} />
    </Container>
  )
}

export default TouristSpotList
