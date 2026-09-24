import { Hono } from 'hono'
import { jevMiddleware } from './middleware'

const app = new Hono()

app.post('/comments', jevMiddleware('これはスパムですか？'), (c) => {
  return c.json({ posted: true })
})

export default app
