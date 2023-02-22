import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CgSearch } from 'react-icons/cg';
import ProductCard from '../../../components/FinancialProdCard';
import ConfirmModal from '@/components/ui/ConfirmModal';

interface ISearchData {
  searchTarget?: string;
  searchKeyword?: string | number;
  sortDirection?: string;
  keyword?: string | number;
  isChecked?: boolean;
}

const Financial = () => {
  const initailData = {
    searchTarget: '',
    searchKeyword: '',
    keyword: '',
    sortDirection: '',
    isChecked: '',
  };
  // 내게 맞는 상품 보기 체크했을때 로그인 안된 상태라면 로그인 창으로 이동
  const navigate = useNavigate()
  const [modal, setModal] = useState(false);
  
  const { accessToken } = useSelector((state: any) => state.authToken);

  const [products, setProducts] = useState([]);

  const [keyword, setKeyword] = useState([]);
  const [page, setPage] = useState(1);

  // const handleChecked = ({ target }) => {
  //   if(target.checked && accessToken){
  //     setAvailableChecked(true)
  //   } else {
  //     setAvailableChecked(false)
  //   }
  //   console.log(availableChecked)
  // };
  
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    console.log(data.searchTarget, data.searchKeyword, data.sortDirection, data.isChecked)
    getSearchResult(data)
  };

  const getSearchResult = async (data) => {
    const BASEURI = `http://43.200.194.5:8080/search`;
    const { searchTarget, searchKeyword, sortDirection, isChecked }:ISearchData = data
    if(isChecked && !accessToken) {
      console.log('액세스토큰X')
      setModal(true)
      return
    }
    const reqURI = `
    ${BASEURI}?searchTarget=${searchTarget}&searchKeyword=${searchKeyword}&sortDirection=${sortDirection}&isChecked=${isChecked}&page=${page}`
    const res = await axios(reqURI);
    console.log(reqURI);
    console.log(res);
    if (res.data?.code === 200) {
      setProducts(res.data.data.content);
    }
  };

  // const addKeyword = (e) => {
  //   const clicked = e.target.value;
  //   setKeyword(e.target.value)    
  //   // getSearchResult(data)
  // };

  useEffect(() => {
    getSearchResult(initailData);
  }, []);

  return (
    <div>
      {/* <h2 className='mt-8 sm:mb-8 text-3xl font-bold'>태그로 찾기</h2>
      <div className='mb-16 flex flex-wrap gap-3'>
        {['대출', '소액', '신용', '부동산'].map((data, i) => (
          <Button key={i} data={data} addKeyword={addKeyword} isOn={false} />
        ))}
      </div> */}

      <h2 className='mt-8 text-3xl font-bold'>상품 검색</h2>
      <div className='mb-16'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-wrap gap-3 rounded-[10px]'>
          <div className='w-full sm:text-right text-left'>
            <label htmlFor='available' className=''>
              내가 가입할 수 있는 상품만 보기
            <input
              type='checkbox'
              id='available'
              className='ml-2'
              {...register('isChecked')}
            />
            </label>
          </div>

          <div className='pr-3 outline-none rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus:border-2 hover:border-2 focus:border-yellow invalid:border-light-gray valid:border-yellow hover:border-yellow text-lg'>
            <select
              {...register('searchTarget')}
              className='pl-3 py-3 outline-none focus:outline-none'
              // onChange={handleChangeSelect}
              // value={selected}
            >
              {/* <option hidden>선택하세요</option> */}
              <option value={''} defaultChecked={true}>
                전체
              </option>
              <option value={'name'}>상품명</option>
              <option value={'brand'}>은행명</option>
              <option value={'price'}>대출한도</option>
            </select>
          </div>

          <div className='pr-3 outline-none rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus:border-2 hover:border-2 focus:border-yellow invalid:border-light-gray valid:border-yellow hover:border-yellow text-lg'>
            <select {...register('sortDirection')} 
              className='pl-3 py-3 outline-none focus:outline-none'
              // onChange={handleChangeSelect} 
              // value={selected}
            >
              {/* <option hidden>선택하세요</option> */}
              <option value={''}>정렬</option>
              <option value={'ASC'}>오름차순</option>
              <option value={'DESC'}>내림차순</option>
            </select>
          </div>

          <div className='relative grow'>
            <input
              type='text'
              // required
              className='pl-4 pr-4 py-3 w-full rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus-within:border-yellow focus-within:border-2 valid:border-2'
              placeholder='원하는 상품을 검색하세요'
              // onChange={handleChangeWord}
              {...register('searchKeyword')}
            />
            <button
              className='absolute top-0 bottom-0 right-4 text-black40'
              type='submit'>
              <CgSearch size='26'></CgSearch>
            </button>
          </div>
        </form>
      </div>

      <div className='mb-16'>
        {products.length > 0 
        ? (products.map((data) => (
            <ProductCard key={data.productId} data={data} />
          ))) 
        : (<div className='my-40 flex justify-center items-center text-black40 font-bold text-lg'>
            등록된 상품이 없습니다.
          </div>)
        }
      </div>
      <button 
        // onClick={handleTotal} 
        className='mb-20 p-4 w-full rounded-[10px] bg-light-orange text-lg text-white'>
        더보기
      </button>

      <>
        {modal && (
          <ConfirmModal
            title='로그인이 필요한 서비스입니다.' 
            description='로그인 화면으로 이동하시겠습니까?'
            onConfirm={() => navigate('/')}
            onCancel={() => setModal(false)}
          />
        )}
      </>

    </div>
  );
};

// const Button = ({ data, addKeyword, isOn }) => {
//   const [isActive, setIsActive] = useState(isOn);
//   const btnToggle = (e) => {
//     setIsActive((prev) => !prev);
//     addKeyword(e);
//   };
//   return (
//     <button
//       type='button'
//       className={`px-6 py-2 rounded-full text-lg text-black40
//         ${
//           isActive
//             ? 'border-2 border-yellow text-yellow font-bold'
//             : 'border border-light-gray'
//         }`}
//       onClick={btnToggle}
//       value={data}>
//       {data}
//     </button>
//   );
// };

export default Financial;
