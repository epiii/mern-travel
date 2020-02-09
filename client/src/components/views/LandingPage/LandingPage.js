import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Card, Button, Col, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider'

const { Meta } = Card

function LandingPage() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        Axios.post('/api/product/getProducts')
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    setProducts(response.data.products)
                } else {
                    alert('failed fetch any product')
                }
            })
    }, [])

    const renderProducts = products.map((product, index) => (
        <Col key={index} lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<ImageSlider images={product.images} />}
            >
                <Meta
                    title={product.title}
                    description={`Rp. ${product.price}`}
                />
            </Card>
        </Col>
    ))


    return (
        <div
            style={{
                width: '75%',
                margin: '3rem auto',
            }}
        >
            <div style={{
                textAlign: 'center'
            }}>
                <h2>Nyamm Travel </h2>
                {
                    products.length === 0 ?
                        <div style={{
                            display: 'flex',
                            height: '300px',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>data not found</div> :
                        <div>
                            <Row gutter={[16, 16]}>
                                {renderProducts}
                            </Row>
                        </div>
                }
            </div>
            <div>
                <Button>load more</Button>
            </div>
        </div>
    )
}

export default LandingPage
