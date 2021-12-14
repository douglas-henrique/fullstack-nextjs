import Modal from 'react-modal'
import styles from './CustomModal.module.scss'
import { RiCloseCircleLine } from 'react-icons/ri'

Modal.setAppElement('#modal-element')

interface CustomModalProps {
  modalIsOpen: boolean
  closeModal: () => void
  contentLabel: string
  children: React.ReactNode
  closeTimeoutMS: number
}

const CustomModal = ({ modalIsOpen, closeModal, closeTimeoutMS, contentLabel, children }: CustomModalProps) => {
  let subtitle
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.Modal}
      overlayClassName={styles.Overlay}
      contentLabel={contentLabel}
      closeTimeoutMS={closeTimeoutMS}
    >
      <div className={styles.header}>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} className={styles.title}>
          New user
        </h2>
        <button onClick={closeModal}><RiCloseCircleLine size={30} color='white' /></button>
      </div>
      
      {children}
    </Modal>
  )
}

export default CustomModal
