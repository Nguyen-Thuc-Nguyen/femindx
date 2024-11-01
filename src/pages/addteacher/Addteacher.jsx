import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTeacher, deleteTeacher, fetchTeachers } from '../../store/action/adminAction'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons'
import Typography from 'antd/es/typography/Typography'
import { Button, Col, DatePicker, Divider, Form, Image, Input, message, Modal, Popover, Row, Table, Upload } from 'antd'
const { RangePicker } = DatePicker;
import './Addteacher.scss'
import axios from 'axios'

export default function Addteacher() {
    const dispatch = useDispatch()
    const teacherFromRedux = useSelector((state) => state.admin.teachers)
    const error = useSelector((state) => state.admin?.error || null)
    const [teachers, setTeachers] = useState(teacherFromRedux)
    
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [photoUrl, setPhotoUrl] = useState('')
    const onReset = () => {
        form.resetFields();
    };

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }



    const handleDelete = async (teacherId) => {
        try {
            console.log(teachers)
            const resultAction = await dispatch(deleteTeacher(teacherId));
            if (deleteTeacher.fulfilled.match(resultAction)) {
                message.success('Teacher deleted successfully.');
            } else {
                message.error(resultAction.payload);
            }
        } catch (error) {
            console.log(error)
            message.error('An error occurred while trying to delete the teacher.');
        }
    };

 



    const handleDateChange = (dates) => {
        if (dates && dates.length === 2) {
            const startDate = dates[0];
            const endDate = dates[1];
            form.setFieldsValue({
                startEndDate: [startDate, endDate],
            });
        } else {
            form.setFieldsValue({ startEndDate: [] });
        }
    };

    const handlePhotoChange = async (file) => {
        console.log('Received file:', file);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mindx4');

        console.log('FormData before upload:');
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/ddjxvtqqp/image/upload', formData);
            console.log('Upload Response:', response.data);
            setPhotoUrl(response.data.secure_url);
            return false;
        } catch (error) {
            console.error('Upload Error:', error.response.data);
            message.error('Failed to upload photo: ' + (error.response.data.error.message || 'Unknown error'));
            return false;
        }
    };
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { startEndDate, ...rest } = values;
            const startDate = startEndDate[0]?.format('YYYY-MM-DD');
            const endDate = startEndDate[1]?.format('YYYY-MM-DD');

            await dispatch(addTeacher({ ...rest, photo: photoUrl, startDate, endDate }));
            message.success('Teacher added successfully!');
            form.resetFields();
            handleCancel();
        } catch (error) {
            message.error(error.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const columns = [

        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Manage',
            key: 'action',
            render: (_, record) => {
                const deleteContent = (
                    <div style={{ textAlign: 'center' }}>
                        <ExclamationCircleOutlined
                            style={{ fontSize: '20px', color: 'red' }}
                        />
                        <Typography.Text strong>
                            {' '}
                            Are you sure you want to delete this record?
                        </Typography.Text>
                        <div style={{ marginTop: '10px' }}>
                            <Button
                                type="primary"
                                danger
                                onClick={() => handleDelete(record._id)}
                                size="small"
                                style={{ marginRight: '5px' }}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                )

                return (
                    <>
                      
                        <Popover
                            content={deleteContent}
                            title="Confirm Delete"
                            trigger="click"
                        >
                            <Button
                                icon={<DeleteOutlined />}
                                type="link"
                                size="small"
                                danger
                            />
                        </Popover>
                       
                    </>
                )
            },
        },
    ]


    useEffect(() => {
        dispatch(fetchTeachers())
    }, [dispatch])

    useEffect(() => {
        setTeachers(teacherFromRedux)
    }, [teacherFromRedux])
    return (
        <Row
            className="add-student-container"
            style={{ minHeight: '100vh', width: '100%' }}
        >
            <Col span={22} offset={1}>
                <Typography.Title level={2} className="title">
                    Teacher Management
                </Typography.Title>
                <Button
                    type="primary"
                    onClick={showModal}
                    className="create-student-button"
                >
                    Create Teacher
                </Button>
                <br />
                <Table
                    columns={columns}
                    dataSource={teachers}
                    loading={loading}
                    rowKey="teacherId"
                    pagination={{ pageSize: 8 }}
                />
            </Col>
            <Modal
                title="Add Teacher"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                className="add-teacher-modal"
                width={800}
            >
                <Form
                    form={form}
                    name="addTeacher"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Typography.Title level={4}>
                        Personal Information
                    </Typography.Title>
                    <Divider />

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input placeholder="Enter first name" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input placeholder="Enter last name" />
                    </Form.Item>

                    <Form.Item
                        label="Date of Birth"
                        name="dateOfBirth"
                        rules={[{ required: true, message: 'Please input your date of birth!' }]}
                    >
                        <DatePicker placeholder="Select date of birth" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>

                    <Typography.Title level={4}>
                        Contact Information
                    </Typography.Title>
                    <Divider />

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input placeholder="Enter your address" />
                    </Form.Item>

                    <Typography.Title level={4}>
                        Educational Background
                    </Typography.Title>
                    <Divider />

                    <Form.Item
                        label="Photo"
                        name="photo"
                        rules={[{ required: true, message: 'Please upload a photo!' }]}
                    >
                        <Row>
                            <Col span={5}>
                                <Upload
                                    customRequest={({ file, onSuccess }) => {
                                        handlePhotoChange(file).then(() => onSuccess());
                                    }}
                                    showUploadList={false}
                                >
                                    <Button>Upload Photo</Button>
                                </Upload>
                            </Col>
                            <Col span={8}>
                                {photoUrl && (
                                    <Image
                                        src={photoUrl}
                                        alt="Uploaded"
                                        style={{ maxWidth: '100%', borderRadius: '4px' }}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        label="Place of Birth"
                        name="placeOfBirth"
                        rules={[{ required: true, message: 'Please input your place of birth!' }]}
                    >
                        <Input placeholder="Enter place of birth" />
                    </Form.Item>

                    <Form.Item
                        label="University"
                        name="university"
                        rules={[{ required: true, message: 'Please input your university!' }]}
                    >
                        <Input placeholder="Enter university" />
                    </Form.Item>

                    <Form.Item
                        label="Degree"
                        name="degree"
                        rules={[{ required: true, message: 'Please input your degree!' }]}
                    >
                        <Input placeholder="Enter degree" />
                    </Form.Item>

                    <Form.Item
                        label="Start and End Date"
                        name="startEndDate"
                        rules={[{ required: true, message: 'Please input the start and end date!' }]}
                    >
                        <RangePicker
                            style={{ width: '100%' }}
                            onChange={handleDateChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                    >
                        <Input placeholder="Enter city" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{ marginRight: '10px' }}
                        >
                            Submit
                        </Button>
                        <Button type="default" onClick={onReset}>
                            Reset
                        </Button>
                    </Form.Item>

                    {error && (
                        <Typography.Text className="error-message">
                            {error}
                        </Typography.Text>
                    )}
                </Form>
            </Modal>

        </Row>
    )
}

