import { useNotification } from '@web3uikit/core';

export function useErrorNotification() {
  const dispatch = useNotification();

  const handleWarningNotification = (message: string) => {
    dispatch({
      type: 'error',
      message,
      title: 'Error',
      position: 'topR',
    });
  };

  return handleWarningNotification;
}
