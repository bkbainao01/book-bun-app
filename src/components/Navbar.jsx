import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



function NavbarComponent() {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  return (
    <div className='navbar'>
    </div>
  )
}

export default NavbarComponent
