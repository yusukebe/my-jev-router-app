import { createMiddleware } from 'hono/factory'

export const jevMiddleware = (question: string, threshold = 0.8) =>
  createMiddleware(async (c, next) => {
    const state = await c.req.text()
    const res = await c.env.AI.run('typesafe/jev', {
      state,
      questions: { flag: { type: 'noul', instructions: question } }
    })
    const p = (res.result ?? res).answers.flag.noul
    if (p > threshold) {
      return c.json({ blocked: true, probability: p }, 400)
    }
    await next()
  })
