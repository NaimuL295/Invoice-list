import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.tsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Provider from './Router/Provider/Provider.tsx'


const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
<Provider>
    <RouterProvider router={router}></RouterProvider>
     </Provider>
 </QueryClientProvider>

  </StrictMode>,
)
