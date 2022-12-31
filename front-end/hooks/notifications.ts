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

export function useSuccessNotification() {
  const dispatch = useNotification();

  const handleSuccessNotification = (message: string) => {
    dispatch({
      type: 'success',
      message,
      title: 'Success',
      position: 'topR',
    });
  };

  return handleSuccessNotification;
}
