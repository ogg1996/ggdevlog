import PostItem from '@/components/page/board/post-item';

interface Props {
  data: {
    id: number;
    board: {
      id: number;
      name: string;
    };
    title: string;
    description: string;
    thumbnail?: {
      image_url: string;
      image_name: string;
    };
    created_at: string;
  }[];
}

export default function PostList({ data }: Props) {
  return (
    <div>
      {data.map(item => (
        <PostItem
          key={`post-${item.id}`}
          id={item.id}
          title={item.title}
          description={item.description}
          createdAt={item.created_at}
          thumbnailUrl={item.thumbnail?.image_url}
        />
      ))}
    </div>
  );
}
