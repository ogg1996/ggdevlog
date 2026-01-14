interface Props {
  children: React.ReactNode;
}

export default function ToolbarGroup({ children }: Props) {
  return <div className="flex gap-1">{children}</div>;
}
