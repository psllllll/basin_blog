import { useState, useCallback, useRef } from "react";
import { FC, ReactElement } from "react";
import styled from "styled-components";
 import {
  BlogConfig,
  BlogDetail,
  BlogInner,
  getBlogById,
  requestReleaseBlog,
} from "../../network/"; 
import {
  NotificationSuccess,
  NotificationError,
} from "../../components/common/Notification"; 
import Edit from "../../components/MD/Edit";
import MarkDown from "../../components/MD/MarkDown";
import Modal from "../../components/MD/Modal";
import Nav from "../../components/MD/Nav";
import TitleInput, { SetTitleText } from "../../components/MD/TitleInput";
import useMount from "../../hooks/useMount";
import { useHistory } from "react-router-dom";

interface IProps {}

export interface editRefProps {
  forceInput: () => void;
  setEditScroll: (y: number) => void;
  editGetFocus: () => void;
  getInnerText: () => string | null;
  setInnerText: (text: string) => string | null;
}

const MD: FC<IProps> = (): ReactElement => {
  const {
    goBack,
    location: { search },
  } = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const blogRef = useRef<BlogInner | BlogDetail | null>(null); //保存 title和content 防止title变化 函数变更造成多次渲染
  const [insertFile, setInsertFile] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [syncScroll, setSyncScroll] = useState(false);
  const setMarkdownTop = useRef<(y: number) => void | null>(null);
  const editRef = useRef<editRefProps | null>(null);
  const setTitleText = useRef<SetTitleText | null>(null);
  const [updateBlog, setUpdateBlog] = useState<null | BlogDetail>(null);

  //编辑博客
  const handleEditBlog = useCallback(
    async id => {
      const { data } = await getBlogById(id);
      if (data) {
        console.log(data);
        blogRef.current = data;
        //render
        setTitleText.current && setTitleText.current(data.title);
        setContent(data.content);
        editRef.current?.setInnerText(data.content);
        setUpdateBlog(data);
      } else goBack();
    },
    [goBack]
  );

  //先强制渲染一次 否则 editRef拿不到方法 直接添加语法块会报错
  useMount(() => {
    setContent("<br/>");
    //获取编辑blog的id
    const match = search.match(/^\?blog=(\w+)/);
    match && match[1] && handleEditBlog(match[1]);
  });

  const onInput = useCallback(e => {
    setContent(e.target.innerText);
  }, []);

  const handleSyncScroll = useCallback(() => {
    setSyncScroll(prev => !prev);
  }, []);

  //子组件上传完图片，父组件通知 nav 加入引用图片的语法
  const handleInsertFile = useCallback((syntax: string) => {
    setInsertFile(syntax);
  }, []);

  const cancelModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  // 接收到 博客相关参数 进行请求操作
  const onReleaseBlog = useCallback(
    async (conf: BlogConfig) => {
      const blog = { ...(blogRef.current as BlogDetail | BlogDetail), ...conf };
      const prevBlog = blogRef.current as BlogDetail;
      if (prevBlog._id && prevBlog.tags) {
        //更新
        blog["prevTags"] = prevBlog.tags;
      }
      //可以发布了 请求后端
      // @ts-ignore
      delete blog["sender"];
      const { data } = await requestReleaseBlog(blog);
      if (data) {
        NotificationSuccess({ message: data.message });
        goBack();
      }
    },
    [goBack]
  );

  const onClickRelease = useCallback(() => {
    const content = editRef.current?.getInnerText();
    if (content && title) {
      setOpenModal(true);
      blogRef.current = { ...blogRef.current, title, content }; //在onReleaseBlog 中不必根据 title变化减少渲染次数
    } else if (!content) NotificationError({ message: "检查内容" });
    else NotificationError({ message: "检查标题" });
  }, [title]);

  return (
    <Container>
      <Nav
        handleSyncScroll={handleSyncScroll}
        syncScroll={syncScroll}
        forceInput={editRef.current?.forceInput}
        editGetFocus={editRef.current?.editGetFocus}
        insertFile={insertFile}
        onClickRelease={onClickRelease}
        goBack={goBack}
      />
      <EditWrapper>
        <TitleInput setTitle={setTitle} ref={setTitleText} />
        <Edit
          ref={editRef}
          setMarkdownScrollTop={setMarkdownTop.current as (y: number) => void}
          syncScroll={syncScroll}
          onInput={onInput}
          handleInsertFile={handleInsertFile}
        />
        <MarkDown
          ref={setMarkdownTop}
          content={content}
          syncScroll={syncScroll}
          setEditScroll={editRef.current?.setEditScroll}
        />
      </EditWrapper>
      <Modal
        open={openModal}
        cancel={cancelModal}
        onReleaseBlog={onReleaseBlog}
        updateBlog={updateBlog}
      />
    </Container>
  );
};

export default MD;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const EditWrapper = styled.div`
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  position: relative;

  & > div {
    width: 50%;
    max-width: 50%;
    padding: 0 5px;
    overflow-y: scroll;
  }

  & > div[contentEditable] {
    border-right: 1px dashed #ccc;
    outline: none;
    padding: 50px 5px;
  }
`;
