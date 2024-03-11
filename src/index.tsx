import { serve } from '@hono/node-server'
import { Button, TextInput, Frog } from 'frog'

import { abi } from './abi'

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

app.frame('/transaction', (c) => {
  return c.res({
    action: '/finish',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Perform a transaction
      </div>
    ),
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
    ]
  })
})

app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})
 
app.transaction('/send-ether', (c) => {
  const { inputText } = c
  // Send transaction response.
  return c.send({
    chainId: 'eip155:10',
    to: '0xaD609fDFEa6D40c9F3EDc24748a6E048Af36a349',
    value: BigInt(inputText || 0),
  })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})