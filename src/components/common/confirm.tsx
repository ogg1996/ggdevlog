'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/shadcn-ui/ui/alert-dialog';

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  onClick: () => void;
}

export function Confirm({ title, description, children, onClick }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        className="top-1/9 bg-white font-[pretendard] text-black dark:bg-slate-900"
        size="sm"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold text-black dark:text-white">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-black dark:text-white">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-0 bg-white dark:bg-slate-900">
          <AlertDialogAction
            className="bg-blue-400! text-white hover:bg-blue-600!"
            onClick={onClick}
          >
            확인
          </AlertDialogAction>
          <AlertDialogCancel className="bg-red-400! text-white hover:bg-red-500!">
            취소
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
