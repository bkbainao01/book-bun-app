import ToastContainer from '@/components/ToastContainer';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useRoutes } from 'react-router-dom'
import routes from '@/routes';
import './assets/css/index.css'
import './assets/scss/index.scss'

function App() {
  const routing = useRoutes(routes);
  return (
    <div>
      <TooltipProvider delayDuration={200}>
        {routing}
        <ToastContainer />
      </TooltipProvider>
    </div>
  );
}

export default App
