import axios from 'axios'
import { useEffect, useState } from 'react'
import RegionList from './RegionList'
import { Col, Container, Row } from 'react-bootstrap'
import dayjs from 'dayjs'
import '../../css/FestivalList.css'
import Pagenation from './Pagenation'
interface IFestival {
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
  const [festivals, setFestivals] = useState<IFestival[]>([])
  const [childRegions, setChildRegions] = useState<string[]>([])
  const [startDate, setStartDate] = useState<string | null>(
    dayjs().format('YYYY-MM-DD')
  )
  const [endDate, setEndDate] = useState<string | null>(
    dayjs().add(1, 'year').format('YYYY-MM-DD')
  )
  const [maxPage, setMaxPage] = useState<number>(1)
  const [page, setPage] = useState<number>(1)

  const getFestivals = async () => {
    try {
      const response = await axios.get(`/api/festival/getbyrange`, {
        params: {
          pageNum: page,
          pageSize: 21,
          regions: childRegions,
          endDate: endDate,
          startDate: startDate,
        },
      })
      setFestivals(response.data)
    } catch (error) {
      console.error('축제 가져오기 오류:', error)
      throw new Error('축제를 가져오는 중 오류가 발생했습니다.')
    }
  }

  const getMaxPage = async () => {
    const response = await axios.get(`/api/festival/count`, {
      params: {
        regions: childRegions,
        endDate: endDate,
        startDate: startDate,
      },
    })
    setMaxPage(Math.ceil(response.data / 21))
  }

  const getStartDate = (date: string) => {
    setStartDate(date)
  }

  const getEndDate = (date: string) => {
    setEndDate(date)
  }

  const getChildRegions = (regions: string[]) => {
    setChildRegions(regions)
    console.log(regions)
  }

  const onClickButton = async () => {
    await getFestivals() // 축제 가져오기를 완료한 후에 페이지 번호를 설정
    await getMaxPage()
  }

  useEffect(() => {
    getMaxPage()
    getFestivals() // 초기 검색
  }, [page])

  return (
    <div>
      <Container>
        <RegionList
          getStartDate={getStartDate}
          getEndDate={getEndDate}
          getChildRegions={getChildRegions}
          onClickButton={onClickButton}
        />
        <Row xs={1} md={3} className='g-4'>
          {festivals.map((festival) => (
            <Col key={festival.festival_id}>
              <div className='festival-box'>
                <img
                  src={festival.first_image}
                  alt={festival.title}
                  className='img-fluid'
                />
                <h5>{festival.title}</h5>
                <a>
                  {festival.event_start_date.split('T')[0]} ~{' '}
                  {festival.event_end_date.split('T')[0]}
                </a>
                <a className='festival-address'>
                  {festival.address1.split(' ').slice(0, 2).join(' ')}
                </a>
              </div>
            </Col>
          ))}
        </Row>
        <Pagenation page={page} setPage={setPage} maxPage={maxPage} />
      </Container>
    </div>
  )
}

export default FestivalList
