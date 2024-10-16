import { Layout } from 'antd';
import SideBar from '../../components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export default function DefaultLayout() {
    return (
        <Layout style={{ height: '100vh', width: '100vw', overflowX: 'hidden' }}>
            <SideBar />
            <Layout style={{ maxHeight: '100vh', overflowY: 'auto',backgroundColor:'#F3F4FF' }}>
                <Content style={{ padding: '20px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
