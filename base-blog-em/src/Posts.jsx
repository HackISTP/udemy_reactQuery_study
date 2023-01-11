import { useState } from "react";
import { useQuery } from "react-query";
//useQuery는 서버에서 데이터를 가져올때 사용할 훅이다.
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1); //1페이지로 설정
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery(
    ["posts", currentPage], //[쿼리키 , 쿼리키 ] 배열이 바뀌면 함수도 바뀌기 때문에 데이터가 변경된다.
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
    }
  ); //useQuery(쿼리키 , 쿼리 함수(posts 라는 쿼리에 대한 데이터를 가져오는 방법), 옵션)
  if (isLoading) return <h3>Loading..</h3>;
  if (isError)
    return (
      <>
        <h3>Error Page</h3>
        <p>{error.toString()}</p>
      </>
    );
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1} //currentPage 번호가 1번이거나 1이하이면 Previous page 버튼을 비활성호ㅏ시킴
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
