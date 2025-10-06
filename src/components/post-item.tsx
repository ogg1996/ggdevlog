interface Props {
  title: string;
  description: string;
  thumbnail_url: string;
}

export default function PostItem({ title, description, thumbnail_url }: Props) {
  return (
    <div className="h-[100px] pb-1 border-b flex justify-between items-center gap-2">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <img className="w-[150px]" src={thumbnail_url} />
    </div>
  );
}
