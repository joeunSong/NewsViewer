import { useEffect, useState } from 'react';

/**
 * promise의 대기중, 완료 결과, 실패 결과에 대한 상태를 관리
 *
 * @param {*} promiseCreator
 * @param {*} deps usePromise의 의존 배열
 * @returns
 */
export default function usePromise(promiseCreator, deps) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // dips 배열이 usePromise 내부에서 사용한 useEffect의 의존 배열로 설정하는 부분에서 ESLint 경고 발생
    // ESLint 규칙을 무시하도록 하는 주석
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return [loading, resolved, error];
}
