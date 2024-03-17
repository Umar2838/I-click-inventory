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
import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal } from 'antd';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
} from 'antd';

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
  color:"#000",
  minHeight: 120,
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
  color: '#000',
  backgroundColor: '#E5E5E5',
  borderRadius:10,
  marginBottom:"10px",
  marginRight:"12px",
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

  // view order table

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date/Time', width: 130 },
    { field: 'Name', headerName: 'Customer Name', width: 130 },
    { field: 'phone', headerName: 'Phone.No', width: 130 },

    { field: 'frame', headerName: 'Frame', width: 130 },
    {
      field: 'left',
      headerName: 'Left Eye',
      width: 90,
    },
    {
      field: 'right',
      headerName: 'Right Eye',
      width: 90,
    },
    {
      field: 'payment',
      headerName: 'Payment',
      width: 90,
    },
    
  ];
  
  const rows = [
    { id: 1, date: '01-Dec-24',Name: 'Jon', phone:1234567890, frame:'sunglass',  left: 35,right:10 ,payment:10000},
    { id: 2, date: '01-Dec-24',Name: 'Cersei',phone:1234567890,frame:'sunglass', left: 42,right:10,payment:10000 },
    { id: 3, date: '01-Dec-24',Name: 'Jaime',phone:1234567890,frame:'sunglass', left: 45,right:10,payment:10000 },
    { id: 4, date: '01-Dec-24',Name: 'Arya',phone:1234567890,frame:'sunglass', left: 16,right:10,payment:10000 },
    { id: 5, date: '01-Dec-24',Name: 'Daenerys',phone:1234567890,frame:'sunglass', left: 13 ,right:10,payment:10000 },
    { id: 6, date: '01-Dec-24',Name: 'umar',phone:1234567890,frame:'sunglass', left: 15,right:10,payment:10000 },
    { id: 7, date: '01-Dec-24',Name: 'Ferrara',phone:1234567890,frame:'sunglass', left: 44,right:1 ,payment:10000},
    { id: 8, date: '01-Dec-24',Name: 'Rossini',phone:1234567890,frame:'sunglass', left: 36,right:10,payment:10000 },
    { id: 9, date: '01-Dec-24',Name: 'Harvey',phone:1234567890,frame:'sunglass', left: 65,right:10,payment:10000 },
  ];

  // new order modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  }

// new order form 

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
// const [balance , setBalance] = useState(null)
// const [total,setTotal] = useState(null)
// const [advance,setAdvance] = useState(null)
// setBalance(total - advance);

const onFinish = (values) => {
  console.log('Success:', values);  
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
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
                <div className='header-box' ><GiReceiveMoney size={30} className='icon' color='#5D62B5'/>Total Sell
                <span className='header-data' > Rs-/ 2000</span>
                </div>
                <div className='header-box' ><GiPayMoney size={30} className='icon' color='#5D62B5'/>Today Sell
                <span className='header-data' > Rs-/ 1000</span>
                </div>
                <div className='header-box' ><GiTakeMyMoney size={30} className='icon' color='#5D62B5'/>Profit
                <span className='header-data' > Rs-/ 20000</span>
                </div>
                <div className='header-box' ><GoPeople size={30} className='icon' color='#5D62B5'/> Order
                <span className='header-data' > 229</span>
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
<div className='graph' >
<Bar 
data={{
  labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
  datasets:[
    {
      label:"Orders History",
      data:[1,2,3,4,5,4,3,2,1,7,1,3,6,],
      backgroundColor:"#5D62B5"
    },
  ]
}}
/>
</div>
<div className='graph' >
<Bar 
data={{
  labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
  datasets:[
    {
      label:"Sell History",
      data:[2,3,4,9,3,4,6,4,1,8,2,7],
      backgroundColor:"#5D62B5"
    },
  ]
}}
/>

</div>
  </div>
  : ""
}

{
  activeDiv === "newOrder" ?      
       <div className='order-form' >

       </div>
       : ""
}

{
  activeDiv === "viewOrders" ?      
       <div className='order-form' >
<div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
 
       </div>
       : ""
}

{  activeDiv ==='newOrder' ? 
<>
<div className='order-header' >New Orders</div>
<Button type="primary" className='orderbtn' onClick={showModal}>
        Take order
      </Button>
      <Modal title="Basic Modal"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Customer Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input customer name!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Phone.No"
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input number',
        },
      ]}
    >
      <InputNumber
        style={{
          width: '100%',
        }}
      />
    </Form.Item>

    <Form.Item
      label="Service Type"
      name="type"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
    <Input/>
    </Form.Item>

    <Form.Item
      label="Left Eye "
      name="leye"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Right Eye"
      name="reye"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Total"
      name="total"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <InputNumber   />
    </Form.Item>

    <Form.Item
      label="Advance"
      name="advance"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <InputNumber  />
    </Form.Item>

    <Form.Item
      label="Balance"
      name="balance"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input!',
      //   },
      // ]}
    >
      <InputNumber value={}   readOnly={true} />
    </Form.Item>
    <Form.Item
      label="DatePicker"
      name="DatePicker"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <DatePicker />
    </Form.Item>
    <Form.Item label="Status" name="status">
          <Radio.Group>
            <Radio value="delivered"> Delivered </Radio>
            <Radio value="pending"> Pending </Radio>
          </Radio.Group>
        </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Modal>


</>
: "" 

}
        </Content>
        <Footer style={footerStyle}>copyright© {new Date().getFullYear()} I-Click Optics POS software </Footer>
      </Layout>
    </Layout>
  </Flex>

);
}
export default Layoutstyle;
