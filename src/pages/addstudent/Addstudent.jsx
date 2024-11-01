import {
    Button,
    Col,
    Form,
    Input,
    message,
    Row,
    Typography,
    Divider,
    Table,
    Modal,
    Descriptions,
    Popover,
    Card,
} from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addStudent,
    deleteStudent,
    fetchStudentProfile,
    fetchStudents,
    UpdateStudent,
} from '../../store/action/adminAction'
import './Addstudent.scss'
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
} from '@ant-design/icons'
import { width } from '@fortawesome/free-solid-svg-icons/fa0'
import Title from 'antd/es/skeleton/Title'

export default function AddStudent() {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const error = useSelector((state) => state.admin?.error || null)
    const studentFromRedux = useSelector((state) => state.admin.students);
    const [students, setStudents] = useState(studentFromRedux);
    const [student, setStudent] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isStudentDetailVisible, setIsStudentDetailVisible] = useState(false)
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false)

    const showUpdateModal = () => {
        setIsUpdateModalVisible(true)
    }

    const showStudentDetail = () => {
        setIsStudentDetailVisible(true)
    }

    const handleStudentDetailCancel = () => {
        setIsStudentDetailVisible(false)
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleUpdateModalCancel = () => {
        setIsUpdateModalVisible(false)
    }
    const handleDelete = async (studentId) => {
        try {
            await dispatch(deleteStudent(studentId))
            setStudents((prevStudents) =>
                prevStudents.filter((student) => student._id !== studentId),
            )
            message.success('Student deleted successfully!')
        } catch (error) {
            message.error(error.message || 'An error occurred while deleting.')
        }
    }

    const handleUpdate = async (record) => {
        form.setFieldsValue(record)
        showUpdateModal()
    }

    const handleViewProfile = (studentId) => {
        dispatch(fetchStudentProfile(studentId)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                setStudent(result.payload)
                showStudentDetail()
            } else {
                message.error('Failed to fetch student profile.')
            }
        })
    }

    const onFinishUpdate = async (values) => {
        setLoading(true);
        try {
            const updatedStudent = await dispatch(
                UpdateStudent({ studentData: values })
            ).unwrap();
            
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student._id === updatedStudent._id ? updatedStudent : student
                )
            );
            
            message.success('Student updated successfully!');
            handleUpdateModalCancel();
        } catch (error) {
            message.error(
                error.message || 'An error occurred while updating the student.'
            );
        } finally {
            setLoading(false);
        }
    };
    
    const onFinish = async (values) => {
        setLoading(true)
        try {
            await dispatch(addStudent(values))        
            message.success('Student added successfully!')
            form.resetFields()
            handleCancel()
        } catch (error) {
            message.error(error.message || 'An error occurred.')
        } finally {
            setLoading(false)
        }
    }

    const onReset = () => {
        form.resetFields()
    }

    useEffect(() => {
        dispatch(fetchStudents())
    }, [dispatch])

    useEffect(() => {
        setStudents(studentFromRedux);
    }, [studentFromRedux]);

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
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
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
                        <Button
                            icon={<EyeOutlined />}
                            onClick={() => handleViewProfile(record.studentId)}
                            type="link"
                            size="small"
                        />
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
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => handleUpdate(record)}
                            type="link"
                            size="small"
                            style={{ color: 'green' }}
                        />
                    </>
                )
            },
        },
    ]

    return (
        <Row
            className="add-student-container"
            style={{ minHeight: '100vh', width: '100%' }}
        >
            <Col span={16} offset={1}>
                <Typography.Title level={2} className="title">
                    Student Management
                </Typography.Title>
                <Button
                    type="primary"
                    onClick={showModal}
                    className="create-student-button"
                >
                    Create Student
                </Button>
                <br />
                <Table
                    columns={columns}
                    dataSource={students}
                    loading={loading}
                    rowKey="studentId"
                />
                <Modal
                    title={`Student Details: ${student?.firstName} ${student?.lastName}`}
                    open={isStudentDetailVisible}
                    onCancel={handleStudentDetailCancel}
                    footer={null}
                    width={800}
                >
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Student ID">
                            {student.studentId}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {student.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="First Name">
                            {student.firstName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Last Name">
                            {student.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">
                            {student.dateOfBirth}
                        </Descriptions.Item>
                        <Descriptions.Item label="Parent Name">
                            {student.parentName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            {student.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address">
                            {student.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Parent Email">
                            {student.parentEmail}
                        </Descriptions.Item>
                        <Descriptions.Item label="Parent Phone">
                            {student.parentPhone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Parent Address">
                            {student.parentAddress}
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment">
                            {student.payment}
                        </Descriptions.Item>
                        <Descriptions.Item label="Teachers">
                            {student.studentTeacher &&
                            student.studentTeacher.length > 0
                                ? student.studentTeacher
                                      .map((teacher) => teacher.name)
                                      .join(', ')
                                : 'No Teachers Assigned'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Classes">
                            {student.classes && student.classes.length > 0
                                ? student.classes.map((classItem) => (
                                      <div key={classItem.classId}>
                                          <strong>Class ID:</strong>{' '}
                                          {classItem.classId}
                                          <br />
                                          <strong>Class Name:</strong>{' '}
                                          {classItem.className}
                                          <br />
                                          <strong>Year:</strong>{' '}
                                          {classItem.year}
                                          <br />
                                          <strong>Grade:</strong>{' '}
                                          {classItem.grade}
                                      </div>
                                  ))
                                : 'No Classes Assigned'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Deleted">
                            {student.isDelete ? 'Yes' : 'No'}
                        </Descriptions.Item>
                    </Descriptions>
                </Modal>

                <Modal
                    title="Add Student"
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    className="add-student-modal"
                    width={800}
                >
                    <Form
                        form={form}
                        name="addStudent"
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
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter first name" />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter last name" />
                        </Form.Item>
                        <Form.Item
                            label="Date of Birth"
                            name="dateOfBirth"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your date of birth!',
                                },
                            ]}
                        >
                            <Input type="date" />
                        </Form.Item>
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
                                    message: 'Please enter a valid email!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>

                        <Typography.Title level={4}>
                            Parent Information
                        </Typography.Title>
                        <Divider />
                        <Form.Item
                            label="Parent Name"
                            name="parentName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the parent name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter parent name" />
                        </Form.Item>
                        <Form.Item
                            label="Parent Email"
                            name="parentEmail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the parent email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter parent email" />
                        </Form.Item>
                        <Form.Item
                            label="Parent Phone"
                            name="parentPhone"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input the parent phone number!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter parent phone" />
                        </Form.Item>
                        <Form.Item
                            label="Parent Address"
                            name="parentAddress"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the parent address!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter parent address" />
                        </Form.Item>

                        <Typography.Title level={4}>
                            Additional Information
                        </Typography.Title>
                        <Divider />
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your phone number" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your address" />
                        </Form.Item>
                        <Form.Item
                            label="Payment"
                            name="payment"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input the payment information!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter payment information" />
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

                <Modal
                    title="Update Student"
                    open={isUpdateModalVisible}
                    onCancel={handleUpdateModalCancel}
                    footer={null}
                    width={800}
                >
                    <Form
                        form={form}
                        name="updateStudent"
                        layout="vertical"
                        onFinish={onFinishUpdate}
                        autoComplete="off"
                    >
                        <Typography.Title level={4}>
                            Personal Information
                        </Typography.Title>
                        <Divider />

                        <Form.Item name="_id" noStyle>
                            <Input type="hidden" />
                        </Form.Item>

                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter first name" />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter last name" />
                        </Form.Item>
                        <Form.Item
                            label="Date of Birth"
                            name="dateOfBirth"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your date of birth!',
                                },
                            ]}
                        >
                            <Input type="date" />
                        </Form.Item>
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
                                    message: 'Please enter a valid email!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>

                        <Typography.Title level={4}>
                            Parent Information
                        </Typography.Title>
                        <Divider />
                        <Form.Item
                            label="Parent Name"
                            name="parentName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the parent name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter parent name" />
                        </Form.Item>
                        <Form.Item
                            label="Parent Email"
                            name="parentEmail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the parent email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter parent email" />
                        </Form.Item>
                        <Form.Item
                            label="Parent Phone"
                            name="parentPhone"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input the parent phone number!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter parent phone" />
                        </Form.Item>
                        <Form.Item
                            label="Parent Address"
                            name="parentAddress"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the parent address!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter parent address" />
                        </Form.Item>

                        <Typography.Title level={4}>
                            Additional Information
                        </Typography.Title>
                        <Divider />
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your phone number" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your address" />
                        </Form.Item>
                        <Form.Item
                            label="Payment"
                            name="payment"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input the payment information!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter payment information" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{ marginRight: '10px' }}
                            >
                                Update
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
            </Col>
        </Row>
    )
}
