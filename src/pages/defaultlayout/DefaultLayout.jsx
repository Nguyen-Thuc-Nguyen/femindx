import { Layout } from "antd";


export default function DefaultLayout() {
    return (
        <Layout style={{ overflowX: 'hidden' }}>
                <SideBar collapsed={collapsed} />
                <Layout style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <Layout
                        style={{
                            backgroundColor: '#F7F7F7',
                            overflowX: 'hidden',
                        }}
                    >
                        <Outlet />
                        <Footer />
                    </Layout>
                </Layout>
            </Layout>
    )
}
