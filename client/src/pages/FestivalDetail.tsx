import axios from 'axios'
import { useEffect, useState } from 'react'
import { IFestival, ITouristSpot } from 'src/utils/interface'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import '../css/detailPage.css'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import default_image from '../img/default_img.png'

const FestivalDetail = () => {
  const { content_id } = useParams()
  const location = useLocation()
  const [festival, setFestival] = useState<IFestival | null>(null)

  const queryParams = new URLSearchParams(location.search)
  const map_x = queryParams.get('mapx') || '127.0'
  const map_y = queryParams.get('mapy') || '37.5'

  const getFestival = async () => {
    try {
      const response = await axios.get(`/api/festival/detail`, {
        params: { content_id, num_of_rows: 1 },
      })
      setFestival(response.data)
    } catch (error) {
      console.error('관광지 가져오기 오류:', error)
      alert('관광지를 가져오는 중 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    getFestival()
    // const initializeMap = () => {
    //   const container = document.getElementById('map')
    //   if (container && window.kakao && window.kakao.maps) {
    //     const options = {
    //       center: new window.kakao.maps.LatLng(map_y, map_x),
    //       level: 3,
    //     }
    //     new window.kakao.maps.Map(container, options)
    //   }
    // }
    // initializeMap()
  }, [content_id, map_x, map_y])

  return (
    <div className='tourist-spot-detail-container'>
      {festival && (
        <div className='tourist-spot-content'>
          <div className='image-container'>
            <img
              src={
                festival.first_image !== ''
                  ? festival.first_image
                  : default_image
              }
              alt={festival.title}
              className='festival-image'
            />
          </div>
          <div className='text-and-map-container'>
            <div className='title-address'>
              <h3>{festival.title}</h3>
              <h6>{festival.addr1}</h6>
            </div>
            <div className='divider' />
            {/* <div
              id='map'
              className='map-container'
            /> */}
            <Map
              center={{ lat: Number(map_y), lng: Number(map_x) }}
              className='map-container'
              level={3}
            >
              <MapMarker
                position={{ lat: Number(map_y), lng: Number(map_x) }}
              ></MapMarker>
            </Map>
          </div>
        </div>
      )}
    </div>
  )
}

const NearbyTouristSpots = () => {
  const { content_id } = useParams()
  const navigate = useNavigate()
  const [nearbySpots, setNearbySpots] = useState<ITouristSpot[]>([])
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const map_x = queryParams.get('mapx')
  const map_y = queryParams.get('mapy')

  const getNearbyTouristSpots = async () => {
    try {
      const response = await axios.get('/api/touristspot/nearby', {
        params: { content_id, map_x, map_y },
      })
      setNearbySpots(response.data)
    } catch (error) {
      console.error('Nearby tourist spots fetch error:', error)
      alert('주변 여행지를 가져오는 중 오류가 발생했습니다.')
    }
  }

  const handleBoxClick = (touristSpot: ITouristSpot) => {
    const { content_id, mapx, mapy } = touristSpot
    navigate(`/touristspot/${content_id}?mapx=${mapx}&mapy=${mapy}`)
  }

  useEffect(() => {
    getNearbyTouristSpots()
  }, [content_id])

  return (
    <div className='nearby-tourist-spots'>
      <h4>주변 여행지</h4>
      <div className='tourist-spots-container'>
        {nearbySpots.map((touristSpot, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(touristSpot)}
            className='list-box'
          >
            <img
              src={
                touristSpot.first_image !== ''
                  ? touristSpot.first_image
                  : default_image
              }
              alt={touristSpot.title}
              className='spot-image'
            />
            <h5 className='spot-title'>{touristSpot.title}</h5>
            <span className='list-address'>{touristSpot.addr1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const FestivalDetailPage = () => (
  <div>
    <FestivalDetail />
    <NearbyTouristSpots />
  </div>
)

export default FestivalDetailPage
