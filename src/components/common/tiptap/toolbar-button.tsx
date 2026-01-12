interface Props {
  title: string;
  isActive?: boolean;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  size: number;
  onClick: () => void;
}

export default function ToolbarButton({
  title,
  isActive,
  icon: Icon,
  size,
  onClick
}: Props) {
  return (
    <button
      title={title}
      className="w-[24px] h-[24px] cursor-pointer  
      flex justify-center items-center"
      onClick={onClick}
    >
      <Icon size={size} color={isActive ? '#0099FF' : '#999999'} />
    </button>
  );
}
