import axios from 'axios'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import '../css/carousel.css'
import { IFestival } from 'src/utils/interface'

const MainCarousel = () => {
  const [festivals, setFestivals] = useState<IFestival[]>([])
  const [index, setIndex] = useState<number>(0)

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date()
        const year = today.getFullYear()
        const month = ('0' + (today.getMonth() + 1)).slice(-2)
        const nextMonth =
          month === '12' ? '01' : ('0' + (today.getMonth() + 2)).slice(-2)
        const day = ('0' + today.getDate()).slice(-2)
        const startDate = `${year}${month}${day}`
        const endDate = `${year}${nextMonth}${day}`

        const response = await axios.get(`/api/festival`, {
          params: {
            page_no: 1,
            num_of_rows: 10,
            event_start_date: startDate,
            event_end_date: endDate,
          },
        })
        const festival_data: IFestival[] = await response.data
          .filter((v: IFestival) => v.first_image !== '')
          .slice(0, 3)
        setFestivals(festival_data)
      } catch (error) {
        console.error('Error fetching carousel festival:', error)
      }
    }

    fetchData()
  }, [])

  const handleCarouselEnd = () => {
    if (index === festivals.length * 2 - 1) {
      setIndex(0)
    }
  }

  if (festivals.length === 0) {
    return null
  }

  return (
    <Carousel
      className='carousel-container'
      activeIndex={index}
      onSelect={handleSelect}
      onSlid={handleCarouselEnd}
    >
      {festivals.map((festival, idx) => (
        <Carousel.Item
          key={idx + festivals.length}
          interval={1500}
        >
          <Row>
            <Col
              xs={6}
              className='festival_info'
            >
              <h1 className='festival_title'>{festival.title}</h1>
              <h5 className='festival_schedule'>
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
              </h5>
            </Col>
            <Col
              xs={6}
              className='carousel-image-box'
            >
              <img
                className='carousel-image'
                src={festival.first_image}
                alt={`Slide ${idx + festivals.length}`}
              />
            </Col>
          </Row>
          {/* <Carousel.Caption>
              <h3>{festival.title}</h3>
            </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default MainCarousel
