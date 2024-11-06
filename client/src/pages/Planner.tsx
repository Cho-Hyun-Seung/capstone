import axios from 'axios'
import { useEffect, useState } from 'react'
import '../css/Planner.css'
import dayjs from 'dayjs'
import { IFestival, IRegion, ITouristSpot } from 'src/utils/interface'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Row, Col, Button, Container } from 'react-bootstrap'
import 'swiper/css'

const Planner = () => {
  const [festivals, setFestivals] = useState<IFestival[]>([])
  const [startDate, setStartDate] = useState<string | null>(
    dayjs().format('YYYY-MM-DD')
  )
  const [selectFestival, setSelectFestival] = useState<IFestival | null>(null)
  const [endDate, setEndDate] = useState<string | null>(
    dayjs().add(1, 'year').format('YYYY-MM-DD')
  )
  const [nearbySpots, setNearbySpots] = useState<ITouristSpot[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [activeBoxId, setActiveBoxId] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getFestivals(34) // 초기 검색
  }, [])

  const getPlanner = async () => {
    if (selectFestival != null) {
      setLoading(true) // 로딩 상태 활성화
      try {
        const response = await axios.get(`/api/planner`, {
          params: {
            page_no: 1,
            num_of_rows: 400,
            map_x: selectFestival.mapx,
            map_y: selectFestival.mapy,
          },
        })
        setNearbySpots(response.data)
        setErrorMessage(null)
      } catch (error) {
        console.error('주변 여행지가 없습니다.', error)
        setErrorMessage('주변 여행지가 없습니다.')
      } finally {
        setLoading(false) // 로딩 상태 비활성화
      }
    }
  }

  const getFestivals = async (sigungu_code: number) => {
    try {
      const response = await axios.get(`/api/festival`, {
        params: {
          page_no: 1,
          num_of_rows: 400,
          parent_code: 0,
          sigungu_code: sigungu_code,
          event_start_date: startDate,
          event_end_date: endDate,
        },
      })
      setFestivals(response.data)
      setErrorMessage(null) // 성공 시 에러 메시지 초기화
    } catch (error) {
      console.error('축제 가져오기 오류:', error)
      setFestivals([])
      setErrorMessage('축제를 가져오는 중 오류가 발생했습니다.')
    }
  }

  const handleBoxClick = (festival: IFestival) => {
    if (activeBoxId === festival.content_id) {
      // 이미 선택된 축제를 다시 클릭하면 선택 해제
      setActiveBoxId(null)
      setSelectFestival(null)
    } else {
      // 새로운 축제를 선택
      setActiveBoxId(festival.content_id)
      setSelectFestival(festival)
    }
  }

  return (
    <Container>
      <Row className='text-start mb-3'>
        <Col>
          <h3>축제 선택</h3>
        </Col>
        <Col className='text-end'>
          <Button
            variant='primary'
            onClick={getPlanner}
            disabled={loading || !selectFestival} // 로딩 중이거나 선택된 축제가 없을 때 비활성화
          >
            {loading ? '생성 중...' : '생성'}
          </Button>
        </Col>
      </Row>
      {errorMessage && <p className='error'>{errorMessage}</p>}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {festivals.map((festival) => (
          <SwiperSlide key={festival.content_id}>
            <div
              className={`planner-festival-box ${
                activeBoxId === festival.content_id ? 'active' : ''
              }`}
              onClick={() => handleBoxClick(festival)}
            >
              <img
                src={
                  festival.first_image !== ''
                    ? festival.first_image
                    : '/utils/default_img.png'
                }
                alt={festival.title}
                className='img-fluid'
              />
              <h5>{festival.title}</h5>
              <div className='planner-festival-dates'>
                {`${festival.event_start_date.substring(
                  0,
                  4
                )}. ${festival.event_start_date.substring(
                  4,
                  6
                )}. ${festival.event_start_date.substring(6, 8)} ~ `}
                {`${festival.event_end_date.substring(
                  0,
                  4
                )}. ${festival.event_end_date.substring(
                  4,
                  6
                )}. ${festival.event_end_date.substring(6, 8)}`}
              </div>
              <div className='planner-festival-address'>
                {festival.addr1.split(' ').slice(0, 2).join(' ')}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default Planner
