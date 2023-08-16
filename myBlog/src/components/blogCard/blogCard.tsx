import './blogCard.less'
import { Card } from 'antd';
import type { CARD_TYPE } from "../type/homeType";
import { useNavigate } from "react-router-dom";
//import React, { useState } from 'react';
const { Meta } = Card;

interface BlogCardProps {
    cardData: CARD_TYPE[]; // Declare the prop type
}

const BlogCard: React.FC<BlogCardProps> = function ({ cardData }) {
    const navigate = useNavigate();
    const goCard = (id:number) =>{
        navigate(`/group/${id}`);
    }
    return (
        <div className="blogCard">
            {cardData.map((cardItem) => (
                <Card
                    key={cardItem.id}
                    hoverable
                    className='blogCard_box'
                    onClick={() => goCard(cardItem.id)}
                    cover={<img alt={cardItem.description} src={cardItem.imgsrc} />}
                >
                    <Meta title={cardItem.title} description={cardItem.description} />
                </Card>
            ))}
        </div>
    )
};


export default BlogCard;
