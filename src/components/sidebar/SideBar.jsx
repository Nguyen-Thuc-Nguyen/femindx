
export default function SideBar() {
  return (
    <Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
    width={220}
    collapsedWidth={60}
    style={{
        background: colorBgContainer,
    }}
    className="slide-bar-container"
>
    <ConfigProvider
        theme={{
            components: {
                Menu: {
                    itemColor: 'black',
                    itemSelectedColor: '#ed2a26',
                    itemSelectedBg: '#FFECEC',
                    iconSize: 20,
                    itemHoverBg: '#FFECEC',
                },
            },
        }}
    >
        <Menu
            mode="inline"
            theme="light"
            items={items.map((item) => ({
                ...item,
                className: item.className || '',
            }))}
            className="menu-style"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
        />
    </ConfigProvider>
</Sider>
  )
}
