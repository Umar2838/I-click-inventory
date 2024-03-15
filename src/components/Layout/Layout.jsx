import React, {useState} from 'react';
import { Layout, Flex } from 'antd';
import "./Layout.css"
import { FiLogOut } from "react-icons/fi";
const { Header, Footer, Sider, Content } = Layout;
import {useNavigate} from "react-router-dom"
import {auth, signOut } from '../Firebase/Firebase';
import { GiPayMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoStatsChartSharp } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";


const headerStyle = {
  textAlign: 'center',
  color: '#000',
  height: 70,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#f5f5f5',
  margin:10,
  
  };
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#f5f5f5'
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '50px',
  color: '#000',
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

const Layoutstyle = () => {
  const navigate = useNavigate()
  const [activeDiv, setActiveDiv] = useState('stats');

  const handleDivClick = (divName) => {
    setActiveDiv(divName);
  };
  return(

    <Flex gap="middle" wrap="wrap">
    <Layout style={layoutStyle}>
    <Sider width="12%" style={siderStyle}>
      <div className='slider' >
        <div
          style={{ backgroundColor: activeDiv === 'stats' ? "#5D62B5" : "", color: activeDiv === 'stats' ? "#fff" : "" }}
          onClick={() => handleDivClick('stats')}
        >
          <IoStatsChartSharp /> Stats
        </div>
        <div
          style={{ backgroundColor: activeDiv === 'newOrder' ? "#5D62B5" : "", color: activeDiv === 'newOrder' ? "#fff" : "" }}
          onClick={() => handleDivClick('newOrder')}
        >
          <IoMdAddCircle size={20} style={{ position: 'absolute', top: 84, left: 17 }} /> New Order
        </div>
        <div
          style={{ backgroundColor: activeDiv === 'viewOrders' ? "#5D62B5" : "", color: activeDiv === 'viewOrders' ? "#fff" : "" }}
          onClick={() => handleDivClick('viewOrders')}
        >
          <FaEye size={18} style={{ position: 'absolute', top: 145, left: 17 }} /> View Orders
        </div>
      </div>
    </Sider>
      <Layout>
        <Header style={headerStyle}>
            <div className='header-wrapper' >
                <div className='header-box' ><GiReceiveMoney size={30} className='icon' color='#5D62B5'/>Total Sale
                <span>Rs-/ 2000</span>
                </div>
                <div className='header-box' ><GiPayMoney size={30} className='icon' color='#5D62B5'/>Today Sale
                <span>Rs-/ 1000</span>
                </div>
                <div className='header-box' ><GiTakeMyMoney size={30} className='icon' color='#5D62B5'/>Profit
                <span>Rs-/ 20000</span>
                </div>
                <div className='header-box' ><GoPeople size={30} className='icon' color='#5D62B5'/> Order
                <span>229</span>
                </div>
            <button onClick={()=>{
              signOut(auth).then(() => {
                navigate("/")
                  }).catch((error) => {
                    // An error happened.
                  })
            }} className='logout-btn' ><FiLogOut size={30} className='logout-icon' />Logout</button>
            </div>
        </Header>
        <Content style={contentStyle}>
{
  activeDiv === "stats" ? 
  <div className='stats-content' >
<div>
<ChartContainer
  width={500}
  height={300}
  series={[{ data: uData, label: 'uv', type: 'bar' }]}
  xAxis={[{ scaleType: 'band', data: xLabels }]}
>
  <BarPlot />
</ChartContainer>
</div>
<div></div>
  </div>
  
  : ""
}


        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  </Flex>

);
}
export default Layoutstyle;
