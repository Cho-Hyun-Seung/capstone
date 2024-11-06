import { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import '../css/Navbar.css'
import LoginModal from './auth/LoginModal'
import logo from '../img/logo.png'
const MainNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    setDropdownOpen(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <Navbar className='main_navbar'>
        <Container>
          <Navbar.Brand href='/'>
            <img
              className='logo_image'
              alt='main_logo'
              src={logo}
              style={{ width: '180px', height: 'auto' }} // 원하는 크기로 설정
            />
          </Navbar.Brand>
          <Nav className='ms-auto'>
            {/* <NavDropdown
              title='여행정보'
              show={dropdownOpen}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              id='basic-nav-dropdown'
            > */}
            {/* <NavDropdown.Item href='/travelbydate'>
                여행 달력
              </NavDropdown.Item>
              <NavDropdown.Item href='/festival'>축제</NavDropdown.Item>
              <NavDropdown.Item href='/show'>공연 / 행사</NavDropdown.Item>
              <NavDropdown.Item href='/touristspot'>관광지</NavDropdown.Item> */}
            {/* </NavDropdown> */}
            {/* <Nav.Link onClick={handleOpenModal}>로그인</Nav.Link> */}
            <Nav.Link href='/festival'>축제</Nav.Link>
            <Nav.Link href='/touristspot'>관광지</Nav.Link>
            <LoginModal
              openModal={openModal}
              handleCloseModal={handleCloseModal}
            />
            <Nav.Link href='/planner'>플래너</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default MainNavbar
