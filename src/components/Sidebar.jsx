import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCaretDown,
  faCaretRight,
  faFolder,
  faHome,
  faMoon,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Switch } from "./ui/switch";

function SidebarComponent() {
  const navigate = useNavigate();
  const initMenuList = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: faHome,
      isVisible: true,
    },
    {
      name: "Basic Information",
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
  const [menuList, setMenuList] = useState([...initMenuList]);
  const [isOpen, setIsOpen] = useState(false);

  const onClickMenu = (item, index) => {
    if (item?.children?.length) {
      openSubMunu(true, item, index);
    } else {
      routeDestination(item);
    }
  };
  const location = useLocation();
  const currentPath = location.pathname;

  const routeDestination = (item) => {
    navigate(item.route);
  };

  const openSubMunu = (value, item, index) => {
    setIsOpen(!isOpen);
    const updatedMenuList = [...menuList];
    updatedMenuList[index].isChildrenVisible =
      !updatedMenuList[index].isChildrenVisible;
    setMenuList(updatedMenuList);
  };

  const menuListElement = menuList.map((item, index) => {
            const isActive = item.route === currentPath;
            const isOpenParent = item.children?.some(
              (child) => child.route === currentPath
            );

            return (
              <div key={index}>
                <div
                  className={`menu-item ${
                    isActive || isOpenParent ? "active" : ""
                  }`}
                  onClick={() => onClickMenu(item, index)}
                >
                  <div className="menu-item-icon">
                    <FontAwesomeIcon icon={item.icon || ""} />
                  </div>
                  <div className="menu-item-name">{item.name}</div>

                  {item.children?.length && (
                    <div
                      className={`pt-1 px-2 menu-item-caret transition-transform duration-300 ease-in-out ${
                        item.isChildrenVisible ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                  )}
                </div>

                {item.isChildrenVisible && (
                  <div className="menu-item-children">
                    {item.children.map((child, cIndex) => {
                      const isChildActive = child.route === currentPath;
                      return (
                        <div
                          className={`menu-item ${
                            isChildActive ? "active" : ""
                          }`}
                          key={cIndex}
                          onClick={() => routeDestination(child)}
                        >
                          <div className="menu-item-icon">
                            <FontAwesomeIcon icon={child.icon || ""} />
                          </div>
                          <div className="menu-item-name">{child.name}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })

  return (
    <div className="sidebar-el">
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
          <div className="toggle-button">
            <FontAwesomeIcon icon={ faCaretRight } />
          </div>
        </div>
        <div className="menu-bar">
          { menuListElement }
        </div>
        <div className="footer">
          <div className="footer-items">
            <div className="item">
              <div className="icon"><FontAwesomeIcon icon={ faRightFromBracket } /></div>
              <div className="name">Logout</div>
            </div>
            <div className="item">
              <div className="icon"><FontAwesomeIcon icon={ faMoon } /></div>
              <div className="name">Dark Mode</div>
              <div className="switch ml-auto">
                <Switch className="mt-2" ></Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;
