import React from "react";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import BlogCard from '../../components/blogCard/blogCard';
import Banner1 from "../../components/assets/home/banner1.jpg"
import Banner2 from "../../components/assets/home/banner2.jpg"
import "./Single.less"
import {DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Button } from 'antd'

const parentData = [
    {
        id: 1,
        title: '博客1',
        description: '第一个博客',
        imgsrc: Banner1,
    },
    {
        id: 2,
        title: '博客2',
        description: '第二个博客',
        imgsrc: Banner2,
    },
    {
        id: 1,
        title: '博客1',
        description: '第一个博客',
        imgsrc: Banner1,
    },
    {
        id: 2,
        title: '博客2',
        description: '第二个博客',
        imgsrc: Banner2,
    },
    {
        id: 2,
        title: '博客2',
        description: '第二个博客',
        imgsrc: Banner2,
    },
    {
        id: 1,
        title: '博客1',
        description: '第一个博客',
        imgsrc: Banner1,
    },
    {
        id: 2,
        title: '博客2',
        description: '第二个博客',
        imgsrc: Banner2,
    },

];

const Single: React.FC = function () {
    const navigate = useNavigate();
    const goEdit = () =>{
        navigate("/write?edit=2");
    }
    return (
        <div className="singleFather">
            <Header></Header>
            <div className="single_container">
                <div className="single_article">
                    <div className="article_img">
                        <img src={Banner1} alt="" />
                    </div>
                    <div className="article_title">
                        <h1>存储篇 —— 浏览器缓存与本地存储</h1>
                    </div>
                    <div className="article_button">
                        <Button onClick={goEdit} size="large" type="primary"><EditOutlined /></Button>
                        <Button size="large" danger><DeleteOutlined /></Button>
                    </div>
                    <div className="article_content">
                        浏览器缓存机制介绍与缓存策略剖析\n
                        缓存可以减少网络IO消耗，提高访问速度
                        浏览器缓存四个方面：
                        1. Memory Cache
                        2. Service Worker Cache
                        3. HTTP cache
                        4. Push Cache
                        浏览器缓存优点：
                        1. 减少了冗余的数据传输，节省了网费
                        2. 减少服务器负担，提升网站性能
                        3. 加快客户端加载网页速度
                        HTTP缓存机制
                        ● 强缓存
                        ● 协商缓存
                        优先级较高的是强缓存，在命中缓存失败的情况下，才会协商缓存
                        两者共同点：都是从客户端缓存中读取资源；区别是强缓存不会发起你去，协商缓存会发请求
                        强缓存
                        特征
                        不会像浏览器发送请求，直接从缓存中读取资源，该请求返回200的状态码
                        强缓存的实现
                        强制缓存中header的参数（响应头）：
                        ● Espires：response header里的过期时间
                        ● Cache-Control：当max-age=300时，命中强缓存
                        Cache-Control和max-age配置项相对于expires的优先级更高，当Control与expires同时出现时，以Cache-Control为准

                        Cache-Control应用分析
                        Cache-Control是HTTP头部中的一个字段，用于控制缓存的行为，帮助优化网站性能和资源加载速度。它可以在服务器响应中设置，也可以在浏览器请求中设置。Cache-Control主要用于定义缓存的存储策略、过期时间和重新验证等。
                        以下是Cache-Control中常见的一些指令及其应用分析：
                        1. public: 响应可以被任何CDN等中间缓存（如代理服务器）缓存。
                        ○ 适用于公共资源，如图片、样式表、脚本等，因为这些资源通常对所有用户都是一致的。
                        2. private: 响应只能被浏览器缓存，不允许中间缓存存储。
                        ○ 适用于个人用户相关的资源，如用户个人信息等。
                        3. no-cache: 缓存需要重新验证，每次都需要向服务器发送请求。即使用本地缓存，使用协商缓存
                        ○ 适用于内容需要经常更新，但仍然希望利用浏览器缓存减少服务器压力。
                        4. no-store: 禁止浏览器缓存数据，响应不应被缓存，每次都需要从服务器重新获取。
                        ○ 适用于敏感信息，如登录凭证，不希望在任何地方存储副本。
                        5. max-age=xxx: 缓存的最大存储时间，以秒为单位。
                        ○ 适用于静态资源，可指定一个时间段内不需要从服务器重新获取资源，提高加载速度。
                        6. s-maxage=xxx: 仅适用于共享缓存（通常是代理服务器），覆盖max-age设置。
                        ○ 可以用于特定的代理服务器缓存策略。
                        7. must-revalidate: 缓存过期后，必须向服务器验证资源是否仍然有效。
                        ○ 适用于需要确保始终使用最新资源的情况。
                        8. proxy-revalidate: 与must-revalidate类似，但仅适用于代理缓存。
                        ○ 可以控制代理服务器在缓存过期后是否重新验证资源。
                        9. immutable: 表示资源不会改变，可以永久缓存。
                        ○ 适用于版本稳定的资源，避免无谓的重新验证。
                        10. no-transform: 不允许代理服务器修改响应内容的格式或类型。
                        ○ 适用于要求原始响应保持不变的情况，如某些图片格式。
                        通过合理配置Cache-Control，可以在提高网站性能的同时，确保用户能够始终获得最新、准确的内容。不同资源可能需要不同的缓存策略，因此根据具体情况进行配置，从而实现更好的用户体验。

                        协商缓存
                        在使用本地缓存之前，需要向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源；协商缓存可以解决强制缓存的情况下。资源不更新的问题
                        协商缓存的实现
                        设置协商缓存：cache-control:-no-cache
                        1. Last-Modified:
                        ○ Last-Modified是一个服务器响应头部字段，表示资源在服务器上的最后修改时间。当客户端发送请求时，它会在请求头部包含一个If-Modified-Since字段，值为之前获取资源时的Last-Modified值。
                        ○ 服务器会将客户端发送的If-Modified-Since值与实际资源的修改时间进行比较。如果资源的最后修改时间晚于If-Modified-Since的值，服务器会返回新的资源；否则，服务器返回一个“304 Not Modified”的响应，客户端会使用缓存中的旧资源。
                        ○ 优点：简单易用，资源修改的时间戳由服务器维护。
                        ○ 缺点：有些场景下，资源内容可能没有改变，但是时间戳却有所变化（例如资源服务器迁移），这时候可能会导致不必要的资源下载。
                        2. ETag:
                        ○ ETag（实体标签）是服务器响应头部的另一个字段，表示资源的唯一标识符。通常是资源内容的哈希值或一些其他标识。
                        ○ 客户端在请求时，在头部使用If-None-Match字段，将之前获取资源时服务器返回的ETag值传递给服务器。
                        ○ 服务器会将客户端传递的If-None-Match值与实际资源的ETag值进行比较。如果匹配，服务器返回“304 Not Modified”；否则，返回新的资源。
                        ○ 优点：更精确地验证资源是否发生了变化，不仅仅依赖于时间戳。
                        ○ 缺点：计算哈希或生成唯一标识可能会增加服务器的负担，尤其是对于大文件。

                        Etag在感知文件变化上比Last-Modified更加准确，优先级也更高，当Etag和Last-Modified同时存在时，以Etag为准。
                        HTTP缓存策略
                        当我们的资源内容不可复用时，直接为Cache-Control设置no-store,拒绝一切形式的缓存;否则考虑是否每次都需要向服务器进行缓存有效确认,如果需要,那么设Cache-Control的值为no-cache;否则考虑该资源是否可以被代理服务器缓存，根据其结果决定是设置为private还是public;然后考虑该资源的过期时间，设置对应的max-age和s-maxage值;最后，配置协商缓存需要用到的Etag、Last-Modified等参数
                    </div>
                </div>
                <div className="single_recommend">
                    <BlogCard cardData={parentData} />
                </div>
            </div>
            <Footer></Footer>
        </div>

    )
}

export default React.memo(Single);