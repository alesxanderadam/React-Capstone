import { useDispatch, useSelector } from "react-redux"
import { getProfileApi } from "../../redux/Reducers/loginReducer"
import { useEffect } from 'react'
import { USER_PROFILE } from "../../util/login.localstorage";
import { Button, Form, Input, Select, Space, Table, Tag } from 'antd';
import './profile.scss'
import { Option } from "antd/es/mentions";
export const Profile = () => {
    const dispatch = useDispatch();
    const { Profile } = useSelector(state => state.loginReducer)
    const [form] = Form.useForm();
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };

    const onSubmit = (values) => {
        console.log(values)
    }
    const columns = [
        {
            title: 'id',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'image',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'name',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'price',
            dataIndex: 'address',
            key: 'price',
        },
        {
            title: 'quatatity',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'total',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    useEffect(() => {
        const getProfile = getProfileApi()
        if (!USER_PROFILE) {
            dispatch(getProfile)
        }
    }, [])

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

                            <Form.Item label="Phone" name="password" rules={[{ required: true }]}>
                                <Input.Password className='input-form-login' style={{ background: "rgba(33, 33, 33, -0.92)" }} />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className=" col-xl-4 col-xs-12 ">
                        <Form layout="vertical" name="basic" form={form} validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
                            <Form.Item label="Name" name="email" rules={[{ required: true, type: "email" }]}>
                                <Input className='input-form-login' />
                            </Form.Item>

                            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                                <Input.Password className='input-form-login' style={{ background: "rgba(33, 33, 33, -0.92)" }} />
                            </Form.Item>

                            <Form.Item name="select" label="Gender" hasFeedback rules={[{ required: true, message: 'Please select your country!' }]}>
                                <Select placeholder="Please select gender">
                                    <Select.Option value="male">Male</Select.Option>
                                    <Select.Option value="female">Female</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <hr />
                <div className="chose d-flex mb-5">
                    <div className="chose-item"><h1>Order history</h1></div>
                    <div className="chose-item"><h1>Favourite</h1></div>
                </div>
                <div className="product-table">
                    <p className="title-table mb-0">+ Orders have been placed on 09 - 19 - 2020</p>
                    <Table columns={columns} data={data} />
                </div>
            </div>
        </>

    )
}
