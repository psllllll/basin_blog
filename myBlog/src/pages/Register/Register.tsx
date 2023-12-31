import './Register.less'
import { Button, Input, message } from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    PaperClipOutlined,
    UserOutlined,
    MailOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import LogoUrl from "../../assets/logo.png"
import apis from "../../network/apis";
import { checkEmail } from "../../utils/CheckEmails"
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header"
const Register: React.FC = function () {
    const RegisterInfo = {
        username: '',
        password: '',
        email: ''
    }
    const [form, setForm] = useState(RegisterInfo);
    const handleChange = async (e: any) => {
        await setForm({ ...form, [e.target.name]: e.target.value });
    }
    //用户注册函数
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const RegisterMethod = async () => {
        if (form.email == '' || form.password == '' || form.username == '') {
            messageApi.info({
                type: 'error',
                content: '请输入所有选型！',
            });
        }
        else {
            //邮箱合法性校验
            if (checkEmail(form.email)) {

                const user = await apis.Register(form);
                
                messageApi.info('注册成功，请登录');
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            }
            else {
                messageApi.info({
                    type: 'error',
                    content: '请输入正确的邮箱后重新提交！',
                });
            }
        }
    }

    const toLogin = () => {
        navigate("/login")
    }
    return (
        <div className="register_father">
            <Header></Header>
            <div className="register-content flex-center margin-center">
                {contextHolder}
                <div className="register-box">
                    <img className="logo" src={LogoUrl} alt="logo" />
                    <div className="input-content">
                        <Input maxLength={20} size="large" placeholder="用户名" prefix={<UserOutlined />} name="username" value={form.username} onChange={handleChange} />
                        <Input maxLength={30}
                            style={{ marginTop: "20px" }}
                            size="large" placeholder="邮箱"
                            prefix={<MailOutlined />} name="email"
                            value={form.email}
                            onChange={handleChange}

                        />
                        <Input.Password
                            style={{ marginTop: "20px" }}
                            size="large"
                            prefix={<PaperClipOutlined />}
                            placeholder="密码"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            name="password" value={form.password} onChange={handleChange}
                            maxLength={250}
                        />
                    </div>
                    <Button onClick={RegisterMethod} className="register-button" type="primary" size="large">注册</Button>
                    <div onClick={toLogin} className="tips">已有账号点此登录</div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(Register);
