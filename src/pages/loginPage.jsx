import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from "sonner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [isPwdVisible, setPwdVisible] = useState(false)

  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const onSubmit = async ({ email, password }) => {
    setLoading(true)
    try {
      await login(email, password)
      toast.success("Login Successfully")
      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.error('Login resp:', err)
      toast.error(`Login Failed -- ${err}`)
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <Card className="card login-card">
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold mb-4 text-center mt-5 mb-6 text-gray-600">Book Bun</h1>

            <div className='EmailLabel text-gray-500 mb-1'>Email</div>
            <Input
              placeholder="Email"
              type="email"
              className="w-full form-control"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

            <div className='PasswordLabel text-gray-500 mb-1'>Password</div>
            <div className="">
              <Input
                type={isPwdVisible ? 'text' : 'password'}
                placeholder="Password"
                className="w-full form-control"
                {...register("password", { required: "Password is required" })}
              />
              <Button
                type="button"
                disabled={loading}
                className="relative left-80 bottom-5.5 -translate-y-1/2 text-gray-900 hover:text-gray-900 bg-transparent"
                size="md"
                onClick={() => setPwdVisible(!isPwdVisible)}
              >
                <FontAwesomeIcon icon={isPwdVisible ? faEye : faEyeSlash} className="" />
              </Button>
            </div>
            {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mb-5"
              size="lg"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
