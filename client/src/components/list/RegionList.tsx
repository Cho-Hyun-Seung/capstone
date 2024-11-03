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
import { IRegion } from 'src/utils/interface'

const RegionList = (props: any) => {
  const [regions, setRegions] = useState<IRegion[]>([])
  const [selectParentRegion, setSelectParentRegion] = useState<IRegion>()
  const [childRegions, setChildRegions] = useState<IRegion[]>([])
  const [selectChildRegions, setSelectChildRegions] = useState<IRegion>()
  const [childMenuOpen, setChildMenuOpen] = useState<boolean>(false)
  const location: Location = useLocation()
  const [isCategoryListOpen, setCategoryListOpen] = useState(false)
  const [selectRegion, setSelectRegion] = useState<IRegion>()

  const onClickCategoryButton = () => {
    setCategoryListOpen(!isCategoryListOpen)
  }
  const onClickParentRegion = (region: IRegion) => {
    console.log(region)
    setSelectParentRegion(region)
    setSelectRegion(region)
    setSelectChildRegions(undefined)
    axios
      .get(`/api/region/childs`, {
        params: { parent_code: region.sigungu_code },
      })
      .then((res: any) => {
        const resData = res.data.map((v: any) => v)
        setChildRegions(resData)
      })
      .catch((error: any) => {
        console.error('자식 지역을 가져오는 중 오류 발생:', error)
      })
  }

  const onClickShigungu = () => {
    setChildMenuOpen(!childMenuOpen)
  }
  const onClickChildRegion = (region: IRegion) => {
    if (selectChildRegions === region) {
      setSelectRegion(undefined)
      setSelectChildRegions(undefined)
    } else {
      setSelectRegion(region)
      setSelectChildRegions(region)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/region/roots`)
        const resData = response.data
        setRegions(resData)
      } catch (error) {
        console.error('루트 지역을 가져오는 중 오류 발생:', error)
      }
    }
    fetchData()
    console.log('location', location)
  }, [])

  useEffect(() => {
    props.getRegion(selectRegion)
    console.log(selectRegion)
  }, [selectRegion])

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
              {selectParentRegion === undefined
                ? '시/도 선택 '
                : selectParentRegion.region + ' '}{' '}
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
              {regions &&
                regions.map((region) => (
                  <Dropdown.Item
                    style={{ width: '150px' }}
                    className={
                      selectParentRegion === region
                        ? 'parent-list-group-item active'
                        : 'parent-list-group-item'
                    }
                    key={region.region}
                    onClick={() => onClickParentRegion(region)}
                  >
                    {region.region}
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
              {selectChildRegions === undefined
                ? '시/군/구 선택 '
                : selectChildRegions.region + ' '}{' '}
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
              {childRegions.map((region) => (
                <Dropdown.Item
                  className={
                    selectChildRegions == region
                      ? 'child-list-group-item active'
                      : 'child-list-group-item'
                  }
                  key={region.id}
                  onClick={() => onClickChildRegion(region)}
                >
                  {region.region}
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
