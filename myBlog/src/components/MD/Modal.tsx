import {
  FC,
  useEffect,
  ReactElement,
  memo,
  useState,
  useCallback,
  Fragment,
  useRef,
} from "react";
import styled from "styled-components";
import { ActiveLateY, flexCenter, opacityAnimate } from "../BUI/styled";
import { CloseOutlined } from "@ant-design/icons";
import {
  BlogConfig,
  BlogDetail,
  BlogStatus,
  BlogType as BlogTypes,
} from "../../api/blogApi";
import { Button, Radio } from "antd";
import { AnimateInput } from "./TitleInput";
import verification from "../../utils/urlVerification";
import BlogTags from "./BlogTags";
import BlogType from "./Modal/BlogStatus";
import { NotificationError } from "../common/Notification";

interface IProps {
  open: boolean;
  cancel: () => void;
  onReleaseBlog: (conf: BlogConfig) => void;
  updateBlog: BlogDetail | null;
}

const Modal: FC<IProps> = ({
  open,
  cancel,
  onReleaseBlog,
  updateBlog,
}): ReactElement => {
  //TODO 博客封面   const [cover, setCover] = useState(""); //封面图片的名
  const [type, setType] = useState<BlogTypes>(BlogTypes["ORIGINAL"]);
  const [status, setStatus] = useState<BlogStatus>(BlogStatus["PUBLIC"]);
  const reprintAddress = useRef<null | HTMLInputElement>(null);
  const [reprintAddressDefault, setReprintAddressDefault] = useState("");
  const falseReprintAddress = useRef(false);
  const [reprintAddressErr, setReprintAddressErr] = useState(false);
  const [tags, setTags] = useState<Array<string>>([]);

  useEffect(() => {
    if (updateBlog) {
      setType(updateBlog.type);
      setStatus(updateBlog.status);
      setTags(updateBlog.tags);
      updateBlog.reprintAddress &&
        setReprintAddressDefault(updateBlog.reprintAddress);
    }
  }, [updateBlog]);

  const onBlogTypeChange = useCallback(e => {
    setType(e.target.value);
  }, []);

  const onBlogStatusChange = useCallback(e => {
    setStatus(e.target.value);
  }, []);

  const onReprintAddressChange = useCallback(e => {
    //验证地址是否为url格式
    const result = !verification(e.target.value);
    setReprintAddressErr(result);
    //防止频发渲染 相关函数 使用 ref保存  ref的改变不会引起页面渲染 effect也不会触发
    falseReprintAddress.current = result;
  }, []);

  const addTag = useCallback((tag: string) => {
    setTags(prev =>
      prev.length > 3 || prev.includes(tag) ? prev : [...prev, tag]
    );
  }, []);

  const removeTag = useCallback(
    (index: number) => () => {
      setTags(prev => {
        const newTags = [...prev];
        newTags.splice(index, 1);
        return newTags;
      });
    },
    []
  );

  const handleReleaseBlog = useCallback(() => {
    if (type === BlogTypes["REPRINT"] && falseReprintAddress.current)
      return NotificationError({ message: "检查转载地址" });
    //类型 状态 标签 转载地址
    const config: BlogConfig = {
      type,
      status,
      tags: tags.length ? tags : ["其他"],
    };
    type === BlogTypes["REPRINT"] &&
      (config["reprintAddress"] = reprintAddress.current?.value);
    onReleaseBlog(config);
  }, [status, tags, type, onReleaseBlog]);

  if (!open) return <></>;

  return (
    <Container>
      <Dialog>
        <CloseOutlined onClick={cancel} />
        <BlogTypeSelect>
          <h3>博客类型</h3>
          <Radio.Group
            onChange={onBlogTypeChange}
            defaultValue={type}
            buttonStyle='solid'
          >
            <Radio.Button value={BlogTypes["ORIGINAL"]}>原创</Radio.Button>
            <Radio.Button value={BlogTypes["REPRINT"]}>转载</Radio.Button>
          </Radio.Group>
          {type === BlogTypes["REPRINT"] ? (
            <Fragment>
              <CarefulText>
                注意：转载请确认原文允许转载，或者您已经获得原文作者授权
              </CarefulText>
              <ReprintAddressInput reprintAddressErr={reprintAddressErr}>
                <input
                  ref={reprintAddress}
                  defaultValue={reprintAddressDefault}
                  placeholder='转载地址'
                  onChange={onReprintAddressChange}
                />
              </ReprintAddressInput>
            </Fragment>
          ) : null}
        </BlogTypeSelect>
        <BlogTags tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
        <BlogType status={status} onChange={onBlogStatusChange} />
        <Button type='primary' onClick={handleReleaseBlog}>
          发布
        </Button>
      </Dialog>
    </Container>
  );
};

export default memo(Modal);

const CarefulText = styled.span`
  color: red;
  padding-left: 10px;
  animation: ${opacityAnimate} 0.3s linear;
`;

const ReprintAddressInput = styled.div<{ reprintAddressErr: boolean }>`
  display: flex;
  align-items: flex-end;
  position: relative;
  animation: ${opacityAnimate} 0.3s linear;

  & > input {
    ${AnimateInput};
    margin: 5px 0;
    background: #c1c1c1c7;
    width: 200px;
    padding: 5px;
    border-bottom: 1px solid
      ${props => (props.reprintAddressErr ? "red" : "transparent")};
    transition: border-bottom 0.3s linear;
  }
  &::after {
    content: "错误的url地址 🙅‍♂️";
    color: red;
    position: absolute;
    bottom: 5px;
    right: 0;
    background: #ffffff9e;
    padding: 0 5px;
    transition: opacity 0.3s linear;
    opacity: ${props => (props.reprintAddressErr ? 1 : 0)};
  }
`;

const BlogTypeSelect = styled.div`
  height: 110px;
`;

const Container = styled.div`
  position: absolute;
  background: #0000003a;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  width: 100%;
  height: 100%;
  z-index: 3;
  animation: ${opacityAnimate} 0.3s linear;

  ${flexCenter};
`;

const Dialog = styled.div`
  width: 600px;
  min-height: 500px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 #ccc;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  padding-bottom: 80px;
  /* 发布按钮 */
  & > button.ant-btn.ant-btn-primary {
    position: absolute;
    padding: 4px 25px;
    bottom: 10px;
    right: 10px;
    width: calc(100% - 20px);
  }

  & > span[aria-label="close"] {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    border: 1px solid #000;
    ${flexCenter};
    font-size: 20px;
    position: absolute;
    right: 10px;
    ${ActiveLateY};
    cursor: pointer;
    transition: all 0.3s linear;
    &:hover {
      border-color: #51f;
      color: #fff;
      background: #51f;
    }
  }
`;
