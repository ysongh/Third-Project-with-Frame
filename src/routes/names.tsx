import { Button, TextInput, Frog } from 'frog'

type State = {
  names: string[]
}

export const app = new Frog<{State: State}>({
  initialState: {
    names: []
  }
})

app.frame('/', (c) => {
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