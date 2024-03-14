import { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import '../../css/RegionList.css'

const RegionList = () => {
  const [regions, setRegions] = useState<string[]>([])
  const [selectParentRegion, setSelectParentRegion] = useState<string>('')
  const [childRegions, setChildRegions] = useState<string[]>([])
  const [selectChildRegions, setSelectChildRegions] = useState<string[]>([])

  const onClickParentRegion = (regionName: string) => {
    setSelectParentRegion(regionName)
    // 자식 노드들을 초기화함
    setSelectChildRegions([])
    axios
      .get(`/api/region/childregions?regionName=${regionName}`)
      .then((res: any) => {
        const resData = res.data.map((v: any) => v['region'])
        setChildRegions(resData)
      })
      .catch((error: any) => {
        console.error('Error fetching child regions:', error)
      })
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

  useEffect(() => {
    axios
      .get(`/api/region/rootregions`)
      .then((res: any) => {
        const resData = res.data.map((v: any) => v['region'])
        setRegions(resData)
      })
      .catch((error: any) => {
        console.error('Error fetching root regions:', error)
      })
  }, [])

  return (
    <Container>
      <Row>
        <Col xs={3}>시/도 선택</Col>
        <Col xs={3}>시/군/구 선택</Col>
      </Row>
      <Row>
        <Col xs={3}>
          <ListGroup style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {regions.map((regionName) => (
              <ListGroup.Item
                className={
                  selectParentRegion === regionName
                    ? 'list-group-item active'
                    : 'list-group-item'
                }
                key={regionName}
                onClick={() => onClickParentRegion(regionName)}
              >
                {regionName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={3}>
          <ListGroup style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {childRegions.map((regionName) => (
              <ListGroup.Item
                className={
                  selectChildRegions.includes(regionName)
                    ? 'list-group-item active'
                    : 'list-group-item'
                }
                key={regionName}
                onClick={() =>
                  onClickChildRegion(selectParentRegion, regionName)
                }
              >
                {regionName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <h1>{selectChildRegions}</h1>
    </Container>
  )
}

export default RegionList
