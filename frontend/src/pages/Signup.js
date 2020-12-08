import React from "react"
import { Row, Col, Form, Input, Button, Typography, Divider } from "antd"
import MY_SERVICE from "../services"
import { toast } from "react-toastify"
import { useContextInfo } from "../hooks/context"
import "./form.scss"

const { Title } = Typography

const googleUrl = process.env.NODE_ENV === 'development' ?
"http://localhost:3000/auth/google" : '/auth/google'

const Signup = ({ history }) => {
  const [form] = Form.useForm()
  const { login, user } = useContextInfo()
  if (user) history.push("/dashboard")

  async function handleSubmit(userInput) {
    // console.log("antes del signup")
    await MY_SERVICE.signup(userInput)
    .then(response => {
      // console.log(response.data.user)
      MY_SERVICE.login(userInput)
      .then(response => {
        
        // login(response.data.user)
        history.push("/new-user-form")
        console.log("response fro server" ,response)
        console.log("response fro server" ,response.data)
        console.log("response fro server" ,response.data.user)
      }).catch(error =>{
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
      toast.error("Something went wrong! Email already exists!")
    })

    // console.log(userInput)
    // history.push("/login")
    //Despues del signp nos loggeamos directamente para rdigir al newform
    
  }

  return (
    <Row id="form-style">
      <div className="form__content">
      <Col span={24}>
        <Title level={1}>
        CREATE YOUR ACCOUNT
        <br/>
        <span>To start your journey</span>
        </Title>
      </Col>
      <Col span={24}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item rules={[{ required: true }]} name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="password"
            label="Password"
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" block htmlType="submit">
            Signup
          </Button>
        </Form>
        <Divider>
          Or
        </Divider>
        <a href={googleUrl}>
          <Button block> <i className="fab fa-google"></i>  &nbsp; Signup with Google </Button>
        </a>
      </Col>
      </div>
    </Row>
  )
}

export default Signup
