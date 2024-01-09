import Writing from "../../components/blog/writing/writing";
import { getPosts, deletePost } from "../../utils/actions";
import { auth } from "../../utils/auth";

export default async function WritingPage() {
  const session = await auth();
  const posts = await getPosts();

  return <Writing posts={posts} deletePost={deletePost} user={session?.user} />;
}
