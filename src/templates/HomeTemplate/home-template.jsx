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
                <span className='text-danger' style={{ cursor: 'pointer', paddingRight: '15px' }} onClick={() => { removeStore(ACCESS_TOKEN); removeStore(USER_LOGIN); removeStore(USER_PROFILE); navigate(`${PageConstant.login}`); window.location.reload(); }}>Logout</span>
            </>
        }
        return <NavLink to={`${PageConstant.login}`} style={{ textDecoration: 'none' }}><h5 className='login mx-2'>Login</h5></NavLink>
    }

    return (
        <>
            <Navbar className='header' expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <NavLink to='/'>
                            <img alt="" src="./images/Cyber-Logo.png" className="d-inline-block align-top" />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll> </Nav>
                        <div style={{ position: 'relative' }}>
                            <NavLink to={`${PageConstant.search}`} className='d-flex align-items-center text-white' style={{ textDecoration: 'none' }}>
                                <i className="fa-solid fa-magnifying-glass icon-search" ></i>
                                <h3 className='search ms-2'>Search</h3>
                            </NavLink>
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
            <footer className='bg-light text-dark text-center p-3 mt-5'>
                <div className='row'>
                    <div className="col-lg-4 col-xl-3 offset-xl-1 col-md-4 col-sm-12 col-12">
                        <div className="footer-link">
                            <h4>Quick Link</h4>
                            <ul className="ft-link">
                                <li>
                                    Home
                                </li>
                                <li>
                                    Nike
                                </li>
                                <li>
                                    Adidas
                                </li>
                                <li>
                                    Contact
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3 offset-xl-1 col-md-4 col-sm-12 col-12">
                        <div className="footer-link">
                            <h4>Support</h4>
                            <ul className="ft-link">
                                <li>
                                    About
                                </li>
                                <li>
                                    Contact
                                </li>
                                <li>
                                    Help
                                </li>
                                <li>
                                    Phone
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3 offset-xl-1 col-md-4 col-sm-12 col-12">
                        <div className="footer-link">
                            <h4>REGISTER</h4>
                            <ul className="ft-link">
                                <li>
                                    Register
                                </li>
                                <li>
                                    Login
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
