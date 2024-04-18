import { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import '../css/Navbar.css'
import LoginModal from './auth/LoginModal'

const MainNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    setDropdownOpen(false)
  }

  const handleModalOpen = () => {
    setModalOpen(true)
    return modalOpen
  }

  const handleModalClose = () => {
    setModalOpen(false)
    return modalOpen
  }

  return (
    <div>
      <Navbar className='main_navbar'>
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
            {/* <Nav.Link href='/review'>후기</Nav.Link> */}
            <Nav.Link onClick={handleModalOpen}>로그인</Nav.Link>
            <LoginModal
              modalOpen={modalOpen}
              handleModalClose={handleModalClose}
            />
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default MainNavbar
