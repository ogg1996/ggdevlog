import { JSONContent } from '@tiptap/react';

type Board = {
  id: number;
  name: string;
};

type Thumbnail = {
  image_name: string;
  image_url: string;
};

type Post = {
  board: Board;
  id: number;
  title: string;
  description: string;
  thumbnail?: Thumbnail;
  content?: JSONContent;
  images: string[];
  created_at: Date;
  updated_at: Date;
};

export { type Board, type Post, type Thumbnail };
