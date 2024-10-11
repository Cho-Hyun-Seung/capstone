import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Col,
  Collapse,
  Container,
  Dropdown,
  Row,
} from 'react-bootstrap'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { Location, useLocation } from 'react-router-dom'
import CategoryList from './CategoryList'
import { FaAngleDown } from 'react-icons/fa'
import '../../css/RegionList.css'

const RegionList = (props: any) => {
  const [regions, setRegions] = useState<string[]>([])
  const [selectParentRegion, setSelectParentRegion] = useState<string>('')
  const [childRegions, setChildRegions] = useState<string[]>([])
  const [selectChildRegions, setSelectChildRegions] = useState<string[]>([])
  const [childMenuOpen, setChildMenuOpen] = useState<boolean>(false)
  const [selectAllChildRegions, setSelectAllChildRegions] =
    useState<boolean>(false)
  const location: Location = useLocation()
  const [isCategoryListOpen, setCategoryListOpen] = useState(false)

  const onClickCategoryButton = () => {
    setCategoryListOpen(!isCategoryListOpen)
  }
  const onClickParentRegion = (regionName: string) => {
    setSelectParentRegion(regionName)
    setSelectChildRegions([])
    setSelectAllChildRegions(false)
    axios
      .get(`/api/region/childs`, { params: { parent_region: regionName } })
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
    console.log(regionName)
    const resultRegion = `${parentRegion} ${regionName}`
    if (selectChildRegions.includes(resultRegion)) {
      setSelectChildRegions((prevRegions) =>
        prevRegions.filter((v) => v !== resultRegion)
      )
    } else {
      setSelectChildRegions((prevRegions) => [...prevRegions, resultRegion])
    }
  }

  const onSelectAllChildRegions = () => {
    if (selectAllChildRegions) {
      setSelectChildRegions([])
    } else {
      const allChildRegions = childRegions.map(
        (regionName) => `${selectParentRegion} ${regionName}`
      )
      setSelectChildRegions(allChildRegions)
    }
    setSelectAllChildRegions(!selectAllChildRegions)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/region/roots`)
        const resData = response.data.map((v: any) => v['region'])
        setRegions(resData)
      } catch (error) {
        console.error('루트 지역을 가져오는 중 오류 발생:', error)
      }
    }
    fetchData()
    console.log('location', location)
  }, [])

  useEffect(() => {
    props.getChildRegions(selectChildRegions)
  }, [selectChildRegions])

  return (
    <Container style={{ margin: 'auto', marginBottom: '50px' }}>
      <Row style={{ marginBottom: '10px' }}>
        <Col xs={3}>시/도 선택</Col>
        <Col xs={3}>시/군/구 선택</Col>
        {location.pathname.includes('festival') && <Col xs={4}>시기</Col>}
        {location.pathname.includes('touristspot') && (
          <Col xs={4}>카테고리</Col>
        )}
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
              {selectParentRegion === ''
                ? '시/도 선택 '
                : selectParentRegion + ' '}{' '}
              <FaAngleDown />
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
                ? '시/군/구 선택 '
                : selectChildRegions.length === childRegions.length
                ? '전체선택 '
                : selectChildRegions.length === 1
                ? selectChildRegions[0].split(' ')[1] + ' '
                : `${selectChildRegions[0].split(' ')[1]} 등 ${
                    selectChildRegions.length
                  }개 `}
              <FaAngleDown />
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{
                overflowY: 'auto',
                minWidth: '168px',
                maxWidth: '168px',
                maxHeight: '200px',
              }}
            >
              <Dropdown.Item
                className='child-list-group-item'
                onClick={onSelectAllChildRegions}
              >
                {selectAllChildRegions ? '전체선택 해제' : '전체선택'}
              </Dropdown.Item>
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
        {location.pathname.includes('festival') && (
          <Col xs={4}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(v) => props.getStartDate(v!.format('YYYY-MM-DD'))}
                  format='YYYY-MM-DD'
                  label='시작일'
                  defaultValue={dayjs()}
                  sx={{ height: '3px', maxWidth: '200px' }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='종료일'
                  onChange={(v) => props.getEndDate(v!.format('YYYY-MM-DD'))}
                  format='YYYY-MM-DD'
                  defaultValue={dayjs().add(1, 'year')}
                  sx={{ height: '3px', maxWidth: '200px' }}
                />
              </LocalizationProvider>
            </div>
          </Col>
        )}
        {location.pathname.includes('touristspot') && (
          <Col xs={4}>
            <Button
              onClick={onClickCategoryButton}
              style={{
                minWidth: '168px',
                minHeight: '56px',
                backgroundColor: '#198754',
                borderColor: '#198754',
              }}
            >
              카테고리 선택 <FaAngleDown />
            </Button>
          </Col>
        )}
        <Col xs={2}>
          <Button
            onClick={props.onClickButton}
            style={{ minHeight: '56px', width: '120px' }}
          >
            검색
          </Button>
        </Col>
      </Row>
      {location.pathname.includes('touristspot') && (
        <Collapse in={isCategoryListOpen}>
          <div>
            <CategoryList getCategoryArray={props.getCategoryArray} />
          </div>
        </Collapse>
      )}
      {/* <h1>{selectChildRegions}</h1> */}
    </Container>
  )
}

export default RegionList
