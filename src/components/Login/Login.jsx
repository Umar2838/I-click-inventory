import React,{useState} from 'react'
import "./Login.css"
import { Button, Form, Input } from 'antd';
import { app, auth, signInWithEmailAndPassword } from "../Firebase/Firebase"
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate()
  const [loader,setLoder] = useState(false)


  const onFinish = (values) => {
    setLoder(true)
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setLoder(false)
        console.log(user)
        navigate("/inventory")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoder(false)
        console.log(errorMessage)
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
         
          });
  
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login-container'>
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
theme="dark"
/>
      <div className='wrapper' >
        <div className='brand-div' >
          <h1>I-Click Inventory</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque dicta libero molestiae consequatur amet nesciunt nemo saepe cupiditate facere rerum et nostrum, velit dolore vel placeat eum qui quo deserunt? Officiis possimus debitis iure ducimus facilis esse, placeat illo vel qui magni, eum, amet molestiae illum aliquam fugit impedit rem? Nobis aperiam nihil quaerat illum modi labore iste ab suscipit qui unde quo necessitatibus non vero laudantium eius, tempore quidem sint reiciendis commodi ipsa nulla eum natus earum ex. Ad quis deserunt amet temporibus repudiandae adipisci rem harum dignissimos, cupiditate ut. Sit ullam assumenda tenetur odio totam? Praesentium, error. Velit!</p>
        </div>
        <div className='form-div' >
          <h2>Login</h2>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
              
            }}
            style={{
              maxWidth: 600,
              paddingTop: 30,
              marginLeft: -90,
    
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item

              label="Email"
              name="email"

              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type='primary' style={{ width: '100%' ,backgroundColor:"#5458a7",color:"#fff",border:"none",fontFamily:'Gill Sans',
 }} htmlType="submit">
                {loader ?<HashLoader color='#fff' size={20} />  : "Login" }
              </Button>
        
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
