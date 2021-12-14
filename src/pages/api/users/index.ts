// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
      } catch (e) {
        res.status(500).json({ error: e })
      }
      break
    case 'POST':
      try {
        await prisma.user.create({ data: req.body })
        res.status(200).json({ message: 'User created successfully! 🚀' })
      } catch (e) {
        console.log(e)
        res.status(500).json({ error: e })
      }
      break
    default:
      res.status(204)
  }
}
