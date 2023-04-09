import Post from "../blog/posts";
import HighlightPost from "../blog/highlightPost";
import { useReducer } from "react";

const Blog = ({ posts }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOAD_MORE":
        return {
          ...state,
          posts: [...state.posts, ...posts.slice(state.posts.length + 1, state.posts.length + 3)],
        };
      default:
        return state;
    }
  }, { posts: posts.slice(1, 3) });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">📝 Blog</h1>
        <br />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          I write about my experiences and what I learn.
        </p>
      </div>
      <div className="mt-10 flex">
        <div className="container mx-auto space-y-6 p-6 sm:space-y-12">
          <HighlightPost
            slug={posts[0].slug}
            title={posts[0].title}
            coverImage={posts[0].coverImage}
            date={posts[0].date}
            description={posts[0].description}
          />
          <hr className="mb-24 mt-28 w-full" />
          <Post posts={state.posts} />
          {state.posts.length < posts.length - 1 && (
            <div className="flex justify-center">
              <button
                onClick={() => dispatch({ type: "LOAD_MORE" })}
                className="rounded-full bg-black px-4 py-2 font-bold text-white"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
