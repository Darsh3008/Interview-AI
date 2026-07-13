import React from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth';
import "../protected.scss"

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await handleRegister({ username, email, password })
        if (result) {
            navigate("/login")
        }         else {
            alert("Registration failed ❌. Please try again.")
        }

    };

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
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <div className="password-wrapper">

                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Enter Username' required />
                        </div>
                    </div>
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
                    <button className='button primary-button'>Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>

    )
}

export default Register
