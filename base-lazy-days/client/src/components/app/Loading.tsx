import { Spinner, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useIsFetching } from 'react-query';

export function Loading(): ReactElement {
  // will use React Query `useIsFetching` to determine whether or not to display
  // useIsFetching은 현재 가져오기 상태인 쿼리 호출의 수를 나타내는 정수값을 반환합니다.
  const isFetching = useIsFetching();
  // const isFetching = false; // false 는 절대 가져오지 않는걸 의미

  const display = isFetching ? 'inherit' : 'none'; //  isFetching 이 0보다 크면 가져오기 상태인 호출이 존재하며 참으로 평가됨

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
