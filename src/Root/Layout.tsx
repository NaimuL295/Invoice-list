
import { Outlet, useLocation } from 'react-router'
import Navbar from '../Components/Share/Navbar'


export default function Layout() {
  

    const {pathname}=useLocation() 
  return (
    <div>
      
     {!["/setting" ,"/auth/login" ,  "/auth/register"  ].includes(pathname)   && <Navbar/>      }    
      <Outlet/>
    </div>
  )
}
