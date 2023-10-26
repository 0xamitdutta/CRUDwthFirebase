import { useUserAuth } from '../context/UserAuthContext'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user, logOutUser } = useUserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOutUser()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    console.log(user)
    return (
        <div className="app" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <div>Hello {user && user.email}</div>

            <div>
                <Button variant="contained" color='primary' size='large' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Home