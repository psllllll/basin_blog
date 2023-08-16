import { Button } from "antd";
import { FC, ReactElement, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { CheckOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { AnimateInput } from "./TitleInput";
import { ActiveLateY } from "../BUI/styled";
import useMount from "../../hooks/useMount";
import { getAllBlogTags, ITag } from "../../api/tagApi";

interface IProps {
  tags: Array<string>;
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => () => void;
}

const BlogTags: FC<IProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
}): ReactElement => {
  const [optionalTags, setOptionalTags] = useState<ITag[]>([]);

  useMount(() => {
    getAllBlogTags().then(({ data }) => {
      console.log("tags:", data);
      data && setOptionalTags(data);
    });
  });

  const selectedTag = useCallback(
    (tag: string) => () => {
      onAddTag(tag);
    },
    [onAddTag]
  );

  const renderListItem = useCallback(
    (tag, index) => (
      <TagItem key={tag} tag={tag} onRemoveTag={onRemoveTag(index)} />
    ),
    [onRemoveTag]
  );

  const renderOptionalItem = useCallback(
    ({ name }) => (
      <OptionalItem key={name} onClick={selectedTag(name)}>
        <span>{name}</span>
      </OptionalItem>
    ),
    [selectedTag]
  );

  return (
    <Container>
      <h3>博客标签</h3>
      {/* 展示选中的标签 */}
      <TagList>
        {tags.map(renderListItem)}
        {tags.length < 3 ? <AddTagInput onAddTag={onAddTag} /> : null}
      </TagList>
      {/* 展示现有可选的标签 */}
      <OptionalTag>{optionalTags.map(renderOptionalItem)}</OptionalTag>
    </Container>
  );
};

export default BlogTags;

interface TagItemProps {
  tag: string;
  onRemoveTag: () => void;
}

const TagItem: FC<TagItemProps> = ({ tag, onRemoveTag }) => {
  return (
    <TagItemWrap>
      <span>{tag}</span>
      <CloseOutlined onClick={onRemoveTag} />
    </TagItemWrap>
  );
};

interface AddTagInputProps {
  onAddTag: IProps["onAddTag"];
}

const AddTagInput: FC<AddTagInputProps> = ({ onAddTag }) => {
  const [addTag, setAddTag] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);

  const ToggleAddTagState = useCallback(() => {
    setAddTag(state => !state);
  }, []);

  const handleAddTag = useCallback(() => {
    const tag = input.current?.value ?? "";
    onAddTag(tag);
    setAddTag(false);
  }, [onAddTag]);

  return (
    <AddTagCont>
      {addTag ? <input ref={input} maxLength={18} /> : null}
      <Button
        onClick={addTag ? handleAddTag : ToggleAddTagState}
        type='primary'
        icon={addTag ? <CheckOutlined /> : <PlusOutlined />}
      >
        {addTag ? "确定" : "添加标签"}
      </Button>
      {addTag ? (
        <Button onClick={ToggleAddTagState} type='dashed'>
          取消
        </Button>
      ) : null}
    </AddTagCont>
  );
};

export const OptionalItem = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  border-radius: 12px;
  padding: 0 8px;
  margin: 5px;
  background: #ddd;
  transition: all 0.2s linear;
  cursor: pointer;
  user-select: none;
  ${ActiveLateY};

  &:hover {
    background: #51f;
    color: #fff;
  }
`;

const TagItemWrap = styled(OptionalItem)`
  cursor: default;
  & > span:first-child {
    transform: translateX(7px);
    transition: transform 0.2s linear;
  }
  & > span[aria-label="close"] {
    cursor: pointer;
    transition: opacity 0.2s linear;
    opacity: 0;
  }

  &:hover {
    & > span:first-child {
      transform: translateX(0);
    }
    & > span[aria-label="close"] {
      opacity: 1;
    }
  }
`;

const AddTagCont = styled.div`
  & > input {
    ${AnimateInput};
    margin-right: 10px;
    background: #c1c1c1c7;
    padding: 5px;
  }

  & > button[type="button"] {
    margin-right: 10px;
  }
`;

const TagList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const OptionalTag = styled(TagList)`
  max-height: 150px;
  background: #4242420f;
  margin: 5px 0;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Container = styled.div`
  padding: 5px 0;
`;
