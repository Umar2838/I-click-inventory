import React, {useState,useRef,useEffect} from 'react';
import { Layout, Flex } from 'antd';
import "./Layout.css"
import { FiLogOut } from "react-icons/fi";
import { collection,addDoc,db,serverTimestamp,getDocs,query, where,Timestamp ,updateDoc , doc} from '../Firebase/Firebase';
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const { Header, Footer, Sider, Content } = Layout;
import {useNavigate} from "react-router-dom"
import {auth, signOut } from '../Firebase/Firebase';
import { GiPayMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoStatsChartSharp } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { FaDatabase, FaEye } from "react-icons/fa";
import {Bar} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal } from 'antd';
import {
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
  const [totalPrice,setTotalPrice] = useState(null)
  const [currentPrice,setcurrentPrice] = useState(null)
  const [activeDiv, setActiveDiv] = useState('stats');
  const formRef = useRef();
  const handleDivClick = (divName) => {
    setActiveDiv(divName);
  };
  
  
  // view delivered order table
  const [rows,setRows] = useState(false)
  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "new order"), where("status", "==", "delivered"));

      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        orders.push({
          id: doc.id,
          date: order.timestamp.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          Name: order.customername,
          phone: order.phone,
          frame: order.serviceType,
          left: order.leye,
          right: order.reye,
          payment: order.total,
          status:order.status
        });
      });
      setRows(orders);
    };

    fetchOrders();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date/Time', width: 130 },
    { field: 'Name', headerName: 'Customer Name', width: 130 },
    { field: 'phone', headerName: 'Phone.No', width: 130 },
    { field: 'frame', headerName: 'Frame', width: 130 },
    { field: 'left', headerName: 'Left Eye', width: 90 },
    { field: 'right', headerName: 'Right Eye', width: 90 },
    { field: 'payment', headerName: 'Payment', width: 90 },
    { field: 'status', headerName: 'Status', width: 90 },

  ];
  
  
  // view pending order table
  const [pendingrows, setPendingRows] = useState([]);

  const fetchOrders = async () => {
    const q = query(collection(db, "new order"), where("status", "==", "pending"));

    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      orders.push({
        id: doc.id,
        date: order.timestamp.toDate().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        Name: order.customername,
        phone: order.phone,
        frame: order.serviceType,
        left: order.leye,
        right: order.reye,
        payment: order.total,
        status: order.status
      });
    });
    setPendingRows(orders);
  };

  useEffect(() => {
    fetchOrders();
  
    const handleStatusChange = async (params) => {
      const { id, value } = params;
      
      // Update status in the database
      const orderRef = doc(db, "new order", id);
      await updateDoc(orderRef, {
        status: "delivered"
      });
  
      // Update status in the state
      const updatedRows = pendingrows.map(row => {
        if (row.id === id) {
          return { ...row, status: "delivered" };
        }
        return row;
      });
  
      setPendingRows(updatedRows);
    };
  
  
  }, []);

  
  const pendingcolumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date/Time', width: 130 },
    { field: 'Name', headerName: 'Customer Name', width: 130 },
    { field: 'phone', headerName: 'Phone.No', width: 130 },
    { field: 'frame', headerName: 'Frame', width: 130 },
    { field: 'left', headerName: 'Left Eye', width: 90 },
    { field: 'right', headerName: 'Right Eye', width: 90 },
    { field: 'payment', headerName: 'Payment', width: 90 },
    { field: 'status', headerName: 'Status', editable:true, width: 90 },

  ];

  // new order modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    formRef.current.resetFields(); 
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    formRef.current.resetFields(); 
  }

// new order form 
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
const onFinish = async(values) => {
  const date = new Date();
  console.log('Success:',values);
  const docRef = await addDoc(collection(db, "new order"),{
    customername: values.name,
    phone:values.phone,
    serviceType: values.type,
    leye:values.leye,
    reye:values.reye,
    total:values.total,
    advance:values.advance,
    balance:values.balance,
    timestamp: serverTimestamp(),
    status:values.status
  });
  console.log("Document written with ID: ", docRef.id);
  toast.success("Customer order placed", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


// Header data
const fetchAllPrices = async () => {
  const ordersRef = collection(db, 'new order'); 

  try {
    const querySnapshot = await getDocs(ordersRef);
    const prices = [];

    querySnapshot.forEach((doc) => {
      const price = doc.data().total; // Assuming 'payment' is the field representing the price
      prices.push(price + price);
    });

    return prices ;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return []; // Return an empty array or handle the error as needed
  }
};



// Usage
fetchAllPrices()
  .then((prices) => {
    setTotalPrice(prices[0])
    console.log('All prices:', totalPrice);
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  const fetchTotalPriceForCurrentDay = async () => {
    // Get the current date and time as a Firestore Timestamp
    const currentTimestamp = Timestamp.now();
    // console.log(currentTimestamp.oDate)
    const ordersRef = collection(db, 'new order'); // Replace 'new order' with your actual collection name
  
    // Create a query to filter documents where the 'timestamp' field matches the current timestamp
    const q = query(ordersRef, where('timestamp', '==', currentTimestamp.toDate()));
  
    try {
      const querySnapshot = await getDocs(q);
      let totalPrice = 0;
  
      querySnapshot.forEach((doc) => {
        const price = doc.data().total;
        totalPrice += price; // Accumulate the total price
      });
  
      return totalPrice;
    } catch (error) {
      console.error('Error fetching prices for current day:', error);
      return 0; // Return 0 or handle the error as needed
    }
  };
  
  // Usage
  fetchTotalPriceForCurrentDay()
    .then((totalPrice) => {
      console.log('Total price for current day:', totalPrice);
      // Do something with the total price
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
                <span className='header-data' > Rs-/ {totalPrice}</span>
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
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<ToastContainer />
<Button type="primary" className='orderbtn' onClick={showModal}>
        Take order
      </Button>
      <Modal title="Order Form"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
    {...formItemLayout}
    ref={formRef}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="on"
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
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <InputNumber/>
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
        Confirm Order
      </Button>
    </Form.Item>
  </Form>
      </Modal>
      <div className='order-form' >
<div style={{ height: 400, width: '100%' }}>
<DataGrid
          rows={pendingrows}
          columns={pendingcolumns}
          onEditCellChange={(params) => handleStatusChange(params)}
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
