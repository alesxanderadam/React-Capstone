import { Input, Select } from 'antd'
import './Search.scss'
import { getListProductSearchApi, getListProductSearchByPriceApi } from '../../redux/Reducers/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PageConstant } from '../../Commons/page.constant'

const Search = () => {
    const dispatch = useDispatch()
    const { keyword } = useSelector(state => state.productReducer)
    const onSearch = (value) => {
        const getListProductSearch = getListProductSearchApi(value)
        dispatch(getListProductSearch)
    }
    const handleChange = (value) => {
        dispatch(getListProductSearchByPriceApi(value))
    }
    return (
        <>
            <div className='search-page p-4'>
                <span className='title ps-2'>Search</span>
                <Input.Search
                    className='input-form-login'
                    style={{ borderRadius: '5px' }}
                    placeholder="Product name"
                    allowClear
                    enterButton="Search"
                    size="middlex"
                    onSearch={onSearch}
                />
            </div>
            <div className="title-component my-3">
                <h1>Search result</h1>
            </div>
            <div className='contaier px-4 mb-5' style={{ marginBottom: '100px' }}>
                <Select
                    onChange={handleChange}
                    style={{ width: '200px' }}
                    onSearch={onSearch}
                    showSearch={true}
                    placeholder="Select account"
                >
                    {keyword?.map((item, index) => {
                        return <Select.Option key={index} value={item.price}>
                            {item.price}
                        </Select.Option>
                    })}
                </Select>
                <div className='row mt-4'>
                    {keyword?.map((prod, index) => {
                        return <div className='col-xl-4 mt-2' key={index}>
                            <div className="card">
                                <i className="fa-solid fa-heart position-absolute  end-0 mx-2 mt-2" style={{ fontSize: 20, color: 'red' }}></i>
                                <img id="hinhAnh" src={prod.image} alt="" />
                                <div className="card-body">
                                    <p id="name">{prod.name}</p>
                                    <p id="mota">{prod.description.length > 80 ? prod.description.substr(0, 80) + '...' : prod.description}.</p>
                                    <div id="buttons" className="row">
                                        <NavLink className='col-6 btn btnBuyNow' to={`${PageConstant.detail}/${prod.id}`}>Buy now</NavLink>
                                        <button className='col-6 btn btnPrice'>{prod.price}$</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Search