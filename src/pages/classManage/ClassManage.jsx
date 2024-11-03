import { Button, Col, Input, Modal, Popover, Row, Select, Table, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addClass, deleteClass, fetchClasses, fetchTeacherProfile, fetchTeachers } from '../../store/action/adminAction'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Option } from 'antd/es/mentions'

export default function ClassManage() {
    const dispatch = useDispatch()
    const classFromRedux = useSelector((state) => state.admin.classes) || [];
    const [classes, setClasses] = useState(classFromRedux);
    const [teacherProfiles, setTeacherProfiles] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [listOfTeacher, setListOfTeacher] = useState([])
    const [className, setClassName] = useState(null)
    const [selectedTeacher, setSelectTeacher] = useState(null)
    const teacherFromRedux = useSelector((state) => state.admin.teachers)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }
    const handleCreateClass = async (className, selectedTeacher) => {
        if (className && selectedTeacher) {
            setLoading(true);
            try {
                const newClass = await dispatch(addClass({ className, teacher: selectedTeacher }));
                setClasses(prevClasses => [...prevClasses, newClass]);

                setClassName(null);
                setIsModalVisible(false);
            } catch (err) {
                setError('Failed to add class. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Please fill in all fields.');
        }
    };


    const handleDelete = (classId) => {
        if (classId) {
            dispatch(deleteClass(classId)).then(() => {
                setClasses(prevClasses => prevClasses.filter(cls => cls._id !== classId));
            });
        }
    };


    useEffect(() => {
        setClasses(classFromRedux);
        const fetchProfiles = async () => {
            const profiles = {};
            for (const classItem of classFromRedux) {
                if (classItem.teacher) {
                    const profile = await dispatch(fetchTeacherProfile(classItem.teacher));
                    profiles[classItem.teacher] = profile.payload;
                }
            }
            setTeacherProfiles(profiles);
        };

        if (classFromRedux.length > 0) {
            fetchProfiles();
        }
    }, [classFromRedux, dispatch]);

  

    const columns = [
        {
            title: 'Class Name',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
            render: (teacherId) => {
                const teacher = teacherProfiles[teacherId];
                return teacher ? <Tag color="blue">{teacher.firstName} {teacher.lastName}</Tag> : <Tag color="gray">Loading...</Tag>;
            },
        },
        {
            title: 'Number of Students',
            dataIndex: 'students',
            key: 'students',
            render: (students) => (
                <span>{Array.isArray(students) ? students.length : 0}</span>
            )
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
    ];
    useEffect(() => {
        dispatch(fetchTeachers())
    }, [dispatch])

    useEffect(() => {
        setListOfTeacher(teacherFromRedux)
    }, [teacherFromRedux])

    useEffect(() => {
        dispatch(fetchClasses())
    }, [dispatch])

    console.log(classes)

    return (
        <Row
            className="add-student-container"
            style={{ minHeight: '100vh', width: '100%' }}
        >
            <Modal
                title="Add Class"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleCreateClass}
                footer={null}
                className="add-class-modal"
                width={500}
            >
                <div className="modal-content">
                    <Input
                        placeholder="Class Name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <Select
                        placeholder="Select Teacher"
                        value={selectedTeacher}
                        onChange={(value) => setSelectTeacher(value)}
                        style={{ width: '100%', marginBottom: '20px' }}
                    >
                        {listOfTeacher.map((teacher) => (
                            <Option key={teacher._id} value={teacher._id}>
                                {teacher.firstName} {teacher.lastName}
                            </Option>
                        ))}
                    </Select>
                    <Button
                        type="primary"
                        onClick={() => handleCreateClass(className, selectedTeacher)}
                        loading={loading}
                        style={{ width: '100%' }}
                    >
                        Add Class
                    </Button>
                    {error && <Typography.Text type="danger">{error}</Typography.Text>}
                </div>
            </Modal>
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
                <Table
                    columns={columns}
                    dataSource={classes}
                    rowKey="_id"
                    pagination={{ pageSize: 8 }}

                />
            </Col>
        </Row>
    )
}
