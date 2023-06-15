"use client";

import useSWR from "swr";

interface GithubStats {
  followers: number;
  public_repos: number;
}

const GithubStats = () => {
  const { data: user, isLoading } = useSWR(
    "https://api.github.com/users/TIMMLOPK",
    (...args) => fetch(...args).then((res) => res.json())
  );

  const loading = (
    <span className="mb-3 h-4 w-4 animate-pulse rounded-full bg-gray-400" />
  );

  return (
    <div className="mt-5 flex flex-row items-center justify-center">
      <div className="mr-10 flex flex-col items-center justify-center">
        {isLoading ? (
          loading
        ) : (
          <h3 className="text-xl font-bold">{user.public_repos}</h3>
        )}
        <p className="text-sm text-gray-400">Repositories</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          loading
        ) : (
          <h3 className="text-xl font-bold">{user.followers}</h3>
        )}
        <p className="text-sm text-gray-400">Followers</p>
      </div>
    </div>
  );
};

export default GithubStats;
