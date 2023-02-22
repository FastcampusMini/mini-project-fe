import { useState } from 'react';
import { ax } from '../libs/axiosClient';
import { combinePagesContent } from '../libs/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

const Search = ({ name, accessToken }) => {
  const [dataPack, setDataPack] = useState([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['searchResults', name],
      ({ pageParam = 1 }) =>
        ax.getSearch(accessToken, { name, page: pageParam }),
      {
        getNextPageParam: (lastPage) => {
          return (
            lastPage.pageNumber !== lastPage.totalPages &&
            lastPage.pageNumber + 1
          );
        },
        onSuccess: (data) => setDataPack(combinePagesContent(data.pages)),
      }
    );
  if (!accessToken) {
    return <div>No accessToken</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {dataPack?.map((product: IProduct) => (
        <div key={product.productId}>{product.brand}</div>
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className='border'>
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </button>
      )}
    </div>
  );
};

export default Search;
