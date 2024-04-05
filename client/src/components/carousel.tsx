import axios from 'axios'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import '../css/carousel.css'

interface ICarouselFestival {
  festival_id: number
  title: string
  event_start_date: string
  event_end_date: string
  first_image: string
}

const MainCarousel = () => {
  const [festivals, setFestivals] = useState<ICarouselFestival[]>([])
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
        const startDate = `${year}/${month}/${day}`
        const endDate = `${year}/${nextMonth}/${day}`

        const response = await axios.get(
          `/api/festival/getbydate?startDate=${startDate}&endDate=${endDate}&size=3`
        )
        setFestivals(response.data)
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
        <Carousel.Item key={idx + festivals.length} interval={1500}>
          <Row>
            <Col xs={6} className='festival_info'>
              <h1 className='festival_title'>{festival.title}</h1>
              <h5 className='festival_schedule'>
                {festival.event_start_date.split('T')[0]} ~{' '}
                {festival.event_end_date.split('T')[0]}
              </h5>
            </Col>
            <Col xs={6} className='carousel-image-box'>
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
