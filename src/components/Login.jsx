import { React, useState } from 'react'
import { Container, TextField, Button } from '@mui/material'
import { FcGoogle, } from 'react-icons/fc'
import { TiVendorMicrosoft } from 'react-icons/ti'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { logInUser, signInWithGoogle, signInWithMicrosoft } = useUserAuth()
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

    const handleMicrosoftLogin = async () => {
        try {
            await signInWithMicrosoft()
            navigate('/users')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Container maxWidth="sm" style={{ backgroundColor: "#fff", height: "675px", width: "600px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 style={{ paddingTop: "20px" }}>WELCOME BACK</h1>
                {error && <h3 style={{ marginLeft: "50px", color: "red" }}>ERROR: {error}</h3>}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextField style={{ marginTop: "75px", width: "300px" }}
                        label="Email" type="email" onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField style={{ marginTop: "25px", width: "300px" }}
                        id="outlined-password-input"
                        label="Password" type="password" onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <Button style={{ marginTop: "50px", width: "300px" }} variant="contained" color='inherit' size='large' onClick={handleLogin}>Login</Button>
                <Button startIcon={<FcGoogle />} style={{ marginTop: "25px", width: "300px" }} variant="contained" color='inherit' size='large' onClick={handleGoogleLogin}>Login with Google</Button>
                <Button startIcon={<TiVendorMicrosoft />} style={{ marginTop: "25px", width: "300px" }} variant="contained" color='inherit' size='large' onClick={handleMicrosoftLogin}>Login with Microsoft</Button>
                <div style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
                    Dont have an account?<Link to="/signup"> Sign up</Link>
                </div>
            </Container>
        </div>
    )
}

export default Login