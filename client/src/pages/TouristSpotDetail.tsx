const TouristSpotDetail = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '0 120px', // 좌우 여백
      }}
    >
      <div style={{ flex: '0 0 50%', paddingRight: '20px' }}>
        <img
          src='http://tong.visitkorea.or.kr/cms/resource/29/3339929_image2_1.JPG'
          alt='Tourist Spot'
          style={{ width: '100%', height: 'auto' }}
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
        <h3>가산사</h3>
        <h6 style={{ color: '#4a4a4a' }}>
          충청북도 옥천군 안내면 안내회남로 671
        </h6>

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
    </div>
  )
}

const NearbyTouristSpots = () => {
  const spots = [
    {
      name: '가섭사',
      image:
        'http://tong.visitkorea.or.kr/cms/resource/40/3340640_image2_1.JPG',
    },
    {
      name: '각연사',
      image:
        'http://tong.visitkorea.or.kr/cms/resource/73/3334573_image2_1.JPG',
    },
    {
      name: '갈기산',
      image:
        'http://tong.visitkorea.or.kr/cms/resource/51/3341351_image2_1.JPG',
    },
  ]

  return (
    <div style={{ marginTop: '60px', padding: '0 120px' }}>
      <h4 style={{ textAlign: 'left' }}>주변 여행지</h4> {/* 좌측 정렬 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start', // 좌측 정렬
          flexWrap: 'wrap',
        }}
      >
        {spots.map((spot, index) => (
          <div
            key={index}
            style={{ flex: '0 0 30%', margin: '10px' }}
          >
            <img
              src={spot.image}
              alt={spot.name}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }} // 이미지 크기 조정
            />
            <h6 style={{ textAlign: 'center' }}>{spot.name}</h6>
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
