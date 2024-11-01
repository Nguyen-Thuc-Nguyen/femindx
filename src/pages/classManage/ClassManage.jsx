import { Button, Col, Row, Typography } from 'antd'
import React from 'react'

export default function ClassManage() {
    const showModal = () => {

    }
    return (
        <Row
            className="add-student-container"
            style={{ minHeight: '100vh', width: '100%' }}
        >
            <Col span={22} offset={1}>
                <Typography.Title level={2} className="title">
                    Classes Management
                </Typography.Title>
                <Button
                    type="primary"
                    onClick={showModal}
                    className="create-student-button"
                >
                    Create Class
                </Button>
                <br />
            </Col>
        </Row>
    )
}
