import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"
import { faBars, fa0, faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation, Trans } from "react-i18next";
import { useLanguageStore } from "@/stores/language";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator,DropdownMenuRadioGroup,DropdownMenuRadioItem   } from "@/components/ui/dropdown-menu"

function setFullSidebar(setSidebarStatus){
  const element = document.getElementById('sidebarEl');
  setSidebarStatus('full');
  if(element && element.classList.contains("close")){
    element.classList.replace("close","full");
  }
}

const langs = [
  { code:'en' , nativeName: 'English'},
  { code:'th', nativeName: 'Thai' }
]



function NavbarComponent({
  size = { width: 0, height: 0 },
  sidebarStatus = '',
  setSidebarStatus
}) {
  const { t, i18n } = useTranslation();
  const { selectedLang, setLang } = useLanguageStore();
  const navigate = useNavigate();
  const authStore = useAuthStore();

  return (
    <div className='navbar py-3 px-3'>
      <div className="start-content">
        { (size.width < 416) && (
          <Button variant={'outline'} className={'self-center'} id="sidebarBarBtn" onClick={()=>setFullSidebar(setSidebarStatus)} >
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </Button>)  }
      </div>
      <div className="end-content">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Lang</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30 dropdown-menu-content">
            <DropdownMenuLabel>Languages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={selectedLang} onValueChange={setLang}>
              <DropdownMenuRadioItem value="en">EN</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="th">TH</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </div>
  )
}

export default NavbarComponent
