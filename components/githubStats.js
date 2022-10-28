import useSWR from "swr";
import { useState, useEffect } from "react";

const GithubStats = () => {
  const { data: user } = useSWR(
    "https://api.github.com/users/TIMMLOPK",
    (url) => fetch(url).then((res) => res.json())
  );
  const [stats, setStats] = useState({
    followers: 0,
    public_repos: 0,
  });

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
            <h3 className="text-xl font-bold">{stats.public_repos}</h3>
            <p className="text-gray-500 text-sm">Repositories</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold">{stats.followers}</h3>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubStats;
