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
      ['searchResults', searchTarget, searchKeyword, sortTarget, sortDirection],
      ({ pageParam = 1 }) =>
        ax.getSearch(accessToken, {
          searchTarget,
          searchKeyword,
          sortTarget,
          sortDirection,
          page: pageParam,
        }),
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
      // return
      return <div>No accessToken</div>;
    }

  if (!data || dataPack.length == 0) {
    console.log('no Data', data)
    return <div className='flex items-center py-8 shadow-md rounded-b-lg rounded-t-3xl border border-black/10 transition-all bg-white px-8 mt-6'>
      <div className='w-full text-center'>
        <h3 className="font-bold text-black80 text-2xl">상품 정보가 없습니다</h3>
        <b className="font-semibold text-yellow"><span className='text-black40 text-sm'>검색 조건을 다시 확인해주세요</span></b>
      </div>
    </div>;
  }
  
  return (
    <div>
      {dataPack?.map((product: IProduct) =>
        isChecked ? (
          product.recommend && (
            <ProductCard key={product.productId} data={product} />
          )
        ) : (
          <ProductCard key={product.productId} data={product} />
        )
      )}

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
