import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
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

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      //10번페이지에 있으면 미리 데이터를 가져오지 않아도 된다는 조건
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      ); //다음페이지가 무엇이든간에 미리 데이터를 가져와야한다,
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  //isLoading, isFetching 차이
  //isLoading = 캐시된 데이터조차 없이, 처음 실행된 쿼리 일 때 로딩 여부에 따라 true/false로 나누어 진다.
  //isFetching =  어떠한 react-query요청 내부의 비동기 함수가 처리되었는지 여부 에 따라 true/false로 나누어 진다
  const { data, isError, error, isLoading, isFetching } = useQuery(
    ["posts", currentPage], //[쿼리키 , 쿼리키 ] 의존성배열이 바뀌면 함수도 바뀌기 때문에 데이터가 변경된다.
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
      keepPreviousData: true, //쿼리키가 바뀌더라두 지난 데이터를 유지해서 혹여나 이전페이지로 돌아갔을때 캐시에 해당 데이터가 있도록 만들어줌
    }
  ); //useQuery(쿼리키 , 쿼리 함수(posts 라는 쿼리에 대한 데이터를 가져오는 방법), 옵션)
  if (isLoading) return <h3>Loading..</h3>;
  if (isFetching) return <h3>Fetching..</h3>;
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
