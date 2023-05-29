import { React, useState } from 'react'
import { Container, TextField, Button } from '@mui/material'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { logInUser, signInWithGoogle } = useUserAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        setError('')
        try {
            await logInUser(email, password)
            navigate('/users')
        } catch (error) {
            setError(error.message)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle()
            navigate('/users')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Container maxWidth="sm" style={{ backgroundColor: "#fff", height: "675px" }}>
                <h1 style={{ marginLeft: "200px", paddingTop:"20px" }}>LOGIN</h1>
                {error && <h3 style={{ marginLeft: "50px", color:"red" }}>ERROR: {error}</h3>}
                <div>
                    <TextField style={{ marginTop: "75px", marginLeft: "100px", width: "300px" }}
                        label="Email" type="email" onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField style={{ marginTop: "50px", marginLeft: "100px", width: "300px" }}
                        id="outlined-password-input"
                        label="Password" type="password" onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <Button style={{ marginTop: "50px", marginLeft: "100px", width: "300px" }} variant="contained" color='primary' size='large' onClick={handleLogin}>Login</Button>

                </div>
                <GoogleButton style={{ marginTop: "50px", marginLeft: "100px", width: "300px" }} onClick={handleGoogleLogin} />
                <div style={{ marginTop: "50px", marginLeft: "100px" }}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </Container>
        </div>
    )
}

export default Login