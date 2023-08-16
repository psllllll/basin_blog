import React from "react";
import Header from '../../components/Header/Header';
import ArticleGroup from "../../components/articleGroup/articleGroup"
import Footer from "../../components/Footer/Footer";
import Banner1 from "../../components/assets/home/banner1.jpg";
import Banner2 from "../../components/assets/home/banner2.jpg";

const parentData = [
    {
        id: 1,
        title: '前端性能优化原理与实践',
        description: '从网络层面、渲染层面、性能检测层面等进行前端性能的原理介绍与优化，',
        imgsrc: Banner1,
    },
    {
        id: 2,
        title: '152367235126732783前端性能优化原理与实践',
        description: '31271283721837829378912378219372137127从网络层面、渲染层面、性能检测层面等进行前端性能的原理介绍与优化，从网络层面、渲染层面、性能检测层面等进行前端性能的原理介绍与优化,从网络层面、渲染层面、性能检测层面等进行前端性能的原理介绍与优化,从网络层面、渲染层面、性能检测层面等进行前端性能的原理介绍与优化',
        imgsrc: Banner2,
    },
    {
        id: 1,
        title: '前端性能优化原理与实践',
        description: '从网络层面、渲染层面、性能检测层面等进行前端性能的原理介绍与优化，',
        imgsrc: Banner1,
    },
    {
        id: 2,
        title: '前端性能优化原理与实践',
        description: '从网络层面、渲染层面、性能检测层面等进行前端性能的原理介绍与优化，',
        imgsrc: Banner2,
    },
];

const Group: React.FC = function () {
    console.log('123');

    return (
        <div className="group">
            <Header></Header>
            <ArticleGroup groupData={parentData}></ArticleGroup>
            <Footer></Footer>
        </div>
    )
}

export default React.memo(Group);