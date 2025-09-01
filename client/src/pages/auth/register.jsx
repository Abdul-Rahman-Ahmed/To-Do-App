import { useForm } from 'react-hook-form'
import logo from '../../assets/taskly-logo1.png'
import './auth.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { registerApi } from '../../store/authSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const password = watch('password')
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    console.log(data)
    dispatch(
      registerApi({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    )
  }

  const registerContent = (
    <div className="log-content">
      <h2>Welcome to</h2>
      <img src={logo} alt="logo" />
      <p>
        Organize your work and boost your productivity with our task management
        system. Create an account and get started today!
      </p>
    </div>
  )

  const registerForm = (
    <div className="log-form">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('username', {
              required: 'User name is required',
              minLength: {
                value: 3,
                message: 'User name must be at least 3 characters',
              },
            })}
            placeholder="User Name"
          />
          <FontAwesomeIcon icon={faUser} className="icon" />
        </div>
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
        <div>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            })}
            placeholder="Email"
          />
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
        </div>
        {errors.email && <span className="error">{errors.email.message}</span>}
        <div>
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                message:
                  'Password must contain uppercase, lowercase, and a number',
              },
            })}
            placeholder="Password"
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
        <div>
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            placeholder="Confirm Password"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="icon lock"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link className="btn" to="/login">
          Login
        </Link>
      </p>
    </div>
  )

  return (
    <div className={`log-page register`}>
      {registerContent}
      {registerForm}
    </div>
  )
}

export default Register
