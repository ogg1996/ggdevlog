'use client';

import useAdminStore from '@/stores/adminStore';
import { Pencil } from 'lucide-react';

interface Props {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IntroduceEditButton({ setEdit }: Props) {
  const { adminState } = useAdminStore();

  if (!adminState) return null;
  return (
    <button
      className="flex h-9 w-9 cursor-pointer items-center justify-center hover:rounded-sm hover:bg-gray-200"
      onClick={() => {
        setEdit(true);
      }}
    >
      <Pencil size={24} color="#0099ff" />
    </button>
  );
}
