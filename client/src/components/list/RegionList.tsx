import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
// import '../../css/RegionList.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { Box } from '@mui/material'

const RegionList = (props: any) => {
  const [pageNum, setPageNum] = useState<number>(1)
  const [regions, setRegions] = useState<string[]>([])
  const [selectParentRegion, setSelectParentRegion] = useState<string>('')
  const [childRegions, setChildRegions] = useState<string[]>([])
  const [selectChildRegions, setSelectChildRegions] = useState<string[]>([])
  const [startDate, setStartDate] = useState<string | null>(
    dayjs().format('YYYY-MM-DD')
  )
  const [endDate, setEndDate] = useState<string | null>(
    dayjs().add(1, 'year').format('YYYY-MM-DD')
  )
  const [childMenuOpen, setChildMenuOpen] = useState<boolean>(false)

  const onClickParentRegion = (regionName: string) => {
    setSelectParentRegion(regionName)
    setSelectChildRegions([])
    axios
      .get(`/api/region/childregions?regionName=${regionName}`)
      .then((res: any) => {
        const resData = res.data.map((v: any) => v['region'])
        setChildRegions(resData)
      })
      .catch((error: any) => {
        console.error('자식 지역을 가져오는 중 오류 발생:', error)
      })
  }

  const onClickShigungu = () => {
    setChildMenuOpen(!childMenuOpen)
  }

  const onClickChildRegion = (parentRegion: string, regionName: string) => {
    const resultRegion = `${parentRegion} ${regionName}`
    if (selectChildRegions.includes(resultRegion)) {
      setSelectChildRegions(
        selectChildRegions.filter((v) => v !== resultRegion)
      )
    } else {
      setSelectChildRegions([...selectChildRegions, resultRegion])
    }
  }

  const onClickButton = async () => {
    console.log(startDate, endDate)
    try {
      const response = await axios.get(`/api/festival/getbyrange`, {
        params: {
          pageNum: pageNum,
          pageSize: 20,
          regions: selectChildRegions,
          endDate: endDate,
          startDate: startDate,
        },
      })
      return props.getFestivals(response.data)
    } catch (error) {
      console.error('축제 가져오기 오류:', error)
      throw new Error('축제를 가져오는 중 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/region/rootregions`)
        const resData = response.data.map((v: any) => v['region'])
        setRegions(resData)
      } catch (error) {
        console.error('루트 지역을 가져오는 중 오류 발생:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <Container style={{ margin: 'auto', marginBottom: '50px' }}>
      <Row style={{ marginBottom: '10px' }}>
        <Col xs={3}>시/도 선택</Col>
        <Col xs={3}>시/군/구 선택</Col>
        <Col xs={4}>시기</Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Dropdown>
            <Dropdown.Toggle
              variant='success'
              id='dropdown-basic'
              className='dropdown-toggle'
              style={{ minWidth: '168px', minHeight: '56px' }}
            >
              {selectParentRegion === '' ? '시/도 선택' : selectParentRegion}
            </Dropdown.Toggle>
            <Dropdown.Menu
              className='dropdown-menu'
              style={{
                overflowY: 'auto',
                minWidth: '155px',
                maxHeight: '200px',
              }}
            >
              {regions.map((regionName) => (
                <Dropdown.Item
                  style={{ width: '150px' }}
                  className={
                    selectParentRegion === regionName
                      ? 'parent-list-group-item active'
                      : 'parent-list-group-item'
                  }
                  key={regionName}
                  onClick={() => onClickParentRegion(regionName)}
                >
                  {regionName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={3}>
          <Dropdown show={childMenuOpen}>
            <Dropdown.Toggle
              onClick={onClickShigungu}
              variant='success'
              className='dropdown-toggle'
              style={{
                minWidth: '168px',
                minHeight: '56px',
              }}
            >
              {selectChildRegions.length === 0
                ? '시/군/구 선택'
                : selectChildRegions.length === 1
                ? selectChildRegions[0].split(' ')[1]
                : `${selectChildRegions[0].split(' ')[1]} 등 ${
                    selectChildRegions.length
                  }개`}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{
                overflowY: 'auto',
                minWidth: '168px',
                maxWidth: '168px',
                maxHeight: '200px',
              }}
            >
              {childRegions.map((regionName) => (
                <Dropdown.Item
                  className={
                    selectChildRegions.includes(
                      `${selectParentRegion} ${regionName}`
                    )
                      ? 'child-list-group-item active'
                      : 'child-list-group-item'
                  }
                  key={regionName}
                  onClick={() =>
                    onClickChildRegion(selectParentRegion, regionName)
                  }
                >
                  {regionName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={4}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(v) => setStartDate(v!.format('YYYY-MM-DD'))}
                format='YYYY-MM-DD'
                label='시작일'
                defaultValue={dayjs()}
                sx={{ height: '3px', maxWidth: '200px' }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='종료일'
                onChange={(v) => setEndDate(v!.format('YYYY-MM-DD'))}
                format='YYYY-MM-DD'
                defaultValue={dayjs().add(1, 'year')}
                sx={{ height: '3px', maxWidth: '200px' }}
              />
            </LocalizationProvider>
          </div>
        </Col>
        <Col xs={2}>
          <Button
            onClick={onClickButton}
            style={{ minHeight: '56px', width: '120px' }}
          >
            검색
          </Button>
        </Col>
      </Row>
      <h1>{selectChildRegions}</h1>
    </Container>
  )
}

export default RegionList
