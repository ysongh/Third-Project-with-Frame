import { serve } from '@hono/node-server'
import { Button, TextInput, Frog } from 'frog'
 
export const app = new Frog()
 
app.frame('/', (c) => {
  const { inputText, buttonValue, status } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        {status === 'initial' ? (
          'Select your fruit!'
        ) : (
          `Selected: ${inputText || buttonValue}`
        )}
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter your fruit..." />,
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>,
      <Button.Link href="https://google.com">Google</Button.Link>,
    ]
  })
})
 
const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})