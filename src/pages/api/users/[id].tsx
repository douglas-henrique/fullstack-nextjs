// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      })
      res.status(200).json({ message: 'User deleted successfully! 🚀' })
    } catch (e) {
      res.status(500).json({ error: e })
    }
  }
}
