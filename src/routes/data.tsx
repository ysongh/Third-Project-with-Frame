import { Button, Frog } from 'frog'

export const app = new Frog({
  verify: 'silent'
})

app.frame('/', (c) => {
  const { frameData, verified } = c

  console.log(frameData)
  console.log(frameData?.fid)

  if (!verified) {
    return c.res({
      image: (
        <div style={{ color: 'black', display: 'flex', flexDirection: 'column', fontSize: 20 }}>
          <p>Frame verification failed</p>
        </div>
      ),
      intents: [
        <Button>Get</Button>,
      ]
    })
  }

  if (frameData) {
    const { fid, castId } = frameData
    return c.res({
      image: (
        <div style={{ color: 'black', display: 'flex', flexDirection: 'column', fontSize: 20 }}>
          <p>{fid}</p>
          <p>{castId}</p>
        </div>
      ),
      intents: [
        <Button>Get</Button>,
      ]
    })
  }
  else {
    return c.res({
      image: (
        <div style={{ color: 'black', display: 'flex', flexDirection: 'column', fontSize: 20 }}>
          <p>Get fid and castId</p>
        </div>
      ),
      intents: [
        <Button>Get</Button>,
      ]
    })
  }
 
})