'use client';
import Instance from '@/api/instance';
import { Confirm } from '@/components/common/confirm';
import useAdminStore from '@/stores/adminStore';
import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function HeaderLogoutButton() {
  const { adminState, setAdminState } = useAdminStore();

  async function logout() {
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
      <Confirm
        title="로그아웃"
        description="관리자 권한이 해제됩니다."
        onClick={logout}
      >
        <button
          className={clsx(
            'h-11 w-11 cursor-pointer',
            'flex items-center justify-center',
            'hover:rounded-sm hover:bg-gray-200'
          )}
        >
          <LogOut size={36} color="#0099ff" />
        </button>
      </Confirm>
    );
}
