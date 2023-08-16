import {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useState,
  useCallback,
  useRef,
} from "react";
import styled, { css } from "styled-components";
import { ThumbsUpIcon } from "../icon";

interface IProps {
  msg?: string;
}

export interface IThumbsUpRef {
  open: () => void;
}

const RainbowFart = ["这标题蕨了", "大气磅礴", "超凡脱俗", "这个标题针不戳"]; // 彩虹屁😄

const ThumbsUp = forwardRef<IThumbsUpRef, IProps>(
  ({ msg }, ref): ReactElement => {
    const [innerState, setInnerState] = useState(false);
    const closeTimer = useRef<any>(null);

    const open = useCallback(() => {
      setInnerState(true);
      if (!closeTimer.current) {
        closeTimer.current = setTimeout(() => {
          setInnerState(false);
          closeTimer.current = null;
        }, 2000);
      }
    }, []);

    useImperativeHandle(ref, () => ({ open }), [open]);

    return (
      <Container show={innerState}>
        <ThumbsUpIcon /> {msg || RainbowFart[Math.floor(Math.random() * 4)]}
      </Container>
    );
  }
);

export default ThumbsUp;

const Container = styled.div<{ show?: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 1;
  font-weight: bold;
  font-size: 16px;
  right: 0;
  transition-property: opacity, transform;
  transition-duration: 0.5s, 2s;
  transition-timing-function: cubic-bezier(0.65, -0.63, 0.58, 1);
  opacity: 0;
  color: ${`rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)})`};
  bottom: 0;

  ${props =>
    props.show
      ? css`
          opacity: 1;
          transform: translateY(-50px);
        `
      : null};
`;
