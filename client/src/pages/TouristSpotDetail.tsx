import axios from 'axios'
import { useEffect, useState } from 'react'
import { ITouristSpot } from 'src/utils/interface'
import { useLocation, useNavigate, useParams } from 'react-router-dom' // URL 파라미터를 가져오기 위해 import
import '../css/detailPage.css'
import default_image from '../img/default_img.png'

const TouristSpotDetail = () => {
  const { content_id } = useParams() // URL에서 content_id 가져오기
  const [touristSpot, setTouristSpot] = useState<ITouristSpot | null>(null)

  const getTouristSpot = async () => {
    try {
      const response = await axios.get(`/api/touristspot/detail`, {
        params: {
          content_id: content_id, // content_id 추가
          num_of_rows: 1,
        },
      })

      setTouristSpot(response.data) // response.data에 필요한 데이터가 있다고 가정
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
      {touristSpot && ( // touristSpot이 null이 아닐 때만 렌더링
        <>
          <div style={{ flex: '0 0 50%', paddingRight: '20px' }}>
            <img
              src={
                touristSpot.first_image !== ''
                  ? touristSpot.first_image
                  : default_image
              }
              alt={touristSpot.title}
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
            <h3>{touristSpot.title}</h3>
            <h6 style={{ color: '#4a4a4a' }}>{touristSpot.addr1}</h6>

            <div
              style={{
                width: '100%',
                position: 'relative',
                height: '30px',
                borderRadius: '15px',
                overflow: 'hidden',
                backgroundColor: !touristSpot.total_review
                  ? '#BDBDBD'
                  : 'transparent', // 회색 배경 설정
              }}
            >
              {touristSpot.total_review ? (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      width: `${
                        (touristSpot.positive / touristSpot.total_review) * 100
                      }%`, // 긍정 비율
                      height: '100%',
                      backgroundColor: '#4CAF50', // 긍정 색상 (녹색)
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: `${
                        (touristSpot.positive / touristSpot.total_review) * 100
                      }%`,
                      top: '0',
                      width: `${
                        (touristSpot.negative / touristSpot.total_review) * 100
                      }%`, // 부정 비율
                      height: '100%',
                      backgroundColor: '#F44336', // 부정 색상 (빨강)
                    }}
                  />
                </>
              ) : (
                // total_review가 없는 경우 회색 배경만 표시
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    color: '#757575',
                    backgroundColor: '#BDBDBD', // 회색 배경 (데이터 없음)
                  }}
                >
                  리뷰가 부족합니다
                </div>
              )}
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
const TouristSpotDetailPage = () => {
  return (
    <div>
      <TouristSpotDetail />
      <NearbyTouristSpots />
    </div>
  )
}

export default TouristSpotDetailPage
