import { FC, ReactElement } from "react";
import styled from "styled-components";

const ElementToLi = (element: HTMLElement, index: number) => {
  const marginLeft =
    (Number(element?.getAttribute("data-toc")) ?? 1) * 10 + "px";
  return (
    <li style={{ marginLeft }} key={index}>
      <span
        onClick={() => {
          element.scrollIntoView();
        }}
      >
        {element.innerText}
      </span>
    </li>
  );
};

const NodeListToToc = (nodeList: Array<HTMLElement>) =>
  nodeList ? Array.from(nodeList, ElementToLi) : [];

interface Props {
  HElements: Array<HTMLElement>;
}

const Toc: FC<Props> = ({ HElements }): ReactElement => {
  return (
    <Container>
      <strong>目录</strong>
      <ul>{NodeListToToc(HElements)}</ul>
    </Container>
  );
};

export default Toc;

const Container = styled.div`
  border-bottom: 1px dashed #ccc;

  ul {
    list-style: none;
    color: #51f;
    font-weight: bold;
    li {
      margin-top: 5px;
    }
    li > span {
      cursor: pointer;
      padding: 5px;
      transition: background-color 0.2s linear;
      border-radius: 2px;
    }
    li > span:hover {
      background-color: #cccccc91;
    }
  }
`;
