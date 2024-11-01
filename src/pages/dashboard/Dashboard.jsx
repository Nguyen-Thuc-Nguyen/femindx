import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, Row, Col } from 'antd';

const data = [
  { name: 'Class A', students: 24 },
  { name: 'Class B', students: 30 },
  { name: 'Class C', students: 18 },
];

// Sample statistics data
const totalStudents = 72; // This would typically come from your API
const totalClasses = 3; // Example value
const totalTeachers = 5; // Example value

// Sample enrollment trend data
const enrollmentData = [
  { month: 'January', enrollments: 30 },
  { month: 'February', enrollments: 40 },
  { month: 'March', enrollments: 50 },
  { month: 'April', enrollments: 60 },
];

// Sample class distribution data
const classDistributionData = [
  { name: 'Class A', value: 40 },
  { name: 'Class B', value: 30 },
  { name: 'Class C', value: 30 },
];

export default function Dashboard() {
  return (
    <div style={{ padding: '24px', background: '#fff' }}>
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card title="Total Students" bordered={false}>
            <h2>{totalStudents}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Classes" bordered={false}>
            <h2>{totalClasses}</h2>
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
        <Col span={12}>
          <h4>Enrollment Trends</h4>
          <LineChart width={600} height={300} data={enrollmentData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="enrollments" stroke="#8884d8" />
          </LineChart>
        </Col>
        <Col span={12}>
          <h4>Class Distribution</h4>
          <PieChart width={600} height={300}>
            <Pie
              data={classDistributionData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {classDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '40px' }}>
        <Col span={12}>
          <h4>Bar Chart</h4>
          <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#82ca9d" />
          </BarChart>
        </Col>
        <Col span={12}>
          <h4>Line Chart</h4>
          <LineChart width={600} height={300} data={data}>
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
