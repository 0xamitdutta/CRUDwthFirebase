import { React, useState, useEffect } from 'react'
import { db } from '../config/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { useUserAuth } from '../context/UserAuthContext'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const User = () => {
    const userRef = collection(db, 'users')
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [users, setUsers] = useState([])
    const { user, logOutUser } = useUserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userRef)
            setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getUsers()
    }, [])

    const addUser = async () => {
        const user = { name: name, age: Number(age) }
        await addDoc(userRef, user)
    }

    const updateAge = async (id, age) => {
        const userDoc = doc(db, 'users', id)
        await updateDoc(userDoc, { age: age + 1 })
    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, 'users', id)
        await deleteDoc(userDoc)
    }
    
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
        <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>Hello {user && user.email}</div>
            <div>
                <h1>USERS</h1>
                {
                    users.map(person => (
                        <div key={person.id}>
                            <h2>Name: {person.name}</h2>
                            <h3>Age: {person.age}</h3>
                            <button style={{ marginRight: '4px' }} onClick={() => updateAge(person.id, person.age)}>Update Age</button>
                            <button style={{ marginBottom: '4px' }} onClick={() => deleteUser(person.id)}>Delete User</button>
                            <br />
                        </div>
                    ))
                }
            </div>

            <div className='inputs' style={{ marginTop: '40px' }}>
                <input type="text" placeholder='Name' style={{ marginRight: '10px', padding: '4px' }} onChange={(event) => setName(event.target.value)} />
                <input type="email" placeholder='Email' style={{ marginRight: '10px', padding: '4px' }} onChange={(event) => setEmail(event.target.value)} />
                <input type="number" placeholder='Age' style={{ marginRight: '10px', padding: '4px' }} onChange={(event) => setAge(event.target.value)} />
                <button style={{ padding: '4px' }} onClick={addUser}>Add User</button>
            </div>

            <div >
            <Button style={{ marginTop: "50px", marginLeft: "100px", width: "300px" }} variant="contained" color='primary' size='large' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default User