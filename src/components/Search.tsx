import { useState } from 'react';
import { ax } from '../libs/axiosClient';
import { combinePagesContent } from '../libs/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductCard from '@components/FinancialProdCard';

const Search = ({ name, accessToken, searchTarget, searchKeyword, sortTarget, sortDirection, isChecked}) => {
  const [dataPack, setDataPack] = useState([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['searchResults', searchTarget, searchKeyword, sortTarget, sortDirection, isChecked],
      ({ pageParam = 1 }) =>
        ax.getSearch(accessToken, { name, searchTarget, searchKeyword, sortTarget, sortDirection, isChecked, page: pageParam }),
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
    console.log('액세스토큰 없음')
    // return
    // return <div>No accessToken</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {dataPack?.map((product: IProduct) => (
        // <div key={product.productId}>{product.brand}</div>
        <ProductCard key={product.productId} data={product} />
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className='mb-20 p-4 w-full rounded-[10px] bg-light-orange text-lg text-white'>
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </button>
      )}
    </div>
  );
};

export default Search;
