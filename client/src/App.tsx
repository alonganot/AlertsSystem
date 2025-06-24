import { EventSender } from './Components/EventSender'
import Navbar from './Components/Navbar'
import { SocketProvider } from './context/SocketContext'

function App() {
  return (
    <SocketProvider>
      <Navbar />
      <div style={{ paddingTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', userSelect: 'none' }}>
        <EventSender />
        <img src='smart.png' width={600} style={{ marginTop: '50px' }}/>
      </div>
    </SocketProvider>
  )
}

export default App
