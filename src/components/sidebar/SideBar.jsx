import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import akademicLogo from '../../assets/A.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Sidebar.scss';
import {
    faCalendarDays,
    faChalkboardUser,
    faHeart,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../store/features/adminSlice';

const { Text } = Typography;

export default function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState('1');
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutAdmin());
        navigate('/'); 
    };

    const items = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Dashboard',
            path: '/default',
        },
        {
            key: '2',
            icon: <UserOutlined />,
            label: 'Student',
            path: '/default/student',
        },
        {
            key: '3',
            icon: <FontAwesomeIcon icon={faChalkboardUser} />,
            label: 'Teacher',
            path: '/default/teacher',
        },
        {
            key: '4',
            icon: <FontAwesomeIcon icon={faCalendarDays} />,
            label: 'Class',
            path: '/default/class',
        },
        {
            key: '5', 
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            label: 'Logout',
            path: '',
        },
    ];

    useEffect(() => {
        const currentItem = items.find(
            (item) => item.path === location.pathname,
        );
        if (currentItem) {
            setSelectedKey(currentItem.key);
        }
    }, [location.pathname]);

    const handleMenuClick = (e) => {
        if (e.key === '5') { // Handle logout
            handleLogout();
            return;
        }
        setSelectedKey(e.key);
        const item = items.find((item) => item.key === e.key);
        if (item && item.path && item.path !== window.location.pathname) {
            navigate(item.path);
        }
    };

    return (
        <Sider trigger={null} width={300} className="slide-bar-container">
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            iconSize: 20,
                            itemColor: '#C1BBEB',
                            itemSelectedColor: '#4D44B5',
                            itemHoverColor: '#4D44B5',
                            itemBg: '#4D44B5',
                            itemSelectedBg: 'white',
                            itemHoverBg: 'white',
                            itemMarginInline: '10px 0px',
                            itemMarginBlock: '10px 0',
                            itemBorderRadius: '90px 0px 0px 90px',
                        },
                    },
                }}
            >
                <div className="logo">
                    <img
                        src={akademicLogo}
                        alt="Akademic Logo"
                        style={{ height: '40px', borderRadius: '10px' }}
                    />
                    <span
                        style={{
                            marginLeft: '10px',
                            fontSize: '24px',
                            fontWeight: 800,
                        }}
                    >
                        Akademic
                    </span>
                </div>
                <br />
                <Menu
                    mode="inline"
                    items={items}
                    className="menu-style"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                />
            </ConfigProvider>
            <div className="menu-footer">
                <Text style={{ color: 'white', fontWeight: '700' }}>
                    Akademi - School Admission Dashboard
                </Text>
                <br />
                <Text style={{ color: 'white' }}>
                    Made with{' '}
                    <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />{' '}
                    by Peterdraw
                </Text>
            </div>
        </Sider>
    );
}
