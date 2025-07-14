import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from "sonner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isPwdVisible, setPwdVisible] = useState(false)

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email, password)
      toast.success("Login Successfully")
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Login resp:', err)
      toast.error(`Login Failed -- ${err}`)
      setError(err.message || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <Card className="card login-card">
        <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold mb-4 text-center mt-5 mb-6 text-gray-600">Book Bun</h1>
              <div className='EmailLabel text-gray-500 mb-1'>Email</div>
              <Input
                placeholder="Email"
                type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:ring-blue-200 focus:border-blue-200" />
              <div className='PasswordLabel text-gray-500 mb-1'>Password</div>
              <div className="flex flex-row ">
                  <Input
                    type={ isPwdVisible ? 'text':'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-gray-300 focus:ring-blue-200 focus:border-blue-200 w-100"/>
                  <Button
                    type="button"
                    disabled={loading}
                    className="border-1 border-gray-300 hover:border-gray-400 text-white w-10 "
                    size="md"
                    onClick={() => setPwdVisible(!isPwdVisible) }
                     >
                      <FontAwesomeIcon icon={faEye} className="text-gray-300" />
                  </Button>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full mb-5"
                size="lg" >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  )
}
