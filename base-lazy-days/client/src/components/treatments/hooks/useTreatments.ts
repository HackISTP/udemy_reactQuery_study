import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
// import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  // axiosInstance 와 treatments 를 사용하여 데이터를 갖고온다.
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  // const toast = useCustomToast();
  // useTreatments 를 설정하는 방식은 배열을 반환하는 것이다.
  // TODO: get data from server via useQuery
  const fallback = []; // 서버에서 데이터를 받지 않고 캐시가 비어있는경우 아무것도 표현하지 않도록 함
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments, {
    staleTime: 600000, //
    cacheTime: 900000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  // const { data = fallback } = useQuery(queryKeys.treatments, getTreatments, {
  //   onError: (error) => {
  //     // 만약 error가 자바스크립트 error클래스의 인스턴스라면 error의 message프로퍼티에 이름을 설정해야한다.
  //     // 이때 error가 Error클래스의 인스턴스 일때만 이부분 코드에 진입하기 때문에 message프로퍼티가 있다는것을 알고있다.
  //     const title =
  //       error instanceof Error
  //         ? error.message
  //         : 'error connection to the server';
  //     toast({ title, status: 'error' }); // title 이외에도 status:'error' 을 전달해서 사용자가 에러를 잘 인지하게끔 만든다.
  //   },
  // });
  return data;
}

export function usePrefetchTreatments(): void {
  // 캐시를 채우는것이 목적이기 때문에 아무것도 반환하지 않아도 된다.
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments, {
    // (쿼리키 , 쿼리함수)
    staleTime: 600000, //
    cacheTime: 900000,
  });
}
