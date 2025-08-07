import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function setFullSidebar(setSidebarStatus){
  const element = document.getElementById('sidebarEl');
  if(element){
    const className = element.className
    element.classList.add("full");
    setSidebarStatus('full')
  }
}


function NavbarComponent({
  size = { width: 0, height: 0 },
  sidebarStatus = '',
  setSidebarStatus
}) {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  return (
    <div className='navbar py-3 px-3'>
      { sidebarStatus }
      { (size.width < 416) && (
        <Button variant={'outline'} className={'self-center'} id="sidebarBarBtn" onClick={()=>setFullSidebar(setSidebarStatus)} >
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </Button>)  }
    </div>
  )
}

export default NavbarComponent
