import { toast } from '@/components/app/toast';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

function createTitle(errorMsg: string, actionType: 'query' | 'mutation') {
  const action = actionType === 'query' ? 'loading' : 'updating';
  return `could not ${action} data: ${
    errorMsg ?? 'error connecting to server'
  }`;
}

function errorHandler(title: string) {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  // one message per page load, not one message per query
  // the user doesn't care that there were three failed queries on the staff page
  //    (staff, treatments, user)
  const id = 'react-query-toast';

  if (!toast.isActive(id)) {
    const action = 'fetch';
    toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 10 min
      gcTime: 90000, // 15 min
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const title = createTitle(error.message, 'query');
      errorHandler(error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const title = createTitle(error.message, 'mutation');
      errorHandler(error.message);
    },
  }),
});
