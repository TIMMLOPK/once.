import useSWR from "swr";
import { useState, useEffect } from "react";

const GithubStats = () => {
  const { data: user, isLoading } = useSWR(
    "https://api.github.com/users/TIMMLOPK",
    (...args) => fetch(...args).then((res) => res.json())
  );
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (user) {
      setStats({
        followers: user.followers,
        public_repos: user.public_repos,
      });
    }
  }, [user]);

  return (
    <div className="mt-5 flex flex-row items-center justify-center">
      <div className="mr-10 flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="mb-3 h-4 w-4 animate-pulse rounded-full bg-gray-400"></div>
        ) : (
          <h3 className="text-xl font-bold">{stats.public_repos}</h3>
        )}
        <p className="text-sm text-gray-500">Repositories</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="mb-3 h-4 w-4 animate-pulse rounded-full bg-gray-400"></div>
        ) : (
          <h3 className="text-xl font-bold">{stats.followers}</h3>
        )}
        <p className="text-sm text-gray-500">Followers</p>
      </div>
    </div>
  );
};

export default GithubStats;
