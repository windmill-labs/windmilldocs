import React from "react";

interface Props {
  readonly recentPosts: readonly { readonly content: any }[];
}

const Home = ({ recentPosts }: Props) => {
  return (

    <div className="container">
      <div className="row">
        <div className="col col--9 col--offset-1">
          {recentPosts.map(({ content: BlogPostContent }) => (
            JSON.stringify(BlogPostContent)
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;