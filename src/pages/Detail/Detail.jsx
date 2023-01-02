import React, { useEffect } from 'react'
import { Container, Row, Col } from "reactstrap";
import { motion } from 'framer-motion'
import { getProductByIdApi } from '../../redux/Reducers/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../assets/scss/detail.css'
import Card from '../../component/Card/Card';
export const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { productDetail } = useSelector((state) => state.productReducer);

    const getProductById = () => {
        dispatch(getProductByIdApi(id));
    };
    useEffect(() => {
        getProductById();
    }, [id]);

    return (
        <>
            <Container>
                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Col lg="4" md="4">
                        <div className='product__image'>
                            <img src={productDetail.image} className='w-100' alt="..." />
                        </div>
                    </Col>
                    <Col lg="8" md="8">
                        <div className="product__detail">
                            <h2 className="product__title fs-1 mb-3">{productDetail.name}</h2>
                            <p className="product__price fs-5 mt-3 mb-4">
                                Price: {productDetail.price}$
                            </p>
                            <p className="size fs-5 mb-3">
                                Sizes:{" "}
                                {productDetail.size?.map((item, index) => (
                                    <motion.span whileTap={{ scale: 1.2 }} key={index}>
                                        {item}
                                    </motion.span>
                                ))}
                            </p>
                            <p className="product__description mb-3">{productDetail.description}</p>

                            <motion.button
                                whileTap={{ scale: 1.2 }}
                                className="btn btn-secondary fw-bold"
                                style={{ margin: 0 }}
                            >
                                Add to Cart
                            </motion.button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" className="mb-5 mt-4">
                        <h2 className="related__Product-title">You might also like</h2>
                    </Col>
                    {
                        // render Product Card
                        productDetail.relatedProducts?.map((product, index) => {
                            return (
                                <Col
                                    lg="3"
                                    md="4"
                                    sm="6"
                                    xs="6"
                                    className="mb-4"
                                    key={index}
                                >
                                    <Card product={product} />
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </>
    )
}

