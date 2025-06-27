import { Outlet } from "react-router-dom"

function BlankLayout() {
  return (
        <div className="blank-layout w-full">
          <Outlet />
        </div>
  )
}

export default BlankLayout
