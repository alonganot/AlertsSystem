import { EventSender } from './Components/EventSender'
import Navbar from './Components/Navbar'
import { NotificationsProvider } from './context/NotificationsContext'
import { WebSocketListener } from './WebSocketListener'

function App() {
  return (
    <NotificationsProvider>
      <WebSocketListener />
      <Navbar />
      <div style={{ paddingTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', userSelect: 'none' }}>
        <EventSender />
        <img src='smart.png' width={600} style={{ marginTop: '50px' }}/>
      </div>
    </NotificationsProvider>
  )
}

export default App
