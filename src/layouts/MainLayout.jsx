import { Outlet } from "react-router-dom";
import SidebarComponent from "@/components/Sidebar";
import NavbarComponent from "@/components/Navbar";

function MainLayout() {

  return (
    <div className="main-layout w-full">
      <div className="navbar bg-blue-900 h-15">
        <NavbarComponent />
      </div>
      <div className="flex">
        <div className='sidebar bg-blue-800 flex-none h-167'>
          <SidebarComponent/>
        </div>
        <div className='content flex-none w-312 h-167  bg-blue-100'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
