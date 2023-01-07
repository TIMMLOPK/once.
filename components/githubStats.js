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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center mt-5">
          <div className="flex flex-col items-center justify-center mr-10">
            {isLoading ? (
              <div className="rounded-full bg-gray-400 h-4 w-4 animate-pulse mb-3"></div>
            ) : (
              <h3 className="text-xl font-bold">{stats.public_repos}</h3>
            )}
            <p className="text-gray-500 text-sm">Repositories</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            {isLoading ? (
              <div className="rounded-full bg-gray-400 h-4 w-4 animate-pulse mb-3"></div>
            ) : (
              <h3 className="text-xl font-bold">{stats.followers}</h3>
            )}
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubStats;
