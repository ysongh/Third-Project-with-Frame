import { serve } from '@hono/node-server'
import { Button, TextInput, Frog } from 'frog'
import { config } from 'dotenv'

import { app as transactionApp } from './routes/transaction'

config()

type State = {
  names: string[]
}

export const app = new Frog<{State: State}>({
  initialState: {
    names: []
  }
})
 
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

app.frame('/names', (c) => {
  const { inputText, deriveState } = c

  const state = deriveState(previousState => {
    previousState.names.push(inputText || "")
  })

  return c.res({
    image: (
      <div style={{ color: 'black', display: 'flex', flexDirection: 'column', fontSize: 20 }}>
        <h1>List of Names</h1>
        {state.names.map(n => (
          <p key={n}>{n}</p>
        ))}
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter your name..." />,
      <Button>Add</Button>,
      <Button.Reset>Reset</Button.Reset>,
    ]
  })
})

app.route('/transaction', transactionApp)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})