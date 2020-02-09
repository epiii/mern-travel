import React, { useState } from 'react'
import { Select, Typography, Button, Form, Input, Icon, } from 'antd'
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios'

const { Option } = Select;
const { Title } = Typography
const { TextArea } = Input
const Continents = [
    { key: 1, value: 'Africa' },
    { key: 2, value: 'Asia' },
    { key: 3, value: 'America' },
    { key: 4, value: 'Australi' },
    { key: 5, value: 'Europe' },
]

function UploadProductPage(props) {
    const [titleVal, setTitleVal] = useState("")
    const [descVal, setDescVal] = useState("")
    const [priceVal, setPriceVal] = useState(0)
    const [continentVal, setContinentVal] = useState("")
    const [images, setImages] = useState([])

    const onTitleChange = (event) => {
        console.log(event.currentTarget.value)
        setTitleVal(event.currentTarget.value)
    }
    const onDescChange = (event) => {
        console.log(event.currentTarget.value)
        setDescVal(event.currentTarget.value)
    }
    const onPriceChange = (event) => {
        console.log(event.currentTarget.value)
        setPriceVal(event.currentTarget.value)
    }
    const onContinentChange = (continent) => {
        // console.log(event.currentTarget.value)
        setContinentVal(continent)
    }
    const updateImages = (newImage) => {
        console.log('updateImages:', newImage)
        setImages(newImage)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        if (!titleVal || !descVal || !priceVal || !continentVal || images.length <= 0) {
            alert('all field are required')
        } else {
            let fields = {
                writer: props.user.userData._id,
                title: titleVal,
                description: descVal,
                price: priceVal,
                images: images,
                continents: continentVal,
            }
            Axios.post('/api/product/uploadProduct', fields)
                .then(response => {
                    if (response.data.success) {
                        alert('product uploaded successfully')
                        props.history.push('/')
                    } else {
                        alert('product failed to upload')
                    }
                })
        }
    }

    return (
        <div style={{
            maxWidth: '700px',
            margin: '2rem auto',
        }}>
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <Title level={2}>Upload Travel Product</Title >
            </div>

            <Form onSubmit={onSubmit}>
                <FileUpload refreshFunction={updateImages} />

                <label>TItle</label>
                <Input
                    onChange={onTitleChange}
                    value={titleVal}
                />

                <br></br>
                <label>Description</label>
                <TextArea
                    onChange={onDescChange}
                    value={descVal}
                ></TextArea>
                <br></br>
                <label>Price</label>
                <Input
                    type="number"
                    onChange={onPriceChange}
                    value={priceVal}
                />
                <br></br>
                <label>continent</label>
                <Select
                    placeholder="Select Continent"
                    optionFilterProp="children"
                    // onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={
                        (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={onContinentChange}
                >
                    {Continents.map(item => (
                        <Option key={item.key} value={item.key}>{item.value}</Option>
                    ))}
                </Select>
                <br></br>
                <Button onClick={onSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
