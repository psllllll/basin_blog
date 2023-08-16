import { useCallback, FC, memo, ReactElement, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  BoldOutlined,
  ArrowLeftOutlined,
  SendOutlined,
  ItalicOutlined,
  SwapOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  DeleteLineIcon,
  MarkIcon,
  CodeSquareIcon,
  SplitLineIcon,
  TodoIcon,
  TableIcon,
  UploadImageIcon,
} from "../icon";
import { ActiveLateY } from "../BUI/styled";
import { Tooltip } from "antd";
import fileUpload from "../../utils/fileUpload";
import { uploadFile } from "../../api/blogApi";
import { NotificationError, NotificationSuccess } from "../common/Notification";

interface IProps {
  forceInput: (() => void) | undefined;
  editGetFocus: (() => void) | undefined;
  handleSyncScroll: () => void;
  syncScroll: boolean;
  insertFile: string;
  onClickRelease: () => void;
  goBack: () => void;
}

type TFuncBtn = Array<{
  title: string;
  icon: JSX.Element;
  syntax: Array<string | number>;
  multiline?: boolean;
}>;

const FuncBtn: TFuncBtn = [
  { title: "斜体", syntax: [1, "*"], icon: <ItalicOutlined /> },
  { title: "加粗", syntax: [1, "**"], icon: <BoldOutlined /> },
  { title: "删除线", syntax: [1, "~~"], icon: <DeleteLineIcon /> },
  { title: "标记", syntax: [1, "`"], icon: <MarkIcon /> },
  { title: "分割线", syntax: [0, "---"], icon: <SplitLineIcon /> },
  {
    title: "代码块",
    syntax: ["```js", "<br/>", "```"],
    icon: <CodeSquareIcon />,
    multiline: true,
  },
  {
    title: "有序列表",
    syntax: ["1. ...", "2. ...", "3. ..."],
    icon: <OrderedListOutlined />,
    multiline: true,
  },
  {
    title: "无序列表",
    syntax: ["* ...", "* ...", "* ..."],
    icon: <UnorderedListOutlined />,
    multiline: true,
  },
  {
    title: "代办列表",
    syntax: ["* [ ] task list", "* [x] checked item"],
    icon: <TodoIcon />,
    multiline: true,
  },
  {
    title: "表格",
    syntax: ["| th | th |", "|--|--|", "| td | td |"],
    icon: <TableIcon />,
    multiline: true,
  },
];

const Nav: FC<IProps> = ({
  forceInput,
  handleSyncScroll,
  syncScroll,
  editGetFocus = () => undefined,
  insertFile,
  onClickRelease,
  goBack,
}): ReactElement => {
  const Range = useCallback(() => {
    const selObj = window.getSelection();
    if (!selObj) return;
    const focusNode = selObj.focusNode as Element | null;
    //当前出入点如果不是编辑区 强制获得焦点 保证插入点在编辑区内
    (!focusNode ||
      focusNode?.nodeName !== "DIV" ||
      !focusNode.getAttribute("contenteditable")) &&
      editGetFocus();

    return selObj.getRangeAt(0);
  }, [editGetFocus]);

  const handleSection = useCallback(
    ([surround, str]: [surround: number, str: string]) =>
      () => {
        const range = Range();
        if (!range) return;
        const prev = range.toString();
        range.deleteContents();
        //选中多个元素时 直接surroundContents会报错 先删除原来的 在被新的元素包裹
        const t = document.createElement("span");
        range.surroundContents(t);
        t.innerHTML = surround ? `${str}${prev}${str}` : str;
        range.collapse(false);
        forceInput!();
      },
    [Range, forceInput]
  );

  const insertMultilineSyntax = useCallback(
    (syntax: string[]) => () => {
      const range = Range();
      if (!range) return;
      range.deleteContents();
      const wrap = document.createElement("div");
      range.surroundContents(wrap);
      for (const str of syntax) {
        const item = document.createElement("div");
        wrap.appendChild(item);
        item.innerHTML = str;
      }
      range.collapse(false); // 设置完后取消选中样式
      forceInput!();
    },
    [Range, forceInput]
  );

  useEffect(() => {
    if (insertFile) {
      insertMultilineSyntax(["<br/>", insertFile, "<br/>"])();
    }
  }, [insertFile, insertMultilineSyntax]);

  const renderFuncBtn = (item: TFuncBtn[number]) => (
    <VerticalBox
      key={item.title}
      title={item.title}
      onClick={
        item.multiline
          ? insertMultilineSyntax(item.syntax as string[])
          : handleSection(item.syntax as [surround: number, str: string])
      }
    >
      {item.icon}
    </VerticalBox>
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUploadFile = useCallback(
    fileUpload({
      type: "inputUpload",
      handleUploadFile: async (file: File) => {
        const data = await uploadFile(file);
        if (data) {
          insertMultilineSyntax(["<br/>", data, "<br/>"])();
          NotificationSuccess({ message: "上传成功" });
        } else NotificationError({ message: "上传失败" });
      },
    }),
    [insertMultilineSyntax]
  );

  return (
    <Container>
      <AnimateButton onClick={goBack}>
        <ArrowLeftOutlined />
        返回
      </AnimateButton>
      <VerticalBox
        active={syncScroll}
        onClick={handleSyncScroll}
        title='同步滚动'
      >
        <SwapOutlined />
      </VerticalBox>
      {FuncBtn.map(renderFuncBtn)}
      <Tooltip title='支持拖拽和粘贴👏'>
        <VerticalBox title='上传图片'>
          <UploadImageIcon />
          <FileInput onChange={handleUploadFile} />
        </VerticalBox>
      </Tooltip>
      <SendButton onClick={onClickRelease}>
        <SendOutlined />
        发布
      </SendButton>
    </Container>
  );
};

export default memo(Nav);

const FileInput = styled.input.attrs({ type: "file" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const activeStyle = css`
  box-shadow: 5px 5px 19px #e3e3e3, -5px -5px 19px #ffffff;
  svg {
    transform: scale(1.87) translateY(4px);
  }
  &::after {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const VerticalBox = styled.button<{ title: string; active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: none;
  margin: 0 10px;
  height: 40px;
  min-width: 40px;
  justify-content: space-between;
  border-radius: 2px;
  background: #fff;
  /* box-shadow:  7px 7px 14px #cccccc, inset -7px -7px 14px #ffffff; */
  overflow: hidden;
  padding-top: 5px;
  transition: box-shadow 0.2s linear;
  font-size: 1rem;
  position: relative;

  &::after {
    content: "${props => props.title}";
    font-size: 12px !important;
    transition: all 0.2s linear;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
  }

  svg {
    transition: transform 0.2s linear;
  }

  &:hover {
    ${activeStyle}
  }

  ${ActiveLateY};

  ${props => (props.active ? activeStyle : undefined)};
`;

const Container = styled.nav`
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 #ccc;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const AnimateButton = styled.div<{ hoverBg?: string }>`
  display: flex;
  height: 40px;
  width: 100px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee4b;
  border-radius: 3px;
  letter-spacing: 1px;
  transition: all 0.2s linear;
  cursor: pointer;

  & > span {
    margin-right: 5px;
    font-size: 20px;
    transition: all 0.4s ease-in;
  }
  &:hover {
    background: ${props => props.hoverBg || "#ffffff"};
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    & > span {
      font-size: 23px;
      transform: translateX(-10px);
    }
  }
  ${ActiveLateY};
`;

const SendButton = styled(AnimateButton).attrs({
  hoverBg: "#000",
})`
  color: #fff;
  background: #51f;
  font-weight: bold;
  margin-left: auto;
  /* -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px #fff; */
`;
