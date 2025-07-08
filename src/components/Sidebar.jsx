import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faCaretDown, faFolder, faHome, faUsers } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function SidebarComponent() {
  const navigate = useNavigate();
  const initMenuList = [
    {
      name:"Dashboard",
      route: "/dashboard",
      icon: faHome,
      isVisible: true,
    },
    {
      name:"Basic Information",
      icon: faFolder,
      isVisible: true,
      isChildrenVisible: false,
      children: [
        {
          name:"Users",
          route: "/base-info/users",
          icon: faUsers,
          isVisible: true,
        },
        {
          name:"Books",
          route: "/base-info/books",
          icon: faBook,
          isVisible: true,
        }
      ]
    }
  ];
  const [menuList, setMenuList] = useState([...initMenuList])

  const onClickMenu = (item, index)=>{
    if (item?.children?.length) {
      openSubMunu(true, item, index)
    } else {
      routeDestination(item)
    }
  }

  const routeDestination = (item)=>{
    navigate(item.route)
  }

  const openSubMunu = (value, item, index) => {
      const updatedMenuList = [...menuList];
      updatedMenuList[index].isChildrenVisible = !updatedMenuList[index].isChildrenVisible;
      setMenuList(updatedMenuList);
  };


  return (
    <div className='sidebar-el'>
      <div className="sidebar-box">
        <div className="logo-box">
          <div className="logo-img">
            <img src="/src/assets/img/letter-profile.png" alt="logo" />
          </div>
          <div className="logo-name">
            <span className="name">BookBun</span><br />
            <span className="desc">Book System</span>
          </div>
        </div>
        <div className="menu-list">
          {
            menuList.map((item, index)=>(
            <div  id={`menu-item-${index}`} key={index}>
            <div className="menu-item" onClick={ ()=>onClickMenu(item, index) } >
              <div className="menu-item-icon"><FontAwesomeIcon icon={ item.icon || '' } /></div>
              <div className="menu-item-name">{ item.name }</div>
              {  item.children?.length && (<div className="menu-item-carret"><FontAwesomeIcon icon={ faCaretDown } /></div>) }
            </div>
            {  item.isChildrenVisible && (
              <div className="menu-item-children">
                        { item.children.map((child, cIndex)=>(
                          <div className="menu-item" id={`${cIndex}-child`} key={cIndex} onClick={()=>routeDestination(child)}>
                            { child.name }
                          </div>
                        ))}
              </div>)
            }
            </div>
            ))
          }
          </div>
      </div>
    </div>
  )
}

export default SidebarComponent
