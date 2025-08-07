import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCaretLeft,
  faCaretRight,
  faFolder,
  faHome,
  faMoon,
  faRightFromBracket,
  faSun,
  faUsers,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useAuthStore } from "@/stores/authStore";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { Button } from "./ui/button";

  const initMenuList = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: faHome,
      isVisible: true,
    },
    {
      name: "Basic Information",
      code: "BI",
      isParent: true,
      icon: faFolder,
      isVisible: true,
      isChildrenVisible: false,
      children: [
        {
          name: "Users",
          route: "/base-info/users",
          icon: faUsers,
          isVisible: true,
        },
        {
          name: "Books",
          route: "/base-info/books",
          icon: faBook,
          isVisible: true,
        },
      ],
    },
  ];


  function onClickMenu (item, navigate) {
      navigate(item.route);
  };

  function menuChildListElement (childList, currentPath, navigate) {
    return childList.map((child, index ) => {
      const isActive = child.route === currentPath;
      return (
        <div className={`menu-item ${ isActive ? "active" : "" }`} onClick={() => onClickMenu(child, navigate)} key={index} title={child.name} >
          <div className={`menu-item-icon`}><FontAwesomeIcon icon={ child.icon || "" } /></div>
          <div className={`menu-item-name`}>{child.name}</div>
        </div>
      )
    })
  }

  function menuListElement (menuList, currentPath, navigate , isClose) {
    return menuList.map((item, index) => {
      const isActive = item.route === currentPath;
      return (
        <div key={index}>
              <div className={`menu-item ${ isActive ? "active" : "" }`} onClick={() => onClickMenu(item, navigate)} title={ item.name } >
                { !item.isParent && (<div className={`menu-item-icon`}><FontAwesomeIcon icon={ item.icon || "" } /></div>)}
                <div className={`menu-item-name ${item?.isParent === true ? 'parent' : '' }`}>{ item?.isParent && isClose ? item.code : item.name}</div>
              </div>
          { item?.isParent === true && menuChildListElement(item.children , currentPath, navigate) }
        </div>
      );
    })
  }

  function onClickDarkModeToggle(value , setIsDarkMode) {
    setIsDarkMode(value);
    const element = document.getElementById("main-layout")
    if(element && value) {
      element.classList.add("dark");
    } else if(element && !value) {
      element.classList.remove("dark");
    } else {
      console("doesn't have element...")
    }
  }

  function setDefaultMode(isDarkMode) {
    const element = document.getElementById("main-layout");
    if (element) {
      if (isDarkMode) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  }

function toggleSidebar({ setSidebarStatus ,sidebarStatus }) {
  setSidebarStatus(sidebarStatus == 'open' ? 'close' : 'open');
}

function onCloseFullSidebar({setSidebarStatus}) {
  setSidebarStatus('close');
  const element = document.getElementById("sidebarEl");
  if (element) {
    element.classList.remove("full");
  }
}

function SidebarComponent({
  size = { width: 0, height: 0 },
  sidebarStatus = '',
  setSidebarStatus
}) {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const [menuList, setMenuList] = useState([...initMenuList]);
  const isDarkModeDefault = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeDefault);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if(size.width <= 580) {
      setSidebarStatus('close');
    }
  }, [size,setSidebarStatus]);

  useEffect(() => {
    setDefaultMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`sidebar ${ sidebarStatus }`} id="sidebarEl">
      <div className="sidebar-box">
        <div className="header">
          <div className="logo">
            <div className="img-box">
              <img src="/src/assets/img/letter-profile.png" alt="logo" />
            </div>
            <div className="text-box">
              <span className="name">BookBun</span><br />
              <span className="desc">Book System</span>
            </div>
          </div>
          {
            size?.width > 580 && (
              <div className="toggle-button" onClick={()=> toggleSidebar({setSidebarStatus })} >
                <FontAwesomeIcon icon={ sidebarStatus == 'close' ? faCaretRight : faCaretLeft } />
              </div>
            )
          }
          { sidebarStatus == 'full' && (
            <div className="" onClick={()=> onCloseFullSidebar({setSidebarStatus })} >
              <FontAwesomeIcon icon={ faXmark }  />
            </div>
          ) }
        </div>
        <div className="menu-bar">
          { menuListElement(menuList, currentPath, navigate, sidebarStatus == 'close') }
        </div>
        <div className="footer">
          <div className="footer-items">
            <div className="menu-item " onClick={()=>authStore.logout(navigate)} title="Logout" >
              <div className="menu-item-icon"><FontAwesomeIcon icon={ faRightFromBracket } /></div>
              <div className="menu-item-name">Logout</div>
            </div>
            <div className="menu-item" title={ isDarkMode ? 'Dark Mode' : 'Light Mode' }>
              { !sidebarStatus == 'close' && (<div className="menu-item-icon"><FontAwesomeIcon icon={ isDarkMode ? faMoon : faSun } /></div>)}
              <div className="menu-item-name">{isDarkMode ? 'Dark' : 'Light'} Mode</div>
              <div className={`menu-item-switch ${ sidebarStatus == 'close' ? '':'ml-auto'}`}>
                <Switch className="mt-1"
                  checked={isDarkMode}
                  onCheckedChange={(value)=> onClickDarkModeToggle(value, setIsDarkMode)}></Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;
