/* // import { query, request } from ".";
import { getImagePath } from "../constant/url"; 
import request from "./request";
// 全部 公开  私密  草稿
export enum BlogStatus {
  ALL = "全部",
  PUBLIC = "公开",
  PRIVATE = "私密",
  DRAFT = "草稿",
}
//原创 or  转载
export enum BlogType {
  ORIGINAL = "原创",
  REPRINT = "转载",
}

export const uploadFile = async (file: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await request("/uploadFile_md", formData);
  return data
    ? `![当图片不显示时展示的文字](${getImagePath}${data})`
    : undefined;
};

export interface BlogConfig {
  type: BlogType;
  status: BlogStatus;
  tags: string[];
  reprintAddress?: string;
}

export interface BlogInner {
  title: string;
  content: string;
}

// 发布博客所需参数
export interface BlogProps extends BlogConfig, BlogInner {
  prevTags?: BlogConfig["tags"];
}

export const requestReleaseBlog = async (blog: BlogProps) =>
  await request("/releaseBlog", blog);

// 服务端返回的blog item 不含 content  返回 信息较少的介绍字段
export interface Blog extends Omit<BlogProps, "content"> {
  _id: string;
  userId: string; //TODO 因该是 owner 指向博客的作者
  updateAt: number;
  createAt: number;
  browseCount: number;
  introduce: string;
  thumbsUp: number;
  thumbsDown: number;
}

export interface Sort {
  [key: string]: 1 | -1;
}

export interface BlogList {
  counts: number;
  blogs: Array<Blog>;
}

type GetBlogs = (props: {
  limit?: number;
  find: { [key: string]: any };
  skip?: number;
  sort?: Sort;
  self?: boolean; //只获取自己发布的blog
}) => Promise<{ data: BlogList }>;

export const getBlogs: GetBlogs = async params =>
  await query("/getBlogs", { params });

//单篇博客不返回简介字段信息 返回 content全片内容
export interface BlogDetail extends Omit<Blog, "introduce"> {
  content: string;
}

export const getBlogById = async (id: string): Promise<{ data: BlogDetail }> =>
  await query("/getBlogById", { params: { id } });

export interface DeleteBlogProps {
  _id: string;
  tags: BlogConfig["tags"];
  blogOwner: string;
}

// type TDeleteBlog = (params: DeleteBlogProps) => ;

export const deleteBlog = async (
  params: DeleteBlogProps
): Promise<{ data: { message: string } }> =>
  await request("/deleteBlog", params);
 */

import request from "./request";
// 全部 公开  私密  草稿
export enum BlogStatus {
  ALL = "全部",
  PUBLIC = "公开",
  PRIVATE = "私密",
  DRAFT = "草稿",
}
//原创 or  转载
export enum BlogType {
  ORIGINAL = "原创",
  REPRINT = "转载",
}


export interface BlogConfig {
    type: BlogType;
    status: BlogStatus;
    tags: string[];
    reprintAddress?: string;
  }
  
  export interface BlogInner {
    title: string;
    content: string;
  }
  
  // 发布博客所需参数
  export interface BlogProps extends BlogConfig, BlogInner {
    prevTags?: BlogConfig["tags"];
  }

  //单篇博客不返回简介字段信息 返回 content全片内容
/* export interface BlogDetail extends Omit<Blog, "introduce"> {
  content: string;
} */


//export const getBlogById = async (id: string): Promise<{ data: BlogDetail }> =>
