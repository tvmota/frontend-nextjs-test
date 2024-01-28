import { useRouter } from "next/router";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const isRootRouter = pathname === "/";

  return (
    <>
      {!isRootRouter ? <Link href="/">Voltar</Link> : <></>}
      {children}
    </>
  );
}
