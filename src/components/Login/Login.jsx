import React from 'react'
import "./Login.css"
import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <div className='login-container'>
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
      marginLeft:-90
      
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item

 label="Username"
      name="username"
      
      rules={[
        {
          required: true,
          message: 'Please input your username!',
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
      <Button type='primary' style={{width:'100%'}} htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
</div>
    </div>
    </div>
  )
}

export default Login
