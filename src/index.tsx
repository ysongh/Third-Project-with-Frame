import { serve } from '@hono/node-server'
import { Button, TextInput, Frog } from 'frog'
import { config } from 'dotenv'

import { app as transactionApp } from './routes/transaction'
import { app as nameApp } from './routes/names'
import { app as dataApp } from './routes/data'

config()

export const app = new Frog()
 
app.frame('/', (c) => {
  const { inputText, buttonValue, status } = c
  const fruit = inputText || buttonValue

  console.log(process.env.ADDRESS)

  return c.res({
    image: (
      <div style={{ color: 'black', display: 'flex', fontSize: 60 }}>
       {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome!'}
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ]
  })
})

app.route('/transaction', transactionApp)
app.route('/names', nameApp)
app.route('/data', dataApp)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})