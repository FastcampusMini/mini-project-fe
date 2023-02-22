import { useMutation, useQueryClient } from '@tanstack/react-query';
import cogoToast from 'cogo-toast';
import { ax } from '../axiosClient';
/** 로그인을 요청할 수 있습니다.
 * const { mutate, isLoading } = useLogin();
 * mutate({email: "testt", password: "testt"}); 로그인요청
 * 성공하면 onSuccess 의 함수가 실행됩니다. (일단은 react-query 에 토큰을 캐싱하도록 해놓음)
 */
const usePatchUser = () => {
  const result = useMutation({
    mutationFn: ({ accessToken, payload }: any) =>
      ax.patchUserEdit(accessToken, payload),
    onSuccess: () => cogoToast.success('정보가 수정되었습니다'),
    onError: (err: Error) => cogoToast.error(`에러발생 ${err?.message}`),
  });

  return result;
};

export default usePatchUser;
