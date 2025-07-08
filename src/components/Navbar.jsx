import { Button } from "./ui/button"
const onLogOut = ()=>{

}
function NavbarComponent() {
  return (
    <div className='navbar'>
      <div className="py-3 px-5 text-end"><Button variant="outline" onClick={()=>onLogOut()} >Log Out</Button></div>
    </div>
  )
}

export default NavbarComponent
