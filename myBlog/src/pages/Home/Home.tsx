import React from "react";
import Header from '../../components/Header/Header'
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";


const Home: React.FC = function(){
    return(
        <div className="home">
            <Header></Header>
            <Banner></Banner>
            <Footer></Footer>
        </div>
    )
}

export default React.memo(Home);