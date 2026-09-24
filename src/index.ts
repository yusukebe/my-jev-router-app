import { Hono } from 'hono'
import { JevRouter } from 'hono-jev-router'

const app = new Hono<{ Bindings: CloudflareBindings }>({
  router: new JevRouter({
    run: async (c, request) => {
      const { result } = await c.env.AI.run('typesafe/jev', request)
      return result
    }
  })
})

app.on('jev', 'AIエージェントからのリクエストだよ', (c) => {
  return c.text('# Documentation', 200, { 'Content-Type': 'text/markdown' })
})

app.on('jev', '人間からのリクエストだよ', (c) => {
  return c.html('<h1>Documentation</h1>')
})

app.on('jev', '自動化されたアクセスだよ', (c) => {
  return c.text('Forbidden', 403)
})

app.on('jev', '請求や支払いについての質問だよ', (c) => {
  return c.json({ queue: 'billing' })
})

app.on('jev', '解約したい人だよ', (c) => {
  return c.json({ queue: 'retention' })
})

app.on('jev', '怒ってるお客さんだよ', (c) => {
  return c.json({ queue: 'priority', reply: '大変申し訳ございません。' })
})

app.on('jev', 'それ以外のメッセージだよ', (c) => c.json({ queue: 'general' }))

export default app
