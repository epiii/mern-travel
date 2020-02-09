import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import Axios from 'axios'

function FileUpload(props) {
    const [images, setImages] = useState([])

    const onDrop = (files) => {
        console.log('ondrop', files.length)

        let formData = new FormData()
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        // files.map(f => {
        //     console.log('f', f)
        //     formData.append('file', f)
        // })
        formData.append('file', files[0])

        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                console.log(response)
                // return false

                if (response.data.success) {
                    setImages([...images, response.data.image])
                    props.refreshFunction([...images, response.data.image])
                } else {
                    alert('failed saving')
                }
            })
    }

    const onDelete = (image) => {
        const currentIndex = images.indexOf(image)

        let newImages = [...images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
        // props.refreshFunction([...images, response.data.image])
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            // justifyContent: 'center'
        }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: '300px',
                            height: '240px',
                            border: '1px solid lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifiyContent: 'center',
                        }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{
                display: 'flex',
                width: '350px',
                height: '240px',
                overflowX: 'scroll'
            }}>
                {images.map((image, index) => (
                    <div onClick={onDelete} key={index}>
                        <img
                            style={{
                                minWidth: '300px',
                                width: '300px',
                                height: '240px',
                            }}
                            src={`http://localhost:5000/${image}`}
                            alt={`productImg-${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload
