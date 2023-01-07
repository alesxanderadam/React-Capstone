import { Input, Select } from 'antd'
import './Search.scss'
import { getListProductSearchApi, getListProductSearchByPriceApi } from '../../redux/Reducers/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PageConstant } from '../../Commons/page.constant'
import utils from '../../util/format-number'
import Card from '../../components/Card'

const Search = () => {
    const dispatch = useDispatch()
    const { keyword } = useSelector(state => state.productReducer)
    const onSearch = (value) => {
        const getListProductSearch = getListProductSearchApi(utils.$common.converVietNamese(value))
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
                    placeholder="Chose price you want"
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
                            <Card product={prod} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Search