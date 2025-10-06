import PostItem from '@/components/post-item';

interface Props {
  data: {
    id: number;
    board: {
      id: number;
      name: string;
    };
    title: string;
    description: string;
    thumbnail: {
      image_url: string;
      image_name: string;
    };
    created_at: Date;
  }[];
}

export default function PostList({ data }: Props) {
  return (
    <div>
      {data.map(item => (
        <PostItem
          key={`post-${item.id}`}
          title={item.title}
          description={item.description}
          thumbnail_url={item.thumbnail.image_url}
        />
      ))}
    </div>
  );
}
