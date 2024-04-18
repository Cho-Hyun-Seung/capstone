import { useState } from 'react'
import { Modal } from '@mui/material'
import { FaTimes } from 'react-icons/fa'
import '../../css/LoginModal.css'

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
        <h2>로그인</h2>
        <form>
          <div>
            <label htmlFor='username'>아이디:</label>
            <input
              id='username'
              type='text'
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>비밀번호:</label>
            <input
              id='password'
              type='password'
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </div>
          <button type='button' onClick={handleLogin}>
            로그인
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default LoginModal
