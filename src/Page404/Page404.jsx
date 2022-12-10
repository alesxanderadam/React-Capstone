import { NavLink } from 'react-router-dom'

export const Page404 = () => {
    return (
        <div className='container'>
            <h3 className='text-center text-danger display-5' style={{ fontWeight: 'bold' }}>Page 404</h3>
            <p className='display-6 text-center mt-3' style={{ fontWeight: 'bold' }}>The page you are looking for is not available</p>
            <p className='display-6 text-center'><NavLink to='/' style={{ textDecoration: 'none' }}>Back home</NavLink></p>
        </div>
    )
}
