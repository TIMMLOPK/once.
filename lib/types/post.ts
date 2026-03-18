export interface PostData {
  slug: string
  title: string
  description: string
  coverImage: string
  date: string
  ogImageURL: string
  author: string
  authorImage: string
  published: boolean
  readingTime: number
}

export interface PostFrontmatter {
  title: string
  description: string
  coverImage: string
  date: string
  author?: string
  authorImage?: string
  published?: boolean
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>
