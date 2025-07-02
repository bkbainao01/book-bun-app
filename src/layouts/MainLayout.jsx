import { Outlet } from "react-router-dom";
import SidebarComponent from "@/components/Sidebar";
import NavbarComponent from "@/components/Navbar";

function MainLayout() {

  return (
    <div className="main-layout w-full">
      <div className="navbar">
        <NavbarComponent />
      </div>
      <div className="main-section">
        <div className='sidebar-section'>
          <SidebarComponent/>
        </div>
        <div className='content-section'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
