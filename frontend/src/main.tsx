import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
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
        <AppRoutes />
    </Router>
    </QueryClientProvider>
  </StrictMode>,
)
