import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const onLogOut = async (authStore, navigate)=>{
  try {
    await authStore.logout()
    navigate('/login', { replace: true });
  } catch (error) {
    console.log("🚀 ~ onLogOut ~ error:", error)
    toast.error(`Logout Failed`)
  }
}

function NavbarComponent() {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  return (
    <div className='navbar'>
      <div className="py-3 px-5 text-end"><Button variant="outline" onClick={()=>onLogOut(authStore, navigate)} >Logout</Button></div>
    </div>
  )
}

export default NavbarComponent
