import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const url = 'http://localhost:3001/api/login'
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
                            <h1>Login</h1>
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
                                Login
                            </button>
                        </form>
                        <Link to='/signup'>
                        Dont have an account? Sign up Here.
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login