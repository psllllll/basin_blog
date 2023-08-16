import {
  ReactElement,
  useRef,
  useMemo,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useCallback,
} from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as style } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";
import raw from "rehype-raw";
import "github-markdown-css";
import Toc from "./Toc";

interface IProps {
  content: string;
  syncScroll: boolean;
  setEditScroll?: (y: number) => void;
}

const MarkDown = forwardRef<(y: number) => void, IProps>(
  ({ content, syncScroll, setEditScroll }, ref): ReactElement => {
    const wrap = useRef<HTMLDivElement | null>(null);

    const setScrollTop = useCallback((y: number) => {
      //@ts-ignore
      wrap.current.scrollTop = y;
    }, []);

    useImperativeHandle(ref, () => setScrollTop, [setScrollTop]);

    const onScroll = useCallback(
      e => {
        setEditScroll!(e.target.scrollTop);
      },
      [setEditScroll]
    );

    useEffect(() => {
      if (syncScroll) {
        wrap.current?.addEventListener("scroll", onScroll);
      } else {
        wrap.current?.removeEventListener("scroll", onScroll);
      }
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        wrap.current?.removeEventListener("scroll", onScroll);
      };
    }, [onScroll, syncScroll]);

    const components = useMemo(
      () => ({
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={style}
              language={match[1]}
              PreTag='div'
              children={String(children).replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        h1: ({ children }: any) => (
          <h1 className='data-toc' data-toc='1' children={children} />
        ),
        h2: ({ children }: any) => (
          <h2 className='data-toc' data-toc='2' children={children} />
        ),
        h3: ({ children }: any) => (
          <h3 className='data-toc' data-toc='3' children={children} />
        ),
        h4: ({ children }: any) => (
          <h4 className='data-toc' data-toc='4' children={children} />
        ),
        h5: ({ children }: any) => (
          <h5 className='data-toc' data-toc='5' children={children} />
        ),
        h6: ({ children }: any) => (
          <h6 className='data-toc' data-toc='6' children={children} />
        ),
        p: ({ children }: any) =>
          String(children) === "@[toc]" ? (
            <Toc
              HElements={
                wrap.current?.getElementsByClassName("data-toc") as any
              }
            />
          ) : (
            <p children={children} />
          ),
      }),
      []
    );

    return (
      <MDWrap ref={wrap}>
        <ReactMarkdown
          //@ts-ignore
          rehypePlugins={[raw]}
          //@ts-ignore
          remarkPlugins={[gfm]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </MDWrap>
    );
  }
);

export default MarkDown;

const MDWrap = styled.div.attrs({ className: "markdown-body" })`
  flex: 1;
`;
