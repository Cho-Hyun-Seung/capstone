import axios from 'axios'
import { useEffect, useState } from 'react'
import RegionList from './RegionList'
import { Col, Container, Row } from 'react-bootstrap'
import dayjs from 'dayjs'
import '../../css/ListPage.css'
import Pagenation from './Pagenation'
import { IFestival } from 'src/utils/interface'

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
      const response = await axios.get(`/api/festival`, {
        params: {
          page_no: page,
          num_of_rows: 21,
          regions: childRegions,
          event_start_date: startDate,
          event_end_date: endDate,
        },
      })
      setFestivals(response.data)
    } catch (error) {
      console.error('축제 가져오기 오류:', error)
      //! 결과 값이 0인 경우 오류가 존재함!!
      throw new Error('축제를 가져오는 중 오류가 발생했습니다.')
    }
  }

  const getMaxPage = async () => {
    const response = await axios.get(`/api/festival`, {
      params: {
        page_no: 1,
        num_of_rows: 100000,
        regions: childRegions,
        event_start_date: startDate,
        event_end_date: endDate,
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
        <Row
          xs={1}
          md={3}
          className='g-4'
        >
          {festivals.map((festival) => (
            <Col key={festival.content_id}>
              <div className='listpage-box'>
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
                <a className='listpage-address'>
                  {festival.addr1.split(' ').slice(0, 2).join(' ')}
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
    </div>
  )
}

export default FestivalList
