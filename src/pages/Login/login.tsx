import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageConstant } from '../../Commons/page.constant';
import { LoginModel } from '../../models/login.modal';
import { loginApi } from '../../redux/Reducers/loginReducer';
import LoginForm from './login-form'

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const onLogin = (login: LoginModel) => {
        const action: any = loginApi(login)
        dispatch(action)
        navigate(`${PageConstant.profile}`)
    }
    return (
        <LoginForm login={null!} submitted={onLogin} />
    )
}
