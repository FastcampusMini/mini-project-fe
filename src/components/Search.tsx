import { useState } from 'react';
import { ax } from '../libs/axiosClient';
import { combinePagesContent } from '../libs/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductCard from '@components/FinancialProdCard';

const Search = ({accessToken, searchTarget, searchKeyword, sortTarget, sortDirection, isChecked }) => {
  console.log(searchTarget, searchKeyword, sortTarget, sortDirection, isChecked)
  const [dataPack, setDataPack] = useState([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['searchResults', searchTarget, searchKeyword, sortTarget, sortDirection, isChecked],
      ({ pageParam = 1 }) =>
        ax.getSearch(accessToken, { searchTarget, searchKeyword, sortTarget, sortDirection, isChecked, page: pageParam }),
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
      return
      // return <div>No accessToken</div>;
    }

  if (!data) {
    console.log('no Data')
    return <div>상품 정보가 없습니다.</div>;
  }
  
  return (
    <div>
      {dataPack?.map((product: IProduct) => (
        <ProductCard key={product.productId} data={product} />
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className='mt-6 mb-20 p-4 w-full rounded-[10px] bg-light-orange text-lg text-white'>
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </button>
      )}
    </div>
  );
};

export default Search;
