import axios from 'axios'
import { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'

interface ICarouselFestival {
  festival_id: number
  title: string
  event_start_date: Date
  event_end_date: Date
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
      activeIndex={index}
      onSelect={handleSelect}
      onSlid={handleCarouselEnd}
    >
      {festivals.map((festival, idx) => (
        <Carousel.Item key={idx + festivals.length} interval={500}>
          <img
            src={festival.first_image}
            alt={`Slide ${idx + festivals.length}`}
          />
          <Carousel.Caption>
            <h3>{festival.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default MainCarousel
