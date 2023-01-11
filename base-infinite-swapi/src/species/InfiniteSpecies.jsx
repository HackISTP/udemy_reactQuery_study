import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "sw-people", //queryKey
    ({ pageParam = initialUrl }) => fetchUrl(pageParam), //쿼리함수 , pageParam 의 기본값 initialUrl
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined, //getNextPageParam 옵션주기 lastPage를 갖고있는 함수이다.
    }
  ); //{data, ,수집할 데이터가 더 있을지 결정(boolean)}
  return <InfiniteScroll />;
}
