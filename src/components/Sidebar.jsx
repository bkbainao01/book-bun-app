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
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useAuthStore } from "@/stores/authStore";
import { useForm } from "react-hook-form"
import { useEffect } from "react";

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


  const onClickMenu = (item, navigate) => {
      navigate(item.route);
  };

  const menuChildListElement = (childList, currentPath, navigate)=>{
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

  const menuListElement = (menuList, currentPath, navigate , isClose) => {
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

  const onClickDarkModeToggle = (value , setIsDarkMode) => {
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

  const setDefaultMode = (isDarkMode)=>{
    const element = document.getElementById("main-layout");
    if (element) {
      if (isDarkMode) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  }

function SidebarComponent() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const [menuList, setMenuList] = useState([...initMenuList]);
  const [isClose, setIsClose] = useState(false);
  const isDarkModeDefault = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeDefault);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    setDefaultMode(isDarkMode)
  }, [isDarkMode]);

  return (
    <div className={`sidebar ${ isClose ? 'close' : ''}`}>
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
          <div className="toggle-button" onClick={()=>setIsClose(!isClose)} >
            <FontAwesomeIcon icon={ isClose ? faCaretRight : faCaretLeft } />
          </div>
        </div>
        <div className="menu-bar">
          { menuListElement(menuList, currentPath, navigate, isClose) }
        </div>
        <div className="footer">
          <div className="footer-items">
            <div className="menu-item " onClick={()=>authStore.logout(navigate)} title="Logout" >
              <div className="menu-item-icon"><FontAwesomeIcon icon={ faRightFromBracket } /></div>
              <div className="menu-item-name">Logout</div>
            </div>
            <div className="menu-item" title={ isDarkMode ? 'Dark Mode' : 'Light Mode' }>
              { !isClose && (<div className="menu-item-icon"><FontAwesomeIcon icon={ isDarkMode ? faMoon : faSun } /></div>)}
              <div className="menu-item-name">{isDarkMode ? 'Dark' : 'Light'} Mode</div>
              <div className={`menu-item-switch ${ isClose ? '':'ml-auto'}`}>
                <Switch className="mt-1"
                  checked={isDarkMode}
                  onCheckedChange={(value)=>onClickDarkModeToggle(value, setIsDarkMode)}></Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;
