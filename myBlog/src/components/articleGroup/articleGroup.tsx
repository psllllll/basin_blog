import type { GROUP_TYPE } from "../type/homeType";
import { useNavigate } from "react-router-dom";
import { SnippetsOutlined } from '@ant-design/icons';
import { Button} from 'antd';
import './articleGroup.less'
import { Link } from "react-router-dom"

interface BlogGroupProps {
    groupData: GROUP_TYPE[];
}

const articleGroup: React.FC<BlogGroupProps> = function ({ groupData }) {
    const navigate = useNavigate();
    const goCard = () => {
        navigate("/single");
    }
    return (
        <div className="articleCard">
            {groupData.map((groupItem) => (
                <div
                    key={groupItem.id}
                    className='articleCard_box'
                    onClick={goCard}
                >
                    <div className="group_item_img">
                        <img src={groupItem.imgsrc} alt="" />
                    </div>
                    <Link className="articleCard_content" to={`/single/${groupItem.id}`} >
                        <h1 className="articleCard_title">
                            {groupItem.title}
                        </h1>
                        <div className="articleCard_description">
                            {groupItem.description}
                        </div>
                        <div className="articleCard_button">
                            <Button type="primary" icon={<SnippetsOutlined />}>
                                READ MORE
                            </Button>
                        </div>
                    </Link >
                </div>
            ))}
        </div>
    )
};


export default articleGroup;
