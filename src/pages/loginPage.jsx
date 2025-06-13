import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent } from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e) => {
    console.log("🚀 ~ handleSubmit ~ password:", password)
    console.log("🚀 ~ handleSubmit ~ username:", email)
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email, password)
      alert('Login Success 🎉')
      // TODO: redirect ไปหน้า dashboard
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="shadow-md border-0 bg-white w-120">
        <CardContent>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold mb-4 text-center mt-5 mb-6 text-gray-600">Login</h1>
              <div className='EmailLabel text-gray-500 mb-1'>Email</div>
              <Input
                placeholder="Email"
                type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:ring-blue-200 focus:border-blue-200" />
              <div className='PasswordLabel text-gray-500 mb-1'>Password</div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:ring-blue-200 focus:border-blue-200"/>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full mb-5"
                size="lg">
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  )
}
