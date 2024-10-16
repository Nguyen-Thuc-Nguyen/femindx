import { Form, Input, Button, Row, Col, Typography, Layout } from 'antd'
import 'antd/dist/reset.css'
import './Login.scss'
import akademicLogo from '../../assets/A.png'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

export default function Login() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        navigate('/default')
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <Layout>
            <div className="login-container">
                <Row className="login-row">
                    <Col xs={0} sm={0} md={12} className="login-img-col"></Col>
                    <Col xs={24} sm={24} md={12} className="login-form-col">
                        <div className="login-form-container">
                            <Title level={2} className="login-title">
                                <img
                                    src={akademicLogo}
                                    alt="Akademic Logo"
                                    style={{
                                        height: '40px',
                                        borderRadius: '10px',
                                    }}
                                />
                                <span
                                    style={{
                                        marginLeft: '10px',
                                        fontSize: '18px',
                                    }}
                                >
                                    Akademic
                                </span>
                            </Title>
                            <Form
                                name="login"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                        {
                                            type: 'email',
                                            message:
                                                'Please enter a valid email!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter your email" />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Enter your password" />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                    >
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}
