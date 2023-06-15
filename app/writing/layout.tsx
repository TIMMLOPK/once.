import Layout from "../../components/layout/main";
import { getServerSession } from "next-auth/next";
import { isAuthor } from "../../utils/author";

export default async function RootLayout({
  children,
  login,
}: {
  children: JSX.Element;
  login: JSX.Element;
}): Promise<JSX.Element> {
  const session = await getServerSession();

  return session && isAuthor(session.user.email) ? (
    <Layout className="px-0">{children}</Layout>
  ) : (
    login
  );
}
