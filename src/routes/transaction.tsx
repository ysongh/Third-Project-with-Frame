import { Button, TextInput, parseEther, Frog } from 'frog'

import { abi } from '../abi'
 
export const app = new Frog()

app.frame('/transaction', (c) => {
  return c.res({
    action: '/finish',
    image: (
      <div style={{ color: 'black', display: 'flex', fontSize: 60 }}>
        Perform a transaction
      </div>
    ),
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ]
  })
})

app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'black', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})
 
app.transaction('/send-ether', (c) => {
  const { inputText } = c
  // Send transaction response.
  return c.send({
    chainId: 'eip155:84532',
    to: '0xaD609fDFEa6D40c9F3EDc24748a6E048Af36a349',
    value: parseEther(inputText!!),
  })
})

app.transaction('/mint', (c) => {
  const { inputText } = c
  // Contract transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:84532',
    functionName: 'mint',
    args: [69420n],
    to: '0xaD609fDFEa6D40c9F3EDc24748a6E048Af36a349',
    value: parseEther(inputText!!)
  })
})