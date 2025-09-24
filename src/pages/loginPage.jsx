import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams, useNavigate } from "react-router-dom";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [isPwdVisible, setPwdVisible] = useState(false)

  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const authGoogle = useAuthStore((state) => state.authGoogle)
  const afterAuthGoogleCallback = useAuthStore((state) => state.afterAuthGoogleCallback)

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      afterAuthGoogleCallback(token);
      // เก็บ token ไว้ localStorage / context / store
      // localStorage.setItem("access_token", token);

      // // เสร็จแล้ว redirect ไปหน้า dashboard
      // navigate("/dashboard");
    }
  }, [searchParams, navigate]);


  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    await login(email, password, navigate);
    setLoading(false);
  }

  const onGoogleAuth = async () => {
    setLoading(true);
    await authGoogle();
    setLoading(false);
  }

  return (
    <div className="login-page">
      <Card className="card login-card">
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-header">
              <p className='header'>Book Bun</p>
              <small className="desc">
                เข้าสู่ระบบเพื่อเริ่มต้นโลกแห่งหนังสือของคุณ <br />
                เพราะเราเชื่อว่า... หนังสือที่ดี ไม่ควรอยู่เฉยๆ บนชั้นวาง</small>
            </div>
            <div className='EmailLabel text-gray-500 mb-1'>Email</div>
            <Input
              placeholder="Email"
              type="email"
              className="w-full form-control"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

            <div className='PasswordLabel text-gray-500 mb-1'>Password</div>
            <div className="input-pwd-visible mb-10">
              <Input
                type={isPwdVisible ? 'text' : 'password'}
                placeholder="Password"
                className=""
                {...register("password", { required: "Password is required" })}
              />
                <FontAwesomeIcon icon={isPwdVisible ? faEye : faEyeSlash} className="eye-visible-icon" onClick={() => setPwdVisible(!isPwdVisible)} />
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

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-white border-0 dark:text-white"/>
                <span className="mx-2">or</span>
                <hr className="w-64 h-px my-8 bg-white border-0 dark:text-white"/>
            </div>
            <div className="">
              <Button
                type="button"
                disabled={loading}
                variant="outline"
                className={"w-full mb-3"}
                onClick={() => onGoogleAuth()}
              >
                <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
