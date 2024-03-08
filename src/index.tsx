import { serve } from '@hono/node-server'
import { Button, Frog } from 'frog'
 
export const app = new Frog()
 
app.frame('/', (c) => {
  const { buttonValue, status } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        {status === 'initial' ? (
          'Select your fruit!'
        ) : (
          `Selected: ${buttonValue}`
        )}
      </div>
    ),
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>
    ]
  })
})
 
const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})