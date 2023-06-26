interface GithubStats {
  followers: number;
  public_repos: number;
}

const GithubStats = async () => {
  const user = await getGithubStats();

  return (
    <div className="mt-5 flex flex-row items-center justify-center">
      <div className="mr-10 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold">{user.public_repos}</h3>
        <p className="text-sm text-gray-400">Repositories</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold">{user.followers}</h3>
        <p className="text-sm text-gray-400">Followers</p>
      </div>
    </div>
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


export default GithubStats;
