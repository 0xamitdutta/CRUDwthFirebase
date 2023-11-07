import { useUserAuth } from '../context/UserAuthContext'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user, logOutUser, verifyIfUserIsEnrolledInMFA } = useUserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOutUser()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="app" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <div>Hello {user && user.email}</div>
            {
                // Check if multi factor authentication is not enabled then redirect to MFA page
                user && !verifyIfUserIsEnrolledInMFA() && 
                <Link to='/mfa'>
                    <Button variant="contained" color='primary' size='large'>Enable MFA</Button>
                </Link>

            }
            <div>
                <Button variant="contained" color='primary' size='large' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Home