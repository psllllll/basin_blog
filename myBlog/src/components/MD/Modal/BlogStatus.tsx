import { FC, ReactElement } from "react";
import styled from "styled-components";
import { Radio } from "antd";
import { BlogStatus as TBlogStatus } from "../../../api/blogApi";

interface IProps {
  status: TBlogStatus;
  onChange: (e: any) => void;
}

const BlogStatus: FC<IProps> = ({ status, onChange }): ReactElement => {
  return (
    <Container>
      <h3>博客状态</h3>
      <Radio.Group
        onChange={onChange}
        defaultValue={status}
        buttonStyle='solid'
      >
        <Radio.Button value={TBlogStatus["PUBLIC"]}>
          {TBlogStatus["PUBLIC"]}
        </Radio.Button>
        <Radio.Button value={TBlogStatus["PRIVATE"]}>
          {TBlogStatus["PRIVATE"]}
        </Radio.Button>
        <Radio.Button value={TBlogStatus["DRAFT"]}>
          {TBlogStatus["DRAFT"]}
        </Radio.Button>
      </Radio.Group>
    </Container>
  );
};

export default BlogStatus;

const Container = styled.div``;
