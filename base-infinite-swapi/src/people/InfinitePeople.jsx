import InfiniteScroll from 'react-infinite-scroller';
import { Person } from './Person';
import { useInfiniteQuery } from '@tanstack/react-query';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['sw-people'],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) return <div className='loading'>Loading...</div>;

  if (isError) return <div>Error: {error.toSting()}</div>;

  return (
    <>
      {isFetching && <div className='loading'>Loading...</div>}
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => {
          if (!isFetchingNextPage) fetchNextPage();
        }}
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                initialLoad={false}
                key={person.name}
                name={person.name}
                hairColor={person.hai_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
