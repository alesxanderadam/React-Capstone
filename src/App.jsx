import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Register } from './pages/Register/Register.jsx';
import { Search } from './pages/Search/Search';
import { Detail } from './pages/Detail/Detail';
import { PageConstant } from './Commons/page.constant';
import { Page404 } from './Page404/Page404';
import Cart from './pages/Cart/Cart';
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<HomeTemplate />}>
                        <Route index path={`${PageConstant.home}`} element={<Home />}></Route>
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
            </BrowserRouter></>
    )
}
export default App;
