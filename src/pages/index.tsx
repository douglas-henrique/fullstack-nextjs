import type { GetServerSideProps, NextPage } from 'next'
import { useState, useCallback } from 'react'
import styles from '@/styles/Home.module.scss'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import CustomHead from '@/components/CustomHead'
import CustomFooter from '@/components/CustomFooter'
import CustomRow from '@/components/CustomRow'
import CustomModal from '@/components/CustomModal'
import { User } from '@prisma/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { createUser, deleteUser, getUsers } from '@/lib/api'
import { Inputs } from '@/lib/types'

interface HomeProps {
  formatedUsers: User[]
}

const Home: NextPage<HomeProps> = ({ formatedUsers }) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState(formatedUsers)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const listUsers = useCallback(async () => {
    const result = await getUsers()
    if (typeof result != 'string') {
      setUsers(result)
      console.log(result)
      return
    }

    closeModal()
    toast(result, { position: 'top-right', autoClose: 2000 })
  }, [setUsers, getUsers])

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      const result = await createUser(data)
      if (typeof result != 'string') {
        closeModal()
        toast(result.message, { position: 'top-right', autoClose: 2000 })
        await listUsers()
        return
      }

      await listUsers()
      closeModal()
      toast(result, { position: 'top-right', autoClose: 2000 })
    },
    [listUsers, createUser],
  )

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const removeUser = useCallback(
    async (user) => {
      const result = await deleteUser(user.id)
      if (typeof result != 'string') {
        closeModal()
        toast(result.message, { position: 'top-right', autoClose: 2000 })
        await listUsers()
        return
      }

      closeModal()
      toast(result, { position: 'top-right', autoClose: 2000 })
    },
    [listUsers, deleteUser],
  )

  return (
    <div className={styles.container}>
      <ToastContainer />
      <CustomHead
        title="NextJS + Prisma = ♥️"
        description="A full stack application maded with Next JS + Prisma and PlanetScale"
      />
      <main className={styles.main}>
        <div className={styles.headerContainer}>
          <div>
            <h1>Users CRUD</h1>
            <p>Manage users using NextJS, prisma and MySQL :) </p>
          </div>
          <button onClick={openModal}>New User</button>
        </div>

        {users.length > 0 ? (
          <div className={styles.listContainer}>
            <ul>
              {users.map((user) => (
                <CustomRow key={user.id} user={user} deleteUser={removeUser} />
              ))}
            </ul>
          </div>
        ) : (
          <h2>You don't have any users on your database :(</h2>
        )}
        <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal} closeTimeoutMS={500} contentLabel="Content label?">
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <label htmlFor="name"></label>
            <input placeholder="Your name" {...register('name', { required: true })} id="name" name="name" />
            {errors.name && <span>This field is required</span>}

            <input placeholder="Your username" {...register('userName', { required: true })} id="userName" name="userName" />
            {errors.userName && <span>This field is required</span>}

            <input placeholder="Your avatar URL" {...register('avatar', { required: true })} id="avatar" name="avatar" />
            {errors.avatar && <span>This field is required</span>}

            <button type="submit"> Submit </button>
          </form>
        </CustomModal>
      </main>
      <CustomFooter />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const users = await prisma.user.findMany()

  const formatedUsers = users.map((user) => {
    return {
      ...user,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    }
  })

  return {
    props: { formatedUsers },
  }
}

export default Home
