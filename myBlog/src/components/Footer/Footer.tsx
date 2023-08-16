import "./Footer.less"
import { Button } from 'antd';
import { YuqueOutlined,WechatOutlined,GithubOutlined,QqOutlined,PhoneOutlined } from '@ant-design/icons';
import ProgramImg from '../assets/home/footer.gif'
import feidianLogo from '../assets/logo.png'
import WechatImg from '../assets/home/wechat.jpg'

const Footer:React.FC = function () {
    return (
        <div className="footer_container">
            <div className="footer_content">
                <div className="footer_content_right">
                    <div className="footer_right_line1">沸腾的心，飞扬的梦</div>
                    <div className="footer_right_line2">点滴积累，共码未来!</div>
                    <a href="#">
                        <Button type="primary">Contact me</Button>
                    </a>
                </div>
                <div className="footer_content_left">
                    <img src={ProgramImg} alt="" />
                </div>
            </div>
            <footer className="footer_page">
                <div className="footer_page_inner">
                    <div className="footer_page_inner_container">
                        <ul className="footerText">
                            <li className="footerTextLi">YUQUE ：盆子盆</li>
                            <li className="footerTextLi">QQ : 1448071611@qq.com</li>
                            <li className="footerTextLi">GITHUB : psllllll </li>
                            <li className="footerTextLi">WECHAT : PSL12SL</li>
                            <li className="footerTextLi">PHONE : 18711253640</li>
                        </ul>
                    </div>
                </div>
                <div className="footer_inner">
                    <div className="line">

                    </div>
                    <div className="footer_inner_icon">
                        <ul className="iconList">
                            <li className="circle circle1"><YuqueOutlined /></li>
                            <li className="circle circle2"><WechatOutlined /></li>
                            <li className="circle circle3"><GithubOutlined /></li>
                            <li className="circle circle4"><QqOutlined /></li>
                            <li className="circle circle5"><PhoneOutlined /></li>
                        </ul>
                    </div>
                    <div className="footer_inner_context">
                        <p>COPYRIGHT © 2023</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer;