import { useState } from 'react'
import { Button, Modal } from '@mui/material'
import { FaTimes } from 'react-icons/fa'
import '../../css/LoginModal.css'
import { Form } from 'react-bootstrap'
import axios from 'axios'

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/signin', {
        username: inputId,
        password: inputPassword,
      })

      // 로그인 성공 시 받은 토큰을 저장

      console.log(response)
    } catch (error) {
      alert(error)
    }
    console.log('ID:', inputId)
    console.log('Password:', inputPassword)
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
        <Form onSubmit={handleLogin}>
          <Form.Group className='input-id' controlId='id'>
            <Form.Control
              type='text'
              placeholder='아이디'
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='input-password' controlId='password'>
            <Form.Control
              type='password'
              placeholder='비밀번호'
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </Form.Group>

          <p className='find-user'>아이디/비밀번호 찾기</p>
          <Button className='login-button' type='submit'>
            로그인
          </Button>
          <Button className='kakao-login-button' onClick={closeModal}>
            카카오로 로그인
          </Button>
          <p className='sign-in'>
            <span style={{ color: '#949494' }}>회원이 아니신가요? </span>
            <a className='sign-in-button'>회원가입</a>
          </p>
        </Form>
      </div>
    </Modal>
  )
}

export default LoginModal
