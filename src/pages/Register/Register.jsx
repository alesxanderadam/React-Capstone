import axios from 'axios';
import React, { useState } from 'react'
import './register.scss'
import { registerReducer, resUserApii } from '../../redux/Reducers/registerReducer';
import { useDispatch } from 'react-redux';
import { Form, Button, Checkbox, input, Select, Input } from "antd";
export const Register = () => {
    const dispatch = useDispatch();
    // const [name, setName] = useState("");
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [gender, setGender] = useState(true);

    const handleChangeInput = (e) => {

    }
    const alertErr = (e) => {
        let { value, name } = e.target;
        e.target.style = 'block';
    }
    //const handleSubmit = async () => {
        //let item = { email, password, name, gender, phone }
        //console.log(item);
        // const action = resUserApii(item);
        // console.log(action)
        // dispatch(action);
    //}
    return (
        <>
            {/* <section className="mb-5">
                <h3 className="register-title text-center my-5 mt-5">Register</h3>
                <div className="container">
                    <div className="row" id="register_info">
                        <div className="col-12 col-lg-6 px-5">
                            <div className="input_container d-flex align-items-center mt-3">
                                <Input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="email" id="email" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_email" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                            <div className="input_container d-flex align-items-center mt-3">
                                <Input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="password" id="password" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_password" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                            <div className="input_container d-flex align-items-center mt-3">
                                <Input type="password" placeholder="password confirm" id="password_confirm" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_password_confirm" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 px-5">
                            <div className="input_container d-flex align-items-center mt-3">
                                <Input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="name" id="name" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_name" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                            <div className="input_container d-flex align-items-center mt-3">
                                <Input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="phone" id="phone" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_phone" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                            <div className="gender mt-5 d-flex">
                                <span>Gender</span>
                                <ul className="d-flex">
                                    <li className="type ms-5">
                                        <Input id="male" type="radio" name="genderSelector" />
                                        <label htmlFor="male">Male</label>
                                        <div className="check" />
                                    </li>
                                    <li className="type ms-5">
                                        <Input id="female" value={gender} type="radio" name="genderSelector" onClick={()=> setGender(false)} />
                                        <label htmlFor="female">Female</label>
                                        <div className="check" />
                                    </li>
                                </ul> 
                            </div>
                            <div id="err_gender" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                            <button id="submit" className="mt-4 register_submit" onClick={()=>{
                                handleSubmit()
                            }}>
                                Submit
                            </button>
                            <div className="d-flex justify-content-center">
                                <div className="error_msg bg-warning bg-opacity-25 text-danger py-2 mt-4 rounded shadow-lg text-center" id="fail_register" style={{ fontSize: 18, width: '100%', fontWeight: 600 }}>
                                    Register Failed!
                                </div>
                            </div>
                            <div className="d-flex justify-content-center error_msg">
                                <div className="error_msg bg-success bg-opacity-25 text-success py-2 mt-4 rounded shadow-lg text-center" id="success_register" style={{ fontSize: 18, width: '100%', fontWeight: 600 }}>
                                    Register Successfully!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  */}
            <div className='container'>
                <div className='text-left mt-3'>Register</div>
                <hr />
                <Form autoComplete='off' className='row w-100' name="basic" onFinish={(values) =>{
                    const {email,gender,name,password,passwordcf,phone} = values
                    let item = { email, password, name, gender, phone }
                    console.log(item);
                    const action = resUserApii(item);
                    console.log(action)
                    dispatch(action);
                }}>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        {/* email */}
                        <Form.Item name="email" label="Email" rules={[{
                            required:true,
                            message:'Vui lòng điền Email',
                        },{
                            type:'email',message:'vui lòng nhập đúng định dạng email'
                        }
                        ]}hasFeedback>
                            <Input placeholder='Email' className='ms-2' ></Input>
                        </Form.Item>
                        {/* password */}
                        <Form.Item name="password" label="Password" rules={[{
                            required:true,
                        },{
                        min:6,message:'mật khẩu ít nhất 6 kí tự'
                        }
                        ]}hasFeedback>
                            <Input.Password placeholder='PassWord' className='ms-2'></Input.Password>
                        </Form.Item>
                        {/* cf-password */}
                        <Form.Item name="passwordcf" label="Password-confirm" dependencies={"password"} rules={[{
                            required:true,
                        },({getFieldValue}) =>({
                            validator(_,value){
                                if(!value || getFieldValue('password') === value){
                                    return Promise.resolve()
                                }
                                return Promise.reject('mật khẩu xác nhận không trùng khớp')
                            }
                        })
                        ]}hasFeedback>
                            <Input.Password placeholder='password confirm' className='ms-2'></Input.Password>
                        </Form.Item>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        {/* name */}
                        <Form.Item name="name" label="Name" rules={[{
                            required:true,
                            message:'Vui lòng điền họ tên',
                        },{
                            whitespace:true
                        },{min:5}
                        ]}hasFeedback>
                            <Input placeholder='Name' className='ms-2'></Input>
                        </Form.Item>
                        {/* phone */}
                        <Form.Item name="phone" label="Phone" rules={[{
                            required:true,
                            message:'Vui lòng điền số điện thoại',
                        },{
                          
                        },{max:10}
                        ]}hasFeedback>
                            <Input placeholder='Phone' className='ms-2'></Input>
                        </Form.Item>
                        {/* gender */}
                        <Form.Item name="gender" label="Gender" rules={[{
                            required:true
                        }]}>
                            <Select placeholder='Gender'>
                                <Select.Option value='true' Select>Male</Select.Option>
                                <Select.Option value='false'>Female</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className='text-center'>
                            <Button block type='primary' htmlType='submit'>Register</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    )
}
