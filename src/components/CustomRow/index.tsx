import { useState } from 'react'
import styles from './CustomRow.module.scss'
import { User } from '@prisma/client'
import Image from 'next/image'
import { BiTrash } from 'react-icons/bi'
import ReactLoading from 'react-loading'

interface CustomRowProps {
  user: User
  deleteUser: (user: User) => void
}

const CustomRow = ({ user, deleteUser }: CustomRowProps) => {
  const [isLoading, setLoading] = useState(false)

  const handleDelete = () => {
    setLoading(true)
    deleteUser(user)
  }

  return (
    <div className={styles.container}>
      {!!user.avatar && <Image src={user.avatar} height={100} width={100} />}
      <div>
        <label>{user.name}</label>
        <label>{user.userName}</label>
      </div>
      {isLoading ? (
        <ReactLoading type="spin" color="white" height={20} width={20} className={styles.spinner} />
      ) : (
        <BiTrash size={20} onClick={handleDelete} />
      )}
    </div>
  )
}

export default CustomRow
