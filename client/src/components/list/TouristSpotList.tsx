import axios from 'axios'
import { useEffect, useState } from 'react'
import RegionList from './RegionList'
import { Col, Container, Row } from 'react-bootstrap'
import Pagenation from './Pagenation'
import '../../css/ListPage.css'
import { useNavigate } from 'react-router-dom'
import { Category, IRegion, ITouristSpot } from 'src/utils/interface'

const TouristSpotList = () => {
  const [touristSpots, setTouristSpots] = useState<ITouristSpot[]>([])
  const [region, setRegion] = useState<IRegion>()
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [maxPage, setMaxPage] = useState<number>(1)
  const [page, setPage] = useState<number>(1)

  const navigate = useNavigate()

  const getTouristSpot = async () => {
    try {
      const response = await axios.get(`/api/touristspot`, {
        params: {
          page_no: page,
          num_of_rows: 21,
          parent_code: region?.parent_code,
          sigungu_code: region?.sigungu_code,
          category_code: selectedCategory.join(','),
        },
      })

      setTouristSpots(response.data)
    } catch (error) {
      console.error('관광지 가져오기 오류:', error)
      setTouristSpots([])
      throw new Error('관광지를 가져오는 중 오류가 발생했습니다.')
    }
  }

  const getRegion = (region: IRegion) => {
    setRegion(region)
    console.log('관광지에서', region)
  }

  const getCategoryArray = (categories: Category[]) => {
    const setData = categories.map((v: Category) => {
      return v.category_code
    })
    setSelectedCategory([...setData])
  }

  const getMaxPage = async () => {
    const response = await axios.get(`/api/touristspot`, {
      params: {
        page_no: page,
        num_of_rows: 20000,
        parent_code: region?.parent_code,
        sigungu_code: region?.sigungu_code,
        category_code: selectedCategory.join(','),
      },
    })
    setMaxPage(Math.ceil(response.data.length / 21))
  }

  const onClickButton = async () => {
    await getTouristSpot() // 축제 가져오기를 완료한 후에 페이지 번호를 설정
    await getMaxPage()
  }

  const handleBoxClick = (touristSpot: ITouristSpot) => {
    const { content_id, mapx, mapy } = touristSpot
    // navigate를 통해 content_id, mapx, mapy를 쿼리 파라미터로 전달
    navigate(`/touristspot/${content_id}?mapx=${mapx}&mapy=${mapy}`)
  }

  useEffect(() => {
    getMaxPage()
    getTouristSpot() // 초기 검색
  }, [page])

  return (
    <Container>
      <RegionList
        getRegion={getRegion}
        onClickButton={onClickButton}
        getCategoryArray={getCategoryArray}
      />
      <Row
        xs={1}
        md={3}
        className='g-4'
      >
        {touristSpots.map((touristSpot) => (
          <Col key={touristSpot.content_id}>
            <div
              className='listpage-box'
              onClick={() => handleBoxClick(touristSpot)}
            >
              <img
                src={touristSpot.first_image}
                // alt={touristSpot.title}
                className='img-fluid'
              />
              <h5>{touristSpot.title}</h5>
              <a className='listpage-address'>
                {touristSpot.addr1.split(' ').slice(0, 2).join(' ')}
              </a>
            </div>
          </Col>
        ))}
      </Row>
      <Pagenation
        page={page}
        setPage={setPage}
        maxPage={maxPage}
      />
    </Container>
  )
}

export default TouristSpotList
