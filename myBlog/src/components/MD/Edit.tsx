import {
  ReactElement,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
  useCallback,
  useImperativeHandle,
} from "react";
import useMount from "../../hooks/useMount";
import { editRefProps } from "../../pages/md";
import styled from "styled-components";
import { NotificationSuccess } from "../common/Notification";
import { uploadFile } from "../../api/blogApi";
import fileUpload from "../../utils/fileUpload";
interface IProps {
  syncScroll: boolean;
  setMarkdownScrollTop: (y: number) => void;
  onInput: React.FormEventHandler<HTMLDivElement>;
  handleInsertFile: (syntax: string) => void;
}

const Edit = forwardRef<editRefProps, IProps>(
  (
    { syncScroll, setMarkdownScrollTop, onInput, handleInsertFile },
    ref
  ): ReactElement => {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const input = useRef<HTMLInputElement | null>(null);
    const inputEvent = useMemo(() => {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("input", true, true);
      return event;
    }, []);

    const setEditScroll = useCallback(y => {
      input.current?.scrollTo(0, y);
    }, []);

    //强行触发oninput事件 markdown获取最新内容
    const forceInput = useCallback(() => {
      input.current?.dispatchEvent(inputEvent);
    }, [inputEvent]);

    const editGetFocus = useCallback(() => {
      input.current && input.current.focus();
    }, [input]);

    const getInnerText = useCallback(
      () => input.current && input.current.innerText,
      [input]
    );

    const setInnerText = useCallback(
      (text: string) => input.current && (input.current.innerText = text),
      [input]
    );

    //暴露给父级使用
    useImperativeHandle(
      ref,
      () => ({
        setEditScroll,
        forceInput,
        editGetFocus,
        getInnerText,
        setInnerText,
      }),
      [setEditScroll, forceInput, editGetFocus, getInnerText, setInnerText]
    );

    useMount(() => {
      editGetFocus();
    });

    const onEditScroll = useCallback(
      e => {
        setMarkdownScrollTop(e.target.scrollTop);
      },
      [setMarkdownScrollTop]
    );

    useEffect(() => {
      if (syncScroll) {
        input.current?.addEventListener("scroll", onEditScroll);
      } else {
        input.current?.removeEventListener("scroll", onEditScroll);
      }
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        input.current?.removeEventListener("scroll", onEditScroll);
      };
    }, [onEditScroll, syncScroll]);

    const DragEnter: React.DragEventHandler<HTMLDivElement> = useCallback(e => {
      setDragging(true);
    }, []);

    const DragLeave = useCallback(e => {
      setDragging(false);
    }, []);

    const handleUploadFile = useCallback(
      async (file: File) => {
        setUploading(true);
        const data = await uploadFile(file);
        if (data) {
          NotificationSuccess({ message: "上传成功" });
          //通知 父组件 让 nav 触发加入这段文字的方法
          handleInsertFile(data);
        }
        setUploading(false);
      },
      [handleInsertFile]
    );

    const Drop = useCallback(
      e => {
        fileUpload({
          type: "drop",
          handleUploadFile,
          setStatus: () => setDragging(false),
        })(e);
      },
      [handleUploadFile]
    );

    const Paste = useCallback(
      e => {
        fileUpload({
          type: "paste",
          handleUploadFile,
        })(e);
      },
      [handleUploadFile]
    );

    return (
      <EditBox
        ref={input}
        onInput={onInput}
        // 拖拽相关
        dragging={dragging}
        uploading={uploading}
        onDragEnter={DragEnter}
        onDragLeave={DragLeave}
        onDrop={Drop}
        // 粘贴
        onPaste={Paste}
      />
    );
  }
);

export default Edit;

const EditBox = styled.div.attrs({
  contentEditable: true,
})<{ dragging: boolean; uploading: boolean }>`
  position: relative;
  &::before {
    content: "松手上传图片";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000077;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 30px;
    transition: opacity 0.3s linear;
    opacity: ${props => (props.dragging ? 1 : 0)};
    z-index: ${props => (props.dragging ? 1 : -1)};
  }

  &::after {
    content: "图片上传中...";
    width: inherit;
    height: 25px;
    background: #51f;
    padding: 2px 20px;
    font-weight: bold;
    color: #fff;
    /* box-shadow: -2px 0px 2px 0px #807f7fc1; */
    bottom: 0;
    left: 0;
    position: fixed;
    transform: translateY(25px);
    transition: transform 0.2s linear;
    ${props => (props.uploading ? "transform: translateY(0);" : undefined)};
  }
`;
