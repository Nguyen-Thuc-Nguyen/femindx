import { useEffect, useState } from 'react';

import { Card, Row, Col } from 'antd';
import axiosInstance from '../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip } from 'recharts';
import { LineChart, Line, XAxis as LineXAxis, YAxis as LineYAxis, Tooltip as LineTooltip } from 'recharts'
import { fetchClasses } from '../../store/action/adminAction';

export default function Dashboard() {
  const dispatch = useDispatch()
  const [totalStudent, setTotalStudent] = useState();
  const [totalClass, setTotalClass] = useState();
  const [totalTeachers, setTotalTeachers] = useState();
  const classFromRedux = useSelector((state) => state.admin.classes) || [];
  const [classes, setClasses] = useState(classFromRedux);


  const classDistributionData = classes.map(classItem => ({
    className: classItem.className,
    studentCount: classItem.students.length,
  }));
  const pieData = classDistributionData.map(classData => ({
    name: classData.className,
    value: classData.studentCount,
  }));

  const barData = classDistributionData.map(classData => ({
    name: classData.className,
    students: classData.studentCount,
  }));

  console.log(pieData)

  useEffect(() => {
    setClasses(classFromRedux);
  }, [classFromRedux])






  useEffect(() => {
    const fetchTotalTeachers = async () => {
      try {
        const response = await axiosInstance.get('/admin/total-teachers')
        setTotalTeachers(response.data.totalTeachers);
      } catch (error) {
        console.error("Error fetching total teachers:", error);
      }
    };

    fetchTotalTeachers();
  }, []);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await axiosInstance.get('/admin/total-students')
        setTotalStudent(response.data.totalStudents);
      } catch (error) {
        console.error("Error fetching total students:", error);
      }
    };

    fetchTotalStudents();
  }, []);


  useEffect(() => {
    const fetchTotalClasses = async () => {
      try {
        const response = await axiosInstance.get('/admin/total-classes')
        setTotalClass(response.data.totalClasses);
      } catch (error) {
        console.error("Error fetching total students:", error);
      }
    };

    fetchTotalClasses();
  }, []);

  useEffect(() => {
    dispatch(fetchClasses())
  }, [dispatch])


  return (
    <div style={{ padding: '24px', background: '#fff' }}>
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card title="Total Students" bordered={false}>
            <h2>{totalStudent}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Classes" bordered={false}>
            <h2>{totalClass}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Teachers" bordered={false}>
            <h2>{totalTeachers}</h2>
          </Card>
        </Col>
      </Row>

      <h3>Charts Overview</h3>
      <Row gutter={16}>

        <Col span={24}>
          <h4>Class Distribution</h4>
          <PieChart width={600} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Col>
        <Col span={24}>
          <h4>Bar Chart</h4>
          <BarChart width={600} height={300} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="students" fill="#82ca9d" />
            <BarTooltip />
          </BarChart>
        </Col>
        <Col span={24}>
          <h4>Line Chart</h4>
          <LineChart width={600} height={300} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="students" stroke="#ffc658" />
          </LineChart>
        </Col>
      </Row>
    </div>
  );
}
