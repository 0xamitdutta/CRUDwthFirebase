import { useState } from 'react'
import { Container, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FcGoogle, } from 'react-icons/fc'
import { TiVendorMicrosoft } from 'react-icons/ti'
import { useUserAuth } from '../context/UserAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { signUpUser, signInWithGoogle, signInWithMicrosoft } = useUserAuth()

    const handleSignUp = async () => {
        try {
            setError('')
            await signUpUser(email, password);
            navigate('/users')
        } catch (error) {
            setError(error.message)
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle()
            navigate('/users')
        } catch (error) {
            setError(error.message)
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const handleMicrosoftLogin = async () => {
        try {
            await signInWithMicrosoft()
            navigate('/users')
        } catch (error) {
            setError(error.message)
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <div>
            <Container maxWidth="sm" style={{ backgroundColor: "#fff", height: "675px", width: "600px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 style={{ paddingTop: "20px" }}>CREATE AN ACCOUNT</h1>
                {error && <ToastContainer />}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextField style={{ marginTop: "75px", width: "300px" }}
                        label="Email" type="email" onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField style={{ marginTop: "25px", width: "300px" }}
                        id="outlined-password-input"
                        label="Password" type="password" onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <Button style={{ marginTop: "50px", width: "300px" }} variant="contained" color='inherit' size='large' onClick={handleSignUp}>Sign Up</Button>
                <Button startIcon={<FcGoogle />} style={{ marginTop: "25px", width: "300px" }} variant="contained" color='inherit' size='large' onClick={handleGoogleLogin}>SignUp with Google</Button>
                <Button startIcon={<TiVendorMicrosoft />} style={{ marginTop: "25px", width: "300px" }} variant="contained" color='inherit' size='large' onClick={handleMicrosoftLogin}>SignUp with Microsoft</Button>
            </Container>
        </div>
    )
}

export default Signup