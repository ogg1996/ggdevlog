import TopButton from '@/components/layout/top-button';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <TopButton />
    </>
  );
}
