import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { USER_PROFILE } from "../../util/config";
import { Avatar, Form, Input, Modal, Select, Table, Tag } from 'antd';
import './profile.scss'
import { Button } from "react-bootstrap";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { deleteIdProductApi, editProfileApi, getProfileApi } from "../../redux/Reducers/loginReducer";
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
            ),
        }, {
            key: 'deletePassword',
            title: 'Action',
            dataIndex: 'id',
            name: 'orderId',
            render: (data) => (
                <>
                    <div className="ant-employed d-flex align-items-center justify-content-center">
                        <Button name="orderId" className="mx-2 table-action-button" onClick={() => { showDeleteConfirm(data); }} >
                            Delete
                        </Button>
                    </div>
                </>
            ),
        },
    ];

    const { confirm } = Modal;
    const showDeleteConfirm = (data) => {
        confirm({
            title: "Xóa giỏ hàng",
            icon: <ExclamationCircleFilled />,
            content: `Người dùng: ${data} sẽ bị được xóa? `,
            okText: "Đồng ý",
            okType: "primary",
            cancelText: "Không",
            onOk() {
                const deleteIdProduct = deleteIdProductApi({
                    orderId: data
                })
                dispatch(deleteIdProduct)
            },
            onCancel() {
                console.log("Hủy");
            },
        });
    };

    const onSubmit = (values) => {
        const editProfile = editProfileApi(values)
        dispatch(editProfile)
    }

    useEffect(() => {
        const getProfile = getProfileApi()
        if (!USER_PROFILE) {
            dispatch(getProfile)
        }
        form.setFieldsValue(Profile)
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

                            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                                <Input className='input-form-login' />
                            </Form.Item>

                            <Form.Item>
                                <Button className="edit-button-profile mt-3" type="primary"> Update </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className=" col-xl-4 col-xs-12 ">
                        <Form layout="vertical" name="basic" form={form} validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
                            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                                <Input className='input-form-login' />
                            </Form.Item>

                            <Form.Item label="Password" name="newPassword" >
                                <Input.Password id="password" className='input-form-login' />
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
                    <Button className="chose-item me-3"><h1>Order history</h1></Button>
                    <Button className="chose-item"><h1>Favourite</h1></Button>
                </div>
                <div className="product-table">
                    <p className="title-table mb-0">+ Orders have been placed on 09 - 19 - 2020</p>
                    <Table columns={columns} dataSource={arrProduct} />
                </div>
            </div>
            {/* <div className="mt-5">
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="tab-style--1 nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <Button className="active" id="history" data-bs-toggle="tab" data-bs-target="#rn-history" role="tab" aria-controls="history" aria-selected="true">Our
                                    History</Button>
                            </li>
                            <li className="nav-item">
                                <Button id="mission" data-bs-toggle="tab" data-bs-target="#rn-mission" role="tab" aria-controls="mission" aria-selected="false">Our
                                    Mission</Button>
                            </li>
                            <li className="nav-item">
                                <Button id="vision" data-bs-toggle="tab" data-bs-target="#rn-vision" role="tab" aria-controls="vision" aria-selected="false">Our
                                    Vision</Button>
                            </li>
                            <li className="nav-item">
                                <Button id="support" data-bs-toggle="tab" data-bs-target="#rn-support" role="tab" aria-controls="support" aria-selected="false">Support</Button>
                            </li>
                        </ul>
                        <div className="tab-content mt-4">
                            <div className="tab-pane fade show active" id="rn-history" role="tabpanel" aria-labelledby="history">
                                <div className="single-tab-content">
                                    <div className="mt-3 mt_lg--10 mt_md--10 mt_sm-10">
                                        <h4>Lorem ipsum dolor sit.</h4>
                                        <ul className="list-style--1">
                                            <li><i data-feather="check" /> The
                                                Philosophy Of business analytics
                                            </li>
                                            <li><i data-feather="check" /> Fast-Track
                                                Your business</li>
                                            <li><i data-feather="check" /> Lies And
                                                Damn Lies About business
                                            </li>
                                            <li><i data-feather="check" /> The
                                                Ultimate Deal On business</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="rn-mission" role="tabpanel" aria-labelledby="mission">
                                <div className="single-tab-content">
                                    <p>Fatima ipsum dolor sit amet consectetur
                                        adipisicing elit. Neque ab aliquid, atque enim,
                                        vero nobis quam beatae nesciunt aliquam
                                        molestias, optio hic laborum esse. Deserunt
                                        architecto officiis laudantium corporis
                                        voluptatem.</p>
                                    <p>Jannin ipsum dolor sit amet consectetur
                                        adipisicing elit. Neque ab aliquid, atque enim,
                                        vero nobis quam beatae nesciunt aliquam
                                        molestias, optio hic laborum esse. Deserunt
                                        architecto officiis laudantium corporis
                                        voluptatem.</p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="rn-vision" role="tabpanel" aria-labelledby="vision">
                                <div className="single-tab-content">
                                    <p>John ipsum dolor sit amet consectetur adipisicing
                                        elit. Neque ab aliquid, atque enim, vero nobis
                                        quam beatae nesciunt aliquam molestias, optio
                                        hic laborum esse. Deserunt architecto officiis
                                        laudantium corporis voluptatem.</p>
                                    <p>Jane ipsum dolor sit amet consectetur adipisicing
                                        elit. Neque ab aliquid, atque enim, vero nobis
                                        quam beatae nesciunt aliquam molestias, optio
                                        hic laborum esse. Deserunt architecto officiis
                                        laudantium corporis voluptatem.</p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="rn-support" role="tabpanel" aria-labelledby="support">
                                <div className="single-tab-content">
                                    <p>John ipsum dolor sit amet consectetur adipisicing
                                        elit. Neque ab aliquid, atque enim, vero nobis
                                        quam beatae nesciunt aliquam molestias, optio
                                        hic laborum esse. Deserunt architecto officiis
                                        laudantium corporis voluptatem.</p>
                                    <p>Jane ipsum dolor sit amet consectetur adipisicing
                                        elit. Neque ab aliquid, atque enim, vero nobis
                                        quam beatae nesciunt aliquam molestias, optio
                                        hic laborum esse. Deserunt architecto officiis
                                        laudantium corporis voluptatem.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> */}
        </>

    )
}
