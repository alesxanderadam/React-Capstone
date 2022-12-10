import { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { getProductApi } from "../../redux/Reducers/productReducer";
import { Carousel } from 'antd';
import { useSelector } from 'react-redux'

export const Home = () => {
    const { arrProduct } = useSelector(state => state.productReducer);
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
    useEffect(() => {
        getAllProductApi();
    }, [])

    return (
        <>
            <Carousel autoplay dots={false}>
                {arrProduct?.map((item, index) => {
                    return <div key={index}>
                        <div className="row align-items-center" style={contentStyle} >
                            <div className="col-md-6 col-xs-12">
                                <img className="img-fluid" height="100px" src={item.image}></img>
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
        </>

    )
}
