export interface PostData {
  id: number
  title: string
  description: string
  coverImage: string
  date: string
  ogImageURL: string
  content: string
  author: string
  authorImage: string
  published: boolean
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>
