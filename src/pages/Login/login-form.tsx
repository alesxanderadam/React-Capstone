import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { PageConstant } from '../../Commons/page.constant';
import { LoginModel } from '../../models/login.modal'
import { FacebookOutlined } from "@ant-design/icons"
import './login-form-scss/login-form.scss'

const LoginForm = ({ login, submitted }: { login?: LoginModel; submitted: (login: LoginModel) => void }) => {
    const [form] = Form.useForm();
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };
    useEffect(() => {
        if (login) {
            form.setFieldValue("Login", login);
        }
    }, [login])

    const onSubmit = (values: LoginModel) => {
        submitted(values)
    }


    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <hr />
                <Form layout="vertical" name="basic" form={form} validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                        <Input className='input-form-login' />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                        <Input.Password className='input-form-login' style={{ background: "rgba(33, 33, 33, -0.92)" }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                        <NavLink className='text-register' to={`${PageConstant.register}`}>Register now ?</NavLink>
                        <Button className='btn-login ms-3 ' type="primary" htmlType="submit">Login</Button>
                    </Form.Item>
                    <a className='py-3 login-facebook'><FacebookOutlined className='me-2 icon-facebook' style={{ fontSize: "40px" }} /><h3 className='mt-1' style={{ fontSize: "20px" }}>Continue with Facebook</h3></a>
                </Form>
            </div>
        </>
    )
}

export default LoginForm
