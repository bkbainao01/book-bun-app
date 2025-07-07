import { Outlet } from "react-router-dom";
import SidebarComponent from "@/components/Sidebar";
import NavbarComponent from "@/components/Navbar";

function MainLayout() {

  return (
    <div className="main-layout">
      <div className='sidebar-section'>
        <SidebarComponent/>
      </div>
      <div className="main-section">
        <div className="navbar-section">
          <NavbarComponent />
        </div>
        <div className='content-section'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
