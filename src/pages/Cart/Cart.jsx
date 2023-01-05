import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Space, Table, Tag, InputNumber, Select } from 'antd';
import './cart.scss'
import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { addProductToCartAction } from '../../redux/Reducers/productReducer'
const Cart = () => {
  const [quantity,setQuantity] = useState(1)
const onChange = (value) => {
  setQuantity(value)

};
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: '1',
      img: '',
      name: 'product1',
      price: '1000',
      quantity: quantity
    },
    {
      key: '2',
      id: '2',
      img: '',
      name: 'product2',
      price: '2000',
      quantity: quantity
    },
  ])

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: '1',
    },
    {
      title: 'img',
      dataIndex: 'img',
      key: '2',
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
      dataIndex: 'quantity',
      render: (record) => {
        return <>
          <Space>
            <InputNumber size="small" min={1} max={100000} defaultValue={1} onChange={onChange} />
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
            data.quantity * data.price
          }
        </>
      ),
    },
    {
      key: '7',
      title: 'action',
      render: (record) => {
        return <>
          <EditOutlined></EditOutlined>
          <DeleteOutlined style={{ color: "red", marginLeft: 12 }}></DeleteOutlined>
        </>
      }
    },
  ];
  return (
    <>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  )
}

export default Cart
