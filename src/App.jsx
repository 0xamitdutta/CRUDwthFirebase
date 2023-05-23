import { useState, useEffect } from 'react'
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

function App() {
  const userRef = collection(db, 'users')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userRef)
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [users])

  const addUser = async () => {
    const user = { name: name, email: email, age: Number(age) }
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

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h1>USERS</h1>
        {
          users.map(user => (
            <div>
              <h2>Name: {user.name}</h2>
              <h3>Email: {user.email}</h3>
              <h3>Age: {user.age}</h3>
              <button style={{ marginRight: '4px' }} onClick={() => updateAge(user.id, user.age)}>Update Age</button>
              <button style={{ marginBottom: '4px' }} onClick={() => deleteUser(user.id)}>Delete User</button>
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
    </div>
  )
}

export default App
