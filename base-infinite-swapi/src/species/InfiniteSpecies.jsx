import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './Species';
import { useInfiniteQuery } from '@tanstack/react-query';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['sw-species'],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) return <div className='loading'>Loading...</div>;

  if (isError) return <div>Error: {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className='loading'>Loading...</div>}
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => {
          if (!isFetchingNextPage) fetchNextPage();
        }}
      >
        {data.pages.map((pageData) =>
          pageData.results.map((specie) => (
            <Species
              averageLifespan={specie.average_lifespan}
              language={specie.language}
              name={specie.name}
              key={specie.name}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
