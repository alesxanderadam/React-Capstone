import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Space, Table, InputNumber, Avatar } from 'antd';
import './cart.scss'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {PRODUCT_CARD,getStore,getStoreJson,removeStore, saveStoreJson, TOTAL_QUATITY, saveStore} from '../../util/config'
import Item from 'antd/es/list/Item'
import { getAddingCartProduct } from '../../redux/Reducers/productReducer';
const Cart = () => {
  const dispatch = useDispatch()
    const { productCart } = useSelector(state => state.productReducer)
    const [cart, setCart] = useState(productCart)
    const onChange = (value) => {
        console.log(value)
    }
    const onDeleteCart =(idClick) => {
      if (getStoreJson(PRODUCT_CARD)){
        let prod = getStoreJson(PRODUCT_CARD).filter(x => x.id !== idClick)
        saveStore(TOTAL_QUATITY,getStoreJson(TOTAL_QUATITY) - 1)
        setCart(prod)
        saveStoreJson(PRODUCT_CARD,prod )
      }
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
                    <DeleteOutlined onClick={() => {
                     onDeleteCart(record.id);
                    }} style={{ color: "red", marginLeft: 12 }}></DeleteOutlined>
                </>
            }
        },
    ];
    return (
        <>
            <Table dataSource={cart} columns={columns} />;
        </>
    )
}

export default Cart
