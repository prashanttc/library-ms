import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './context/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})



createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>

      <Router>
        <AuthProvider>
        <AppRoutes />
        <Toaster visibleToasts={1} position='top-right' richColors />cd
      </AuthProvider> 
      </Router>
    </QueryClientProvider>

  </StrictMode>,
)
