import axios from 'axios'
import { useEffect, useState } from 'react'
import RegionList from './RegionList'
import { Col, Container, Row } from 'react-bootstrap'

interface IFestivals {
  address1: string
  address2?: string
  age_limit?: string
  booktour: boolean
  category_code: string
  charge?: string
  content_id: number
  content_type_id: number
  discount_info?: string
  event_end_date: string
  event_start_date: string
  festival_id: number
  first_image?: string
  first_image2?: string
  homepage?: string
  nx: number
  ny: number
  overview?: string
  tel?: string
  title: string
}

const FestivalList = () => {
  // 화면에 보여질 축제 정보
  // 현재 페이지 관리
  const [festivals, setFestivals] = useState<IFestivals[] | []>([])
  const [pages, setPages] = useState<number>(1)

  const getFestivals = (festivalData: IFestivals[]) => {
    setFestivals(festivalData)
    console.log(festivals)
  }

  useEffect(() => {}, [festivals])

  return (
    <div>
      <Container>
        <RegionList getFestivals={getFestivals} />
        <Row xs={1} md={5} className='g-4'>
          {/* 1 column on extra small devices, 5 columns on medium devices */}
          {festivals.map((festival) => (
            <Col key={festival.festival_id}>
              <img
                src={festival.first_image2}
                alt={festival.title}
                className='img-fluid'
              />
              <h5>{festival.title}</h5>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )

  // 1. 20개 가져온거 보여주기

  // 2. 페이지네이션 진행하기

  // 3. 페이지 이동 시 다시 로딩하기
}

export default FestivalList
