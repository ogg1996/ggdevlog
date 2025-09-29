interface Props {
  title: string;
  content: string;
}

export default function Viewer({ title, content }: Props) {
  return (
    <div>
      <h1 className="w-full text-3xl font-bold mb-4 border-none outline-none">
        {title}
      </h1>
      <div className="ql-container ql-snow">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
