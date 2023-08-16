import {
  useImperativeHandle,
  forwardRef,
  ReactElement,
  useCallback,
  useRef,
} from "react";
import styled, { css } from "styled-components";
import ThumbsUp, { IThumbsUpRef } from "./ThumbsUp";

interface IProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export type SetTitleText = (title: string) => void;

const TitleInput = forwardRef<SetTitleText, IProps>(
  ({ setTitle }, ref): ReactElement => {
    const timer = useRef<number | NodeJS.Timeout>(0);
    const thumbsUpRef = useRef<IThumbsUpRef>(null);
    const input = useRef<HTMLInputElement | null>(null);
    //防抖-8毫秒没有改动后再改变父级状态 减少不必要的渲染
    const onChangeTitle = useCallback(
      e => {
        clearTimeout(timer.current as number);
        timer.current = setTimeout(() => {
          setTitle(e.target.value);
          thumbsUpRef.current?.open();
        }, 800);
      },
      [setTitle]
    );

    const setTitleText = useCallback(
      title => {
        input.current && (input.current.value = title);
        setTitle(title);
      },
      [setTitle]
    );

    useImperativeHandle(ref, () => setTitleText, [setTitleText]);

    return (
      <Container>
        <span>标题</span>
        <input ref={input} onChange={onChangeTitle} maxLength={40} />
        <ThumbsUp ref={thumbsUpRef} />
      </Container>
    );
  }
);

export default TitleInput;

export const AnimateInput = css`
  flex: 1;
  border: none;
  color: #666;
  outline: none;
  transition: all 0.4s linear;
  background: #eeeeee3a;

  &:focus {
    background: #000;
    color: #fff;
  }
`;

const Container = styled.section`
  width: 50%;
  height: 50px;
  background: #ffffff;
  position: absolute;
  box-shadow: 0 1px 4px 0 #ccc;
  display: flex;
  align-items: center;
  font-size: 20px;
  border-bottom: 4px dashed #ccc;
  padding: 0 10px;
  z-index: 1;

  & > span {
    padding: 0 20px;
  }

  & > input {
    ${AnimateInput};
  }
`;
