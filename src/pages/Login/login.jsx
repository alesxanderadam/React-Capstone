import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PageConstant } from '../../Commons/page.constant';
import { loginApi, loginFacebookApi } from '../../redux/Reducers/loginReducer';
import { Button, Form, Input } from 'antd';
import { FacebookOutlined } from "@ant-design/icons"
import FacebookLogin from 'react-facebook-login'
import './login-form-scss/login-form.scss'

export const Login = () => {
    const dispatch = useDispatch()
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };
    const responseFacebook = (responseFacebook) => {
        console.log(responseFacebook)
        const action = loginFacebookApi(responseFacebook.accessToken)
        if (responseFacebook?.accessToken) {
            dispatch(action)
        }
    }
    const onSubmit = (login) => {
        const action = loginApi(login)
        dispatch(action)
    }
    return (
        <div>
            <h1>Login</h1>
            <hr />
            <Form layout="vertical" name="basic" validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                    <Input className='input-form-login' />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                    <Input.Password className='input-form-login' style={{ background: "rgba(33, 33, 33, -0.92)" }} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                    <NavLink className='text-register' to={`${PageConstant.register}`}>Register now ?</NavLink>
                    <Button className='btn-login ms-3' htmlType='submit' type="primary">Login</Button>
                </Form.Item>
                <a className='py-3 login-facebook'>
                    <FacebookOutlined className='me-2 icon-facebook' style={{ fontSize: "40px" }} />
                    <FacebookLogin
                        appId="1702613590192841"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        cssClass="btn"
                        icon="fa-facebook"
                    />
                </a>
            </Form>
        </div>

    )
}
