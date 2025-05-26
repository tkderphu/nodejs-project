// ConfirmDialog.tsx
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const showConfirm = (
  title: string,
  message: string,
  onConfirm: () => void
): void => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: 'Đồng ý',
        onClick: onConfirm,
      },
      {
        label: 'Không đồng ý',
        onClick: () => console.log('Cancelled'),
      },
    ],
  });
};
