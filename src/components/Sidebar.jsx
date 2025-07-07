function SidebarComponent() {
  const menuList = [
    {
      name:"Dashboard",
      icon: "b",
      isVisible: true
    }
  ]

  return (
    <div className='sidebar-el'>
      <div className="sidebar-box">
        <div className="logo-box">
          <div className="logo-img">
            <img src="/src/assets/img/letter-profile.png" alt="logo" />
          </div>
          <div className="logo-name">
            <span className="name">BookBun</span><br />
            <span className="desc text-muted">Book System</span>
          </div>
        </div>
        <div className="menu-list">
          { menuList.map((item, index)=>(
            <div className="menu-item" id={`menu-item-${index+1}`} >
              <div className="menu-item-icon">{item.icon}</div>
              <div className="menu-item-name">{item.name}</div>
            </div>
          )) }
          </div>
      </div>
    </div>
  )
}

export default SidebarComponent
