import React from 'react';
import { Layout, Flex } from 'antd';
import "./Layout.css"
import { FiLogOut } from "react-icons/fi";
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#000',
  height: 70,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#f5f5f5',
  margin: 10,};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#E5E5E5',
  borderRadius:"18px",
  margin: 10,
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  maxHeigh:"100vh",
  height:"100vh"
};
const Layoutstyle = () => (
  <Flex gap="middle" wrap="wrap">
    <Layout style={layoutStyle}>
      <Sider width="12%" style={siderStyle}>
    Slider
      </Sider>
      <Layout>
        <Header style={headerStyle}>
            <div className='header-wrapper' >
                <div className='header-box' ></div>
                <div className='header-box' ></div>
                <div className='header-box' ></div>
                <div className='header-box' ></div>
            <button className='logout-btn' ><FiLogOut size={30} className='logout-icon' /> <span className='logout-text'>Logout</span></button>
            </div>
        </Header>
        <Content style={contentStyle}>Content</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  </Flex>
);
export default Layoutstyle;
