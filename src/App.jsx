import { Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { HomeTemplate } from './templates/HomeTemplate/home-template';
import { Home } from './pages/Home/Home';
import { Register } from './pages/Register/Register.jsx';
import Search from './pages/Search/Search';
import { Detail } from './pages/Detail/Detail';
import { PageConstant } from './Commons/page.constant';
import { Page404 } from './Page404/Page404';
import Profile from './pages/Profile/profilee';
import Cart from './pages/Cart/Cart';
import { Login } from './pages/Login/login';
import { createBrowserHistory } from 'history';
import './assets/scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
export const history = createBrowserHistory()
function App() {
    return (
        <>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path='/' element={<HomeTemplate />}>
                        <Route index element={<Home />}></Route>
                        <Route path={`${PageConstant.cart}`} element={<Cart />}></Route>
                        <Route path={`${PageConstant.login}`} element={<Login />}></Route>
                        <Route path={`${PageConstant.profile}`} element={<Profile />}></Route>
                        <Route path={`${PageConstant.register}`} element={<Register />}></Route>
                        <Route path={`${PageConstant.search}`} element={<Search />}></Route>
                        <Route path={`${PageConstant.detail}/:id`} element={<Detail />}></Route>
                        <Route path='page404' element={<Page404 />}></Route>
                        <Route path='*' element={<Navigate to='page404' />}></Route>
                    </Route>
                </Routes>
            </HistoryRouter></>
    )
}
export default App;
