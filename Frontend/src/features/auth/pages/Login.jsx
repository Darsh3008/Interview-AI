
import "../auth.form.scss"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import "../protected.scss"



const Login = () => {
    
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleLogin({ email, password })
        if (success) {
            navigate("/home")
        }
        else{
            alert("Login failed ❌. Please try again or register.")
            navigate("/register")
        }
    }
    if (loading) {
        return (
        <main className="loading-screen">
                <div className="loader"></div>
                <p>Checking authentication...</p>
            </main>
        )
    }
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <div className="password-wrapper">
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='Enter Email Address' required />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>

                        <div className="password-wrapper">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="eye-btn"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button className='button primary-button'>Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>

    )
}

export default Login
