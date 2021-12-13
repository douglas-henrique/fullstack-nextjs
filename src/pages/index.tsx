import type { GetServerSideProps, NextPage } from 'next'
import styles from '@/styles/Home.module.scss'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import CustomHead from '@/components/CustomHead'
import CustomFooter from '@/components/CustomFooter'
import CustomRow from '@/components/CustomRow'
import { User } from '@prisma/client'

interface HomeProps {
  formatedUsers: User[]
}

const Home: NextPage<HomeProps> = ({ formatedUsers }) => {
  return (
    <div className={styles.container}>
      <CustomHead
        title="NextJS + Prisma = ♥️"
        description="A full stack application maded with Next JS + Prisma and PlanetScale"
      />
      <main className={styles.main}>
        <h1>Users CRUD</h1>
        <p>Manage users using NextJS, prisma and MySQL :) </p>
        <div className={styles.listContainer}>
          <ul>
            {formatedUsers.map((user) => (
              <li></li>
            ))}
          </ul>
          <button>auhuah</button>
        </div>
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
