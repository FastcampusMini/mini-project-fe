import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {ax} from '@libs/axiosClient'
import { useSelector } from 'react-redux';
import { CgSearch } from 'react-icons/cg';
import Search from '@/components/Search';
import ProductCard from '../../../components/FinancialProdCard';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Navigation from '@components/ui/Navigation';

// interface ISearchData {
//   searchTarget?: string;
//   searchKeyword?: string | number;
//   sortDirection?: string;
//   keyword?: string | number;
//   isChecked?: boolean;
// }

const Financial = () => {
  // const [datas, setDatas] = useState({
  //   searchTarget: '',
  //   searchKeyword: '',
  //   sortDirection: '',
  //   isChecked: ''
  // })

  // const {
  //   searchTarget, searchKeyword, sortDirection, isChecked
  // } = datas

  // const initialData = {
  //   searchTarget: '', 
  //   searchKeyword: '', 
  //   sortDirection: '', 
  //   isChecked: ''
  // }

  const [searchTarget, setSearchTarget] = useState()
  const [searchKeyword, setSearchKeyword] = useState()
  const [sortTarget, setSortTarget] = useState()
  const [sortDirection, setSortDirection] = useState()
  const [isChecked, setIsChecked] = useState()

  const navigate = useNavigate()
  const [modal, setModal] = useState(false);  
  const { accessToken } = useSelector((state: any) => state.authToken);
  // const [products, setProducts] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log('onsubmit 클릭')
    console.log(data)
    setSearchTarget(data.searchTarget)
    setSearchKeyword(data.searchKeyword)
    setSortTarget(data.searchTarget)
    setSortDirection(data.sortDirection)
    setIsChecked(data.isChecked)
  };

  // useEffect(() => {
  //   console.log('useEffect 실행')
  //   const getSearchResult = async (datas) => {
  //     const product = await ax.getSearch({...datas})
  //     console.log({...datas})
  //     setProducts(product.content)
  //   }
  //   getSearchResult(datas)
  // }, [])

  useEffect(() => {    
    console.log(searchTarget, searchKeyword, sortTarget, sortDirection, isChecked)
    console.log(accessToken)
  })

  // const getSearchResult = async (formData) => {
  //   const BASEURI = `http://43.200.194.5:8080/search`;
  //   const { searchTarget, searchKeyword, sortDirection, isChecked }:ISearchData = formData
  //   if(isChecked && !accessToken) {
  //     setModal(true)
  //     return
  //   }
  //   const reqURI = `
  //   ${BASEURI}?searchTarget=${searchTarget}&searchKeyword=${searchKeyword}&sortDirection=${sortDirection}&isChecked=${isChecked}&page=${page}`
  //   const res = await axios(reqURI);
  //   console.log(reqURI);
  //   console.log(res);
  //   if (res.data?.code === 200) {
  //     setProducts(res.data.data.content);
  //   }
  // };

  // useEffect(() => {
    // getSearchResult(datas);
  // }, []);

  return (
    <div>
      <h2 className='mt-8 text-3xl font-bold'>상품 검색</h2>
      <div className='mb-16'>
        <form
          className='flex flex-wrap gap-3 rounded-[10px]'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-full sm:text-right text-left'>
            <label htmlFor='available' className=''>
              내가 가입할 수 있는 상품만 보기
            <input
              type='checkbox'
              id='available'
              className='ml-2'
              {...register('isChecked')}
              name='isChecked'
              // onChange={onChange}
            />
            </label>
          </div>

          <div className='pr-3 outline-none rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus:border-2 hover:border-2 focus:border-yellow invalid:border-light-gray valid:border-yellow hover:border-yellow text-lg'>
            <select
              className='pl-3 py-3 outline-none focus:outline-none'
              {...register('searchTarget')}
              name='searchTarget'
              // onChange={onChange}
              >
              <option value={''} defaultChecked={true}>
                전체
              </option>
              <option value={'name'}>상품명</option>
              <option value={'brand'}>은행명</option>
              <option value={'price'}>대출한도</option>
            </select>
          </div>

          <div className='pr-3 outline-none rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus:border-2 hover:border-2 focus:border-yellow invalid:border-light-gray valid:border-yellow hover:border-yellow text-lg'>
            <select 
              className='pl-3 py-3 outline-none focus:outline-none'
              {...register('sortDirection')} 
              name='sortDirection'
              // onChange={onChange}
            >
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
              {...register('searchKeyword')}
              name='searchKeyword'
              // onChange={onChange}
            />
            <button
              className='absolute top-0 bottom-0 right-4 text-black40'
              type='submit'
            >
              <CgSearch size='26'></CgSearch>
            </button>
          </div>
        </form>
      </div>

      <div className='mb-16'>
        <div className='h-[calc(100vh-360px)] scrollbar pr-8 scrollbar-thumb-black/20 scrollbar-track-black/20 overflow-y-scroll scrollbar-thumb-rounded-md scrollbar-track-rounded-md'>
          {
          // products.length > 0 
          // ? 
          //   (products.map((data) => (
          //     <ProductCard key={data.productId} data={data} />
          //   ))) 
            <Search name='' searchTarget={searchTarget} searchKeyword={searchKeyword} sortTarget={sortTarget} sortDirection={sortDirection} isChecked={isChecked} accessToken={accessToken} />
          // : (<div className='my-40 flex justify-center items-center text-black40 font-bold text-lg'>
          //     등록된 상품이 없습니다.
          //   </div>)
          }
          {/* <button 
            className='mb-20 p-4 w-full rounded-[10px] bg-light-orange text-lg text-white'>
            더보기
          </button> */}
        </div>
      </div>

      <Navigation />

      <>
        {modal && (
          <ConfirmModal
            title='로그인이 필요한 서비스입니다.' 
            description='로그인 화면으로 이동하시겠습니까?'
            onConfirm={() => navigate('/signin')}
            onCancel={() => setModal(false)}
          />
        )}
      </>

    </div>
  );
};

export default Financial;
