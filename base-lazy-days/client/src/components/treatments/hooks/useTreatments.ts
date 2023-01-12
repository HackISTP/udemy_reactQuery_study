import { useQuery } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  // axiosInstance 와 treatments 를 사용하여 데이터를 갖고온다.
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  // useTreatments 를 설정하는 방식은 배열을 반환하는 것이다.
  // TODO: get data from server via useQuery
  const fallback = []; // 서버에서 데이터를 받지 않고 캐시가 비어있는경우 아무것도 표현하지 않도록 함
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments);
  return data;
}
