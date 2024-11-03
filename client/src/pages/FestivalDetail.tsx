import axios from 'axios'
import { useEffect, useState } from 'react'
import { IFestival, ITouristSpot } from 'src/utils/interface'
import { useLocation, useNavigate, useParams } from 'react-router-dom' // URL 파라미터를 가져오기 위해 import
import '../css/ListPage.css'

const TouristSpotDetail = () => {
  const { content_id } = useParams() // URL에서 content_id 가져오기
  const [festival, setFestival] = useState<IFestival | null>(null)

  const getTouristSpot = async () => {
    try {
      const response = await axios.get(`/api/festival/detail`, {
        params: {
          content_id: content_id, // content_id 추가
          num_of_rows: 1,
        },
      })

      setFestival(response.data) // response.data에 필요한 데이터가 있다고 가정
    } catch (error) {
      console.error('관광지 가져오기 오류:', error)
      throw new Error('관광지를 가져오는 중 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    getTouristSpot() // 컴포넌트가 마운트될 때 데이터 가져오기
  }, [content_id]) // content_id가 변경될 때마다 호출

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '0 120px', // 좌우 여백
      }}
    >
      {festival && ( // touristSpot이 null이 아닐 때만 렌더링
        <>
          <div style={{ flex: '0 0 50%', paddingRight: '20px' }}>
            <img
              src={festival.first_image}
              alt={festival.title}
              style={{
                minHeight: '300px', // 최소 높이 설정
                maxHeight: '400px', // 최대 높이 설정
                minWidth: '200px', // 최소 너비 설정
                maxWidth: '100%', // 최대 너비를 100%로 설정
                objectFit: 'contain', // 비율 유지
              }}
            />
          </div>
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left', // 텍스트 좌측 정렬
              marginTop: '20px', // 텍스트 위에 살짝 여백 추가
            }}
          >
            <h3>{festival.title}</h3>
            <h6 style={{ color: '#4a4a4a' }}>{festival.addr1}</h6>

            {/* 물결 모양 비율 표시 */}
            <div
              style={{
                width: '100%',
                position: 'relative',
                height: '30px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '50%',
                  width: '60%', // 긍정 비율
                  height: '100%',
                  backgroundColor: '#4CAF50', // 긍정 색상 (녹색)
                  borderRadius: '15px 0 0 15px', // 좌측 둥글게
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '50%',
                  width: '40%', // 부정 비율
                  height: '100%',
                  backgroundColor: '#F44336', // 부정 색상 (빨강)
                  borderRadius: '0 15px 15px 0', // 우측 둥글게
                }}
              />
            </div>

            {/* 구분선 추가 */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: '#ccc', // 회색 구분선 색상
                margin: '5px 0', // 구분선 위아래 여백을 줄임
              }}
            />

            {/* 관련 영상 텍스트 추가 */}
            <h5 style={{ margin: '30px 0', fontWeight: 'bold' }}>관련 영상</h5>
          </div>
        </>
      )}
    </div>
  )
}

// NearbyTouristSpots 컴포넌트는 그대로 사용합니다.
const NearbyTouristSpots = () => {
  const { content_id } = useParams()
  const navigate = useNavigate()
  const [nearbySpots, setNearbySpots] = useState<ITouristSpot[]>([])
  const location = useLocation() // 쿼리 파라미터 가져오기
  const queryParams = new URLSearchParams(location.search) // 쿼리 파라미터 처리

  const map_x = queryParams.get('mapx') // 쿼리 파라미터에서 mapx 가져오기
  const map_y = queryParams.get('mapy') // 쿼리 파라미터에서 mapy 가져오기

  const getNearbyTouristSpots = async () => {
    try {
      const response = await axios.get('/api/touristspot/nearby', {
        params: {
          content_id: content_id,
          map_x: map_x,
          map_y: map_y,
        },
      })

      setNearbySpots(response.data)
    } catch (error) {
      console.error('Nearby tourist spots fetch error:', error)
      throw new Error('Failed to fetch nearby tourist spots.')
    }
  }

  const handleBoxClick = (touristSpot: ITouristSpot) => {
    const { content_id, mapx, mapy } = touristSpot
    // navigate를 통해 content_id, mapx, mapy를 쿼리 파라미터로 전달
    navigate(`/touristspot/${content_id}?mapx=${mapx}&mapy=${mapy}`)
  }

  useEffect(() => {
    getNearbyTouristSpots()
  }, [content_id])

  return (
    <div style={{ marginTop: '60px', padding: '0 120px' }}>
      <h4 style={{ textAlign: 'left' }}>주변 여행지</h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {nearbySpots.map((touristSpot, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(touristSpot)}
            className='listpage-box'
          >
            <img
              src={touristSpot.first_image}
              alt={touristSpot.title}
            />
            <h5>{touristSpot.title}</h5>
            <a
              href='#'
              className='listpage-address'
            >
              {touristSpot.addr1}
            </a>{' '}
            {/* 주소 링크 추가 */}
          </div>
        ))}
      </div>
    </div>
  )
}

const TouristSpotDetailPage = () => {
  return (
    <div>
      <TouristSpotDetail />
      <NearbyTouristSpots />
    </div>
  )
}

export default TouristSpotDetailPage
