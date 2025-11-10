interface Props {
  content: string;
}

export default function Viewer({ content }: Props) {
  return (
    <div className="ql-container ql-snow">
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
