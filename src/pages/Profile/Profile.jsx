import { useDispatch, useSelector } from "react-redux"
import { editProfileApi, getProfileApi } from "../../redux/Reducers/loginReducer"
import { useEffect } from 'react'
import { USER_PROFILE } from "../../util/config";
import { Avatar, Form, Input, Select, Table, Tag } from 'antd';
import './profile.scss'
import { Button } from "react-bootstrap";
export const Profile = () => {
    const dispatch = useDispatch();
    const { Profile } = useSelector(state => state.loginReducer)
    const arrProduct = Profile.ordersHistory;
    const [form] = Form.useForm();
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };

    const onSubmit = (values) => {
        const editProfile = editProfileApi(values)
        dispatch(editProfile)
    }
    const columns = [
        {
            title: 'id',
            key: 'id',
            dataIndex: 'id'
        },
        {
            key: 'image',
            title: 'Image',
            dataIndex: 'orderDetail',
            width: 250,
            render: (data) => (
                <>
                    {data.map((tag) => {
                        return (
                            <Avatar.Group>
                                <Avatar className="shape-avatar" shape="square" size={80} src={tag.image}></Avatar>
                            </Avatar.Group>
                        )
                    })}
                </>
            ),
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'orderDetail',
            render: (data) => (
                <>
                    {data.map((item) => {
                        return (
                            item.name + ' , '
                        )
                    })}
                </>
            )
        },
        {
            key: 'price',
            title: 'price',
            dataIndex: 'orderDetail',
            render: (data) => (
                <>
                    {data.map((item) => {
                        return (
                            item.price + ' , '
                        )
                    })}
                </>
            )
        },
        {
            key: 'quatatity',
            title: 'quatatity',
            dataIndex: 'orderDetail',
            render: (data) => (
                <>
                    {data.map((item) => {
                        return (
                            <Tag color="default">{item.quantity}</Tag>

                        )
                    })}
                </>
            )
        },
        {
            key: 'total',
            title: 'total',
            dataIndex: 'orderDetail',
            render: (data) => (
                <>
                    {data.map((item) => {
                        return (
                            `${item.price * item.quantity} ` + ' , '
                        )
                    })}
                </>
            )
        },
    ];

    useEffect(() => {
        const getProfile = getProfileApi()
        if (!USER_PROFILE) {
            dispatch(getProfile)
        }
        form.setFieldsValue(Profile)
    }, [Profile])

    return (
        <>
            <div className="title-component my-5">
                <h1>Profile</h1>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className=" col-xl-4 col-xs-12 ">
                        <div className="avatar m-auto   ">
                            <img src={Profile?.avatar} alt="..." className='w-100'></img>
                        </div>
                    </div>
                    <div className=" col-xl-4 col-xs-12 ">
                        <Form layout="vertical" name="basic" form={form} validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
                            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                                <Input className='input-form-login' />
                            </Form.Item>

                            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                                <Input className='input-form-login' />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary"> Update </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className=" col-xl-4 col-xs-12 ">
                        <Form layout="vertical" name="basic" form={form} validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
                            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                                <Input className='input-form-login' style={{ background: "rgba(33, 33, 33, -0.92)" }} />
                            </Form.Item>

                            <Form.Item label="Password" name="password" >
                                <Input.Password disabled={true} className='input-form-login' style={{ background: "rgba(33, 33, 33, -0.92)" }} />
                            </Form.Item>

                            <Form.Item name="gender" label="Gender" hasFeedback >
                                <Select placeholder="Please select gender">
                                    <Select.Option value={false}>Male</Select.Option>
                                    <Select.Option value={true}>Female</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <hr />
                <div className="chose d-flex mb-5">
                    <Button active className="chose-item me-3"><h1>Order history</h1></Button>
                    <Button active className="chose-item"><h1>Favourite</h1></Button>
                </div>
                <div className="product-table">
                    <p className="title-table mb-0">+ Orders have been placed on 09 - 19 - 2020</p>
                    <Table columns={columns} dataSource={arrProduct} />
                </div>
            </div>
        </>

    )
}
