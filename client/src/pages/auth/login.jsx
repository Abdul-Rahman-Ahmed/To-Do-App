import { useForm } from 'react-hook-form'
import logo from '../../assets/taskly-logo1.png'
import './auth.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { loginApi } from '../../store/authSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    dispatch(
      loginApi({
        email: data.email,
        password: data.password,
      })
    )
  }

  const loginContent = (
    <div className="log-content">
      <h2>Welcome to</h2>
      <img src={logo} alt="logo" />
      <p>
        Stay on top of your work and boost productivity. Log in to your account
        and continue where you left off!
      </p>
    </div>
  )

  const loginForm = (
    <div className="log-form">
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
            })}
          />
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
        </div>
        {errors.email && <span className="error">{errors.email.message}</span>}
        <div>
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />

          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="icon lock"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}

        <button type="submit">login</button>
      </form>

      <p>
        Don’t have an account?{' '}
        <Link className="btn" to="/register">
          register
        </Link>
      </p>
    </div>
  )

  return (
    <div className={`log-page login`}>
      {loginForm}
      {loginContent}
    </div>
  )
}

export default Auth
