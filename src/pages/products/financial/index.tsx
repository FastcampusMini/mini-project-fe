import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CgSearch } from 'react-icons/cg';
import Search from '@/components/Search';
import Nav from '@components/Nav';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Navigation from '@components/ui/Navigation';

const Financial = () => {
  const [searchTarget, setSearchTarget] = useState()
  const [searchKeyword, setSearchKeyword] = useState()
  const [sortTarget, setSortTarget] = useState()
  const [sortDirection, setSortDirection] = useState()
  const [isChecked, setIsChecked] = useState()

  const navigate = useNavigate()
  const [modal, setModal] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data:any) => {
    console.log(data)
    setSearchTarget(data.searchTarget)
    setSearchKeyword(data.searchKeyword)
    setSortTarget(data.searchTarget)
    setSortDirection(data.sortDirection)
    setIsChecked(data.isChecked)
  };

  return (
    <div className='h-full overflow-y-scroll'>
      <Nav left='arrow' right='arrow' addClass='mt-5' />
      <div className='px-10 relative'>
        <div className='bg-yellow w-full h-96 absolute top-[-88px] left-0 right-0 -z-40'>
          {/*배경 */}
        </div>
        <h2 className='text-3xl font-bold'>상품 검색</h2>
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
              />
              </label>
            </div>
            <div className='pr-3 outline-none rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus:border-2 hover:border-2 focus:border-yellow invalid:border-light-gray valid:border-yellow hover:border-yellow text-lg'>
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
            <div className='pr-3 outline-none rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus:border-2 hover:border-2 focus:border-yellow invalid:border-light-gray valid:border-yellow hover:border-yellow text-lg'>
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
                // required
                className='pl-4 pr-4 py-3 w-full rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus-within:border-yellow focus-within:border-2 valid:border-2'
                placeholder='원하는 상품을 검색하세요'
                {...register('searchKeyword')}
                name='searchKeyword'
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
        <div className='mb-24'>
          <div>
            {<Search searchTarget={searchTarget} searchKeyword={searchKeyword} sortTarget={sortTarget} sortDirection={sortDirection} isChecked={isChecked} />}
          </div>
        </div>              
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
      <Navigation />  
    </div>
  );
};

export default Financial;