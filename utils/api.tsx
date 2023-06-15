type keyToLowerCase<T> = {
  [K in keyof T as Lowercase<string & K>]: T[K];
};

export type ReturnData = keyToLowerCase<PostData>;

export interface PostData {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  ogImageURL: string;
  content: string;
  author: string;
  authorImage: string;
  published: boolean;
}
