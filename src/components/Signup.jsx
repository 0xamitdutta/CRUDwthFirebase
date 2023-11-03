import { React, useState } from 'react'
import { Container, TextField, Button } from '@mui/material'
import { Link, Navigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUpUser } = useUserAuth()

    const handleSubmit = async () => {
        try {
            await signUpUser(email, password);
            <Navigate to='/users' />
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container maxWidth="sm" style={{ backgroundColor: "#fff", height: "675px" }}>
            <h1 style={{ marginLeft: "200px", paddingTop:"20px" }}>CREATE AN ACCOUNT</h1>
            <div>
                <TextField style={{ marginTop: "100px", marginLeft: "100px", width: "300px" }}
                    label="Email" type="email"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField style={{ marginTop: "50px", marginLeft: "100px", width: "300px" }}
                    label="Password" type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <Button style={{ marginTop: "50px", marginLeft: "100px", width: "300px" }} variant="contained" color='primary' size='large' onClick={handleSubmit}>SignUp</Button>
            </div>
            <div style={{ marginTop: "50px", marginLeft: "100px" }}>
                Already have an account? <Link to="/">Login</Link>
            </div>
        </Container>
    )
}

export default Signup