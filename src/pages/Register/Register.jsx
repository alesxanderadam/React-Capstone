import axios from 'axios';
import { constant, method } from 'lodash';
import React,{useState} from 'react'
import './register.scss'
import { registerReducer,resUserApii} from '../../redux/Reducers/registerReducer';
import { useDispatch } from 'react-redux';
export const Register = () => {
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [gender,setGender] = useState(true);

    const handleChangeInput = (e)=>{
        
    }
    const alertErr = (e) =>{
        let {value,name} = e.target;
        e.target.style = 'block';
    }
    const handleSubmit = async () =>{
        let item ={email,password,name,gender,phone}
        console.log(item);
        const action = resUserApii(item);
        console.log(action)
        dispatch(action);
    }
    return (
        <>
            <section className="mb-5">
                <h3 className="register-title text-center my-5 mt-5">Register</h3>
                <div className="container">
                    <div className="row" id="register_info">
                        <div className="col-12 col-lg-6 px-5">
                            <div className="input_container d-flex align-items-center mt-3">
                                <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="email" id="email" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_email" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                            <div className="input_container d-flex align-items-center mt-3">
                                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="password" id="password" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_password" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                            <div className="input_container d-flex align-items-center mt-3">
                                <input type="password" placeholder="password confirm" id="password_confirm" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_password_confirm" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 px-5">
                            <div className="input_container d-flex align-items-center mt-3">
                                <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="name" id="name" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_name" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                            <div className="input_container d-flex align-items-center mt-3">
                                <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="phone" id="phone" />
                                <span>(*)</span>
                            </div>
                            <div className="input_decor mt-1" />
                            <div id="err_phone" className="error_msg bg-danger bg-opacity-25 text-danger p-1 ps-2">
                                Error
                            </div>
                            <div className="gender mt-5 d-flex">
                                <span>Gender</span>
                                {/* <select name="gender" className='form-control'>
                                    <option value="phone"  defaultValue={0}>Male</option>
                                    <option value="tablet" defaultValue={1}>Female</option>
                                </select> */}
                                <ul className="d-flex">
                                    <li className="type ms-5">
                                        <input id="male" type="radio" name="genderSelector" />
                                        <label htmlFor="male">Male</label>
                                        <div className="check" />
                                    </li>
                                    <li className="type ms-5">
                                        <input id="female" value={gender} type="radio" name="genderSelector" onClick={()=> setGender(false)} />
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
            </section>
        </>
    )
}
