import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import FloatingChatbot from './components/FloatingChatbot'

function App() {
  return (
    <Router>
      <AppRoutes />
      <FloatingChatbot />
    </Router>
  )
}

export default App
