import { useState } from 'react'
import { useSelector } from "react-redux"
import { Space, Table, InputNumber, Avatar } from 'antd';
import './cart.scss'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const Cart = () => {
    const { productCart } = useSelector(state => state.productReducer)
    // const [soluong, setSoluong] = useState(productCart.quantity)
    const onChange = (value) => {
        console.log(value)
    }
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: '1',
        },
        {
            title: 'img',
            key: '2',
            render: (data) => (
                <>
                    {
                        <Avatar.Group>
                            <Avatar className="shape-avatar" shape="square" size={80} src={data.image}></Avatar>
                        </Avatar.Group>
                    }
                </>
            ),
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: '3',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: '4',
        },
        {
            title: 'quantity',
            render: (data) => {
                return <>
                    <Space>
                        <InputNumber onChange={onChange} value={data.quantity} size="small" min={1} max={100000} />
                    </Space>
                </>
            }
        },
        {
            key: 'total',
            title: 'total',
            render: (data) => (
                <>
                    {
                        data.price * data.quantity
                    }
                </>
            ),
        },
        {
            key: '7',
            title: 'action',
            render: (record) => {
                return <>
                    <EditOutlined />
                    <DeleteOutlined style={{ color: "red", marginLeft: 12 }}></DeleteOutlined>
                </>
            }
        },
    ];
    return (
        <>
            <Table dataSource={productCart} columns={columns} />;
        </>
    )
}

export default Cart
