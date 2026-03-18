'use client';

import Instance from '@/api/instance';
import { Confirm } from '@/components/common/confirm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/shadcn-ui/ui/dropdown-menu';
import useAdminStore from '@/stores/adminStore';
import useModalStore from '@/stores/modalStore';
import { ClipboardPenLine, LogOut, Pencil, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function HeaderAdimDropdown() {
  const { adminState, setAdminState } = useAdminStore();
  const setModalState = useModalStore(state => state.setModalState);

  const router = useRouter();

  async function handleLogout() {
    toast.promise(
      async () => {
        const res = await Instance.post('/auth/logout');

        if (!res.data.success) {
          throw new Error('로그아웃 실패');
        }

        setAdminState(false);
        return res.data.message ?? '로그아웃 성공';
      },
      {
        loading: '처리 중...',
        success: message => message,
        error: err => err.message ?? '서버 오류'
      }
    );
  }
  if (adminState)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-11 w-11 cursor-pointer items-center justify-center hover:rounded-sm hover:bg-gray-200">
            <User size={36} color="#0099ff" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={0}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>관리자</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push('/edit')}>
              <Pencil />새 게시글
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModalState('boardManagement')}>
              <ClipboardPenLine />
              게시판 관리
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <Confirm
            title="로그아웃"
            description="관리자 권한이 해제됩니다."
            onClick={handleLogout}
          >
            <DropdownMenuItem onSelect={e => e.preventDefault()}>
              <LogOut />
              로그아웃
            </DropdownMenuItem>
          </Confirm>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
