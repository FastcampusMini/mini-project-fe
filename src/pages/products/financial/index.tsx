import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Search from '@/components/Search';
import Nav from '@components/Nav';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Navigation from '@components/ui/Navigation';
import { CgSearch } from 'react-icons/cg';
import { BsCheckLg } from 'react-icons/bs';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';

const Financial = () => {
  const { accessToken } = useSelector((state: any) => state.authToken);
  const [searchTarget, setSearchTarget] = useState();
  const [searchKeyword, setSearchKeyword] = useState();
  const [sortTarget, setSortTarget] = useState();
  const [sortDirection, setSortDirection] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [modal, setModal] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setSearchTarget(data.searchTarget);
    setSearchKeyword(data.searchKeyword);
    setSortTarget(data.searchTarget);
    setSortDirection(data.sortDirection);
    setIsChecked(isChecked);
  };

  const ref = useRef(null);
  const scrollToTop = () => {
    ref.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <BsFillArrowUpSquareFill
        className='absolute right-10 bottom-28 z-30 text-black/20 cursor-pointer transition-colors hover:text-black/50 hover:scale-110'
        size={40}
        onClick={scrollToTop}
      />
      <div className='h-full overflow-y-scroll scrollbar-none' ref={ref}>
        <Nav left='arrow' right='arrow' addClass='mt-5' />
        <div className='px-10 relative'>
          <div className='bg-yellow w-full h-96 absolute top-[-88px] left-0 right-0 -z-40'>{/*배경 */}</div>
          <h2 className='text-3xl font-bold'>상품 검색</h2>
          <div className='mt-4 mb-16'>
            <form className='flex flex-wrap gap-3 rounded-[10px]' onSubmit={handleSubmit(onSubmit)}>
              <div className='w-full sm:text-right text-left'></div>
              <div className='pr-3 outline-none rounded-full border border-white bg-white overflow-hidden focus:outline-none text-lg'>
                <select
                  className='pl-3 py-3 outline-none focus:outline-none'
                  {...register('searchTarget')}
                  name='searchTarget'
                >
                  <option value={''} defaultChecked={true}>
                    전체
                  </option>
                  <option value={'name'}>상품명</option>
                  <option value={'brand'}>은행명</option>
                  <option value={'price'}>대출한도</option>
                </select>
              </div>
              <div className='pr-3 outline-none rounded-full border border-white bg-white overflow-hidden focus:outline-none text-lg'>
                <select
                  className='pl-3 py-3 outline-none focus:outline-none'
                  {...register('sortDirection')}
                  name='sortDirection'
                >
                  <option value={''}>정렬</option>
                  <option value={'ASC'}>오름차순</option>
                  <option value={'DESC'}>내림차순</option>
                </select>
              </div>
              <div className='relative grow'>
                <input
                  type='text'
                  className='pl-4 pr-4 py-3 w-full rounded-full border border-white bg-white overflow-hidden focus:outline-none'
                  placeholder='원하는 상품을 검색하세요'
                  {...register('searchKeyword')}
                  name='searchKeyword'
                />
                <button className='absolute top-0 bottom-0 right-4 text-black40' type='submit'>
                  <CgSearch size='26'></CgSearch>
                </button>
              </div>
              <button
                type='submit'
                id='available'
                className={`w-full px-4 py-3 border rounded-full font-bold ${
                  isChecked ? 'border-white bg-white text-orange shadow-lg shadow-orange/50' : 'text-white '
                }`}
                name='isChecked'
                onClick={() => setIsChecked((e) => !e)}
              >
                내가 가입할 수 있는 상품만 {isChecked ? '보는중' : '보기'}
                <span className='ml-2'>
                  <BsCheckLg size='22' className='inline-block relative p-1 top-[-2px] border rounded-full'></BsCheckLg>
                </span>
              </button>
            </form>
          </div>
          <div className='mb-24'>
            <div>
              {
                <Search
                  searchTarget={searchTarget}
                  searchKeyword={searchKeyword}
                  sortTarget={sortTarget}
                  sortDirection={sortDirection}
                  isChecked={isChecked}
                  accessToken={accessToken}
                />
              }
            </div>
          </div>
        </div>
        <Navigation pathname={pathname} />
      </div>
    </>
  );
};

export default Financial;
