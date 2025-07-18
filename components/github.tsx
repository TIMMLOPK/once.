import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

interface GithubStats {
  followers: number
  public_repos: number
}

async function getGithubStats(): Promise<GithubStats> {
  const res = await fetch('https://api.github.com/users/TIMMLOPK')
  const data = await res.json()

  return {
    followers: data.followers,
    public_repos: data.public_repos
  }
}

export async function Github() {
  const user = await getGithubStats()
  return (
    <Link href="https://github.com/TIMMLOPK" aria-label="GitHub" passHref>
      <div className="group flex cursor-pointer items-center justify-between">
        <div className="flex flex-row items-center">
          <FaGithub className="group-hover:text-opacity-100 mr-2 h-5 w-5 text-zinc-500 transition group-hover:text-blue-500 dark:text-zinc-100" />
        </div>
        <div className="h-4 border-l border-zinc-500 dark:border-zinc-700" />
        <div className="ml-2 flex flex-row items-center space-x-2">
          <p className="text-xs text-zinc-500 dark:text-zinc-100">
            {user.public_repos} Repos
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-100">
            {user.followers} Followers
          </p>
        </div>
      </div>
    </Link>
  )
}
