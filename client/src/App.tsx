import { EventSender } from './Components/EventSender'
import Navbar from './Components/Navbar'
import { NotificationsProvider } from './context/NotificationsContext'
import { WebSocketListener } from './WebSocketListener'

function App() {
  return (
    <NotificationsProvider>
      <WebSocketListener />
      <Navbar />
      <div style={{ paddingTop: '3.5rem' }}>
        <EventSender />
      </div>
    </NotificationsProvider>
  )
}

export default App
