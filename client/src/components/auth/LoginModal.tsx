import { Modal } from '@mui/material'
import { useState } from 'react'

const LoginModal = ({
  modalOpen,
  handleModalClose,
}: {
  modalOpen: boolean
  handleModalClose: () => void
}) => {
  const [inputId, setInputId] = useState<string>('')

  const closeModal = () => {
    handleModalClose()
  }

  return (
    <Modal
      open={modalOpen}
      onClose={closeModal}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
    >
      <div>
        <input
          type='text'
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button onClick={closeModal}>로그인</button>
      </div>
    </Modal>
  )
}

export default LoginModal
