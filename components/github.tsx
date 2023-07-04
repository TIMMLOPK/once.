import Link from "next/link";
import { FiGithub } from "react-icons/fi";

interface GithubStats {
  followers: number;
  public_repos: number;
}

const Github = async () => {
  const user = await getGithubStats();

  return (
    <Link href="https://github.com/TIMMLOPK" aria-label="GitHub" passHref>
      <div className="group flex cursor-pointer items-center justify-between rounded-full border border-gray-200 px-6 py-1.5 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800/60">
        <div className="flex flex-row items-center">
          <FiGithub className="mr-2 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.public_repos} Repos
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.followers} Followers
          </p>
        </div>
      </div>
    </Link>
  );
};

async function getGithubStats(): Promise<GithubStats> {
  const res = await fetch("https://api.github.com/users/TIMMLOPK");
  const data = await res.json();

  return {
    followers: data.followers,
    public_repos: data.public_repos,
  };
}

export default Github;
