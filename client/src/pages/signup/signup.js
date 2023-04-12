import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const url = 'http://localhost:3001/api/signup'
            const {data: res} = await axios.post(url, data)
            localStorage.setItem('token', res.token)
            window.location='/'
            console.log(res.message)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className>
            <div className>
                <div className>
                    <div>
                        <form className onSubmit={handleSubmit}>
                            <h1>Sign Up</h1>
                            <input
                                type='text'
                                placeholder='username'
                                name='username'
                                onChange={handleChange}
                                value={data.username}
                                required
                                className
                            />
                            <input
                                type='email'
                                placeholder='email'
                                name='email'
                                onChange={handleChange}
                                value={data.email}
                                required
                                className
                            />
                            <input
                                type='password'
                                placeholder='password'
                                name='password'
                                onChange={handleChange}
                                value={data.password}
                                required
                                className
                            />
                            <button type='submit' className='btn btn-success'>
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup