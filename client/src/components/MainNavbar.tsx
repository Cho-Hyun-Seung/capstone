import { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const MainNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleMouseEnter = () => {
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    setDropdownOpen(false)
  }

  return (
    <>
      <Navbar bg='light' data-bs-theme='light'>
        <Container>
          <Navbar.Brand href='/'>Navbar</Navbar.Brand>
          <Nav className='ms-auto'>
            <NavDropdown
              title='여행정보'
              show={dropdownOpen}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown.Item href='/travelbydate'>
                여행 달력
              </NavDropdown.Item>
              <NavDropdown.Item href='/festival'>축제</NavDropdown.Item>
              <NavDropdown.Item href='/show'>공연 /행사</NavDropdown.Item>
              <NavDropdown.Item href='/touristspot'>관광지</NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href='#action/4'>
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href='/planner'>여행 플래너</Nav.Link>
            <Nav.Link href='/review'>후기</Nav.Link>
            <Nav.Link href='/login'>로그인</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default MainNavbar
