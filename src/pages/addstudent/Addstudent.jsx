import { Button, Col, Form, Input, Layout, message, Row, Typography } from 'antd'
import Card from 'antd/es/card/Card'
import { useState } from 'react'

export default function AddStudent() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      message.success(`Form submitted: ${JSON.stringify(values)}`)
    } catch (error) {
      message.error('Form submission failed!', error)
    } finally {
      setLoading(false)
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <Row style={{ minHeight: '100vh', width: '100%' }}>
      <Col span={12}>
        <Card bordered={false} title={
          <Typography.Title level={3}
          >Personal Details</Typography.Title>}
          className='custom className="custom-card" '

        >
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please input your name!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
              <Button
                type="default"
                onClick={onReset}
                style={{ marginLeft: '10px' }}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
