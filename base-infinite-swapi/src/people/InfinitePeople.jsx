import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/"; //pageParam 의 기본값
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  // const {ImfiniteScroll을 작성할때 사용할수 있는 data , 더 많은 데이터가 필요할때 어느함수를 실행할지 ImfiniteScroll에 지시하는 역할을 한다.
  //,수집할 데이터가 더 있는지를 결정하는 boolean 타입 , 캐시된 데이터가 없을때 데이터를 가져올 거다 }= useInfiniteQuery
  //isFetching = 새로운 페이지를 열어야 할때 조기반환이 실행된다.
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    //쿼리키 , 쿼리 함수
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam), //pageParam은 fetchNextPage이 어떻게 보일지결정하고 다음 페이지가 있는지결정한다,
    {
      //getNextPageParam 에 옵션을 줌
      //이 옵션은 lastPage를 가진 함수이다.
      //fetchNextPage 를 실행하면 next 프로퍼티가 무엇인지에 따라 마지막 페이지에 도착한 다음 pageParam을 사용하게 된다.
      //lastPage.next 가 null 이면 undefined반환
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  if (isLoading) return <div className="loading">Loading...</div>;
  //if (isFetching) return; 조기반환 되어 데이터를 새로 가져올때마다 스크롤이 위로 올라감
  if (isError) return <div>Error! {error.toString()}</div>;
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      {/* 조기반환 없이 화면에 Loading 표출  */}
      <InfiniteScroll
        loadMore={fetchNextPage} //추가로 데이터가 필요할때는 fetchNextPage를 불러오게 하고
        hasMore={hasNextPage} //데이터가 더 있는지 확인하기 위해 hasMore 프로퍼티를 추가한다.
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
