import { useState } from 'react'
import { Button, Modal } from '@mui/material'
import { FaTimes } from 'react-icons/fa'
import '../../css/LoginModal.css'
import { Form } from 'react-bootstrap'

const LoginModal = ({
  openModal,
  handleCloseModal,
}: {
  openModal: boolean
  handleCloseModal: () => void
}) => {
  const [inputId, setInputId] = useState<string>('')
  const [inputPassword, setInputPassword] = useState<string>('')

  const closeModal = () => {
    handleCloseModal()
  }

  const handleLogin = () => {
    // 로그인 처리 로직을 구현하세요
    // 예를 들어, 입력된 아이디와 비밀번호를 서버로 전송하여 인증을 수행할 수 있습니다.
    console.log('ID:', inputId)
    console.log('Password:', inputPassword)
    // 여기에 실제로 서버로 요청을 보내는 코드를 작성하세요
  }

  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className='modalContainer'>
        <div className='closeIcon' onClick={closeModal}>
          <FaTimes />
        </div>
        <p className='login-text'>로그인</p>
        <Form>
          <Form.Group className='input-id' controlId='id'>
            <Form.Control type='id' placeholder='아이디' />
          </Form.Group>

          <Form.Group className='input-password' controlId='password'>
            <Form.Control type='password' placeholder='비밀번호' />
          </Form.Group>
          <p className='find-user'>아이디/비밀번호 찾기</p>
          <Button className='login-button' type='submit'>
            로그인
          </Button>
          <Button className='kakao-login-button' type='submit'>
            카카오로 로그인
          </Button>
          <p className='sign-in'>
            <span style={{ color: '#949494' }}>회원이 아니신가요? </span>
            <span className='sign-in-button'>회원가입</span>
          </p>
        </Form>
      </div>
    </Modal>
  )
}

export default LoginModal
