import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useContextInfo } from '../../hooks/context'
import { Avatar, Row, Col, Typography, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MY_SERVICE from '../../services'
import "./Profile.scss"

const cloudinaryAPI = process.env.REACT_APP_CLOUDINARY_ROUTE

const { Title, Text } = Typography;

const Info = () => {

  const { user, addProfilePic } = useContextInfo()
  const [usr, setUsr] = useState(user)
  const [image, setImage] = useState(user.profile_pic)
  console.log(user, "🔥")

  useEffect(() => {
    if(user){
      setUsr(user)
    } else {
      setUsr(user)
    }
  },[user])

  const handleUploadFile = async (file) => {
    console.log(file, "💾");
    let data = new FormData()

    data.append('file', file)
    data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
    
    const result = await axios.post(cloudinaryAPI, data)

    const imageUrl = result.data.secure_url

    await MY_SERVICE.updatePic(usr._id, {profile_pic: imageUrl})

    addProfilePic(imageUrl)

    setImage(imageUrl)

  }

  function onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
    <>
   {user ? (
   <>
  <div id="profile-info">
   <Row>
        <Col span={6}>
          <Avatar 
          src={image} 
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          />
        </Col>
        <Col span={18} style={{textAlign: 'left'}}>
          <Title level={4}>{usr.username}</Title>
          <Text type="secondary">{usr.exercise}</Text>
          <Upload 
            action='//jsonplaceholder.typicode.com/posts/'
            onChange={onChange}
            name="file"
            beforeUpload={handleUploadFile}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="info__content">
        <div>
        <p>
          Height
        </p>
        <p>{usr.height.value} &nbsp; {usr.height.heightPrefix}</p>
        </div>
        <div>
          <p>
            Weight
          </p>
          <p>
          {usr.weight.value}  &nbsp; {usr.weight.weightPrefix}
          </p>
        </div>
        </Col>
      </Row>
    </div>
   </>
   ) : ""}
      {/* <Row>
        <Col span={6}>
          <Avatar 
          src={image} 
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          />
            <Upload 
            action='//jsonplaceholder.typicode.com/posts/'
            onChange={onChange}
            name="file"
            beforeUpload={handleUploadFile}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Col>
        <Col span={18} style={{textAlign: 'left'}}>
          <Title level={4}>{user.username}</Title>
          <Text type="secondary">{user.exercise}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <p>{user.height.value} &nbsp; {user.height.heightPrefix}</p>
          <p>{user.weight.value}  &nbsp; {user.weight.weightPrefix}</p>
        </Col>
      </Row> */}
    </>
  )
}

export default Info