import { Outlet } from "react-router-dom";
import SidebarComponent from "@/components/Sidebar";
import NavbarComponent from "@/components/Navbar";
import { useState, useEffect } from "react";



function MainLayout() {
   const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
   const sidebarStatusInit = window.innerWidth <= 580 ? 'close' : 'open' ;
   const [sidebarStatus, setSidebarStatus] = useState(sidebarStatusInit);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // call on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="main-layout" id="main-layout">
      <SidebarComponent size={size} sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} />
      <div className="main-section" >
        <div className="navbar-section">
          <NavbarComponent size={size} sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} />
        </div>
        <div className='content-section'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
