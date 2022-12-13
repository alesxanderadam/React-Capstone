import { Nav, Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/esm/Container'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { PageConstant } from '../../Commons/page.constant'
import { ACCESS_TOKEN, removeStore, USER_LOGIN, USER_PROFILE } from '../../util/config'
import './HomeTemplate.scss'
export const HomeTemplate = () => {
    const { Login } = useSelector(state => state.loginReducer)
    const navigate = useNavigate()
    const renderLoginButton = () => {
        if (Login) {
            return <>
                <NavLink to={`${PageConstant.profile}`} style={{ textDecoration: 'none' }}> <h5 className='login mx-2'> He sờ lô ! {Login.email}</h5> </NavLink>
                <span style={{ cursor: 'pointer', paddingRight: '15px' }} onClick={() => { removeStore(ACCESS_TOKEN); removeStore(USER_LOGIN); removeStore(USER_PROFILE); window.location.reload(); navigate(`${PageConstant.login}`); }}>Logout</span>
            </>
        }
        return <NavLink to={`${PageConstant.login}`} style={{ textDecoration: 'none' }}><h5 className='login mx-2'>Login</h5></NavLink>
    }

    return (
        <>
            <Navbar className='header' expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <NavLink to={`${PageConstant.home}`}>
                            <img alt="" src="./images/Cyber-Logo.png" className="d-inline-block align-top" />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll> </Nav>
                        <div className="d-flex align-items-center text-white" style={{ position: 'relative' }}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <h3 className='search ms-2'>Search</h3>
                        </div>
                        <div className='d-flex align-items-center text-white mx-2'>
                            <h2 className='icon-shopping'>🛒</h2>
                            <h3 className='amount'>(1)</h3>
                        </div>
                        {renderLoginButton()}
                        <NavLink style={{ textDecoration: 'none' }} to={`${PageConstant.register}`}><h5 className='login mx-2'>Register</h5></NavLink>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ minHeight: '90vh' }}>
                <Outlet />
            </div>
            <footer className='bg-dark text-white text-center p-3'>
                Footer
            </footer>
        </>
    )
}
