import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');

  const fallback = [];
  // TODO: get data from server via useQuery
  // 구조분해 프로퍼티의 이름을 data에서 staff로 바꿔서 반환객체에 staff를 반환할수 있도록 만듬
  const { data: staff = fallback } = useQuery(queryKeys.staff, getStaff); // useQuery(쿼리키 , 쿼리함수)

  return { staff, filter, setFilter };
}
