import axios from 'axios'
import { useEffect, useState } from 'react'

const FestivalList = () => {
  // 화면에 보여질 축제 정보
  // 현재 페이지 관리
  const [festials, setFestivals] = useState([])
  const [pages, setPages] = useState<number>(1)

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
        const endDate = `${year + 2}/${nextMonth}/${day}`

        // 20개씩 가져옴
        const response = await axios.get(
          `/api/festival/getbydate?startDate=${startDate}&endDate=${endDate}&size=20`
        )
        setFestivals(response.data)
      } catch (error) {
        console.error('Error fetching carousel festival:', error)
      }
    }

    fetchData()
  }, [])

  // 1. 20개 가져온거 보여주기

  // 2. 페이지네이션 진행하기

  // 3. 페이지 이동 시 다시 로딩하기
}

export default FestivalList
