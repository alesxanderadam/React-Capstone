import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { getProductApi } from "../../redux/Reducers/productReducer";
import { Carousel } from 'antd';
import { useSelector } from 'react-redux'
import Card from "../../component/Card/Card";
import '../../assets/scss/card-product.scss'
import '../../assets/scss/pagination.scss'
import ReactPaginate from "react-paginate";

export const Home = () => {
    const { arrProduct } = useSelector(state => state.productReducer);
    const [productData, setProductData] = useState(arrProduct);
    const [pageNumber, setPageNumber] = useState(0);

    const contentStyle = {
        color: '#fff',
        textAlign: 'center',
        background: '#364d79',
    };

    const dispatch = useDispatch();
    const getAllProductApi = async () => {
        const action = getProductApi();
        dispatch(action)
    }

    // số lượng sản phẩm mỗi trang
    const productPerPage = 8;
    // trang đến: 0 * 9 = 0 trang
    const vistedPage = pageNumber * productPerPage;
    // hiển thị trang sản phẩm : danh sách sản phẩm từ vị trí (0, 9) nếu là trang 1
    // hoặc từ (10, 19) nếu là trang 2
    const displayPage = productData.slice(
        vistedPage,
        vistedPage + productPerPage
    );

    // hiển thị số phân trang
    const pageCount = Math.ceil(productData.length / productPerPage);

    // đổi trang hiển thị
    // selected tương ứng: trang 1: seleted 0, trang 2: selected: 1
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const renderCardProduct = () => {
        if (productData.length !== 0) {
            return displayPage.map((prod, index) => {
                return (
                    <Card product={prod} key={index} />
                )
            })
        }
        return (<h5>No product founded</h5>)
    }

    useEffect(() => {
        getAllProductApi();
    }, [])

    useEffect(() => {
        setProductData(arrProduct);
    }, [arrProduct])

    return (
        <div>
            <Carousel autoplay dots={false}>
                {arrProduct?.map((item, index) => {
                    return <div key={index}>
                        <div className="row align-items-center" style={contentStyle} >
                            <div className="col-md-6 col-xs-12">
                                <img className="img-fluid h-100" src={item.image}></img>
                            </div>
                            <div className="col-md-6 col-xs-12">
                                <div>
                                    <h1>{item.name}</h1>
                                    <p>{item.description}</p>
                                    <button className="btn btn-warning">Buy now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </Carousel>

            <h1 className="text-center" style={{ marginTop: '30px' }}>Product Feature</h1>
            <div className="wrapper p-5">
                {renderCardProduct()}
            </div>

            <div>
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={changePage}
                    previousLabel="Prev"
                    nextLabel="Next"
                    containerClassName="paginationBtns"
                />
            </div>
        </div>

    )
}
