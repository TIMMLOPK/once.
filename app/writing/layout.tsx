import Layout from "../../components/layout/main";
import { auth } from "../../utils/auth";
import { isAuthor } from "../../utils/author";

export default async function RootLayout({
  children,
  login,
}: {
  children: JSX.Element;
  login: JSX.Element;
}): Promise<JSX.Element> {
  const session = await auth();

  return session && isAuthor(session.user.email) ? (
    <Layout>{children}</Layout>
  ) : (
    login
  );
}
