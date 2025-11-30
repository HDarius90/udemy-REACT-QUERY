import { queryKeys } from './constants';

export const generateKey = (userId: number, userToken: string) => {
  return [queryKeys.user, userId, userToken];
};
