import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CgSearch } from 'react-icons/cg';
import ProductCard from '../../../components/FinancialProdCard';

interface ISearchData {
  searchTarget?: string;
  searchKeyword?: string | number;
  keyword?: string | number;
  isChecked?: boolean;
}

const Financial = () => {
  const initailData = {
    searchTarget: null,
    searchKeyword: null,
    keyword: null,
    isChecked: false,
  };
  // 내게 맞는 상품 보기 체크했을때 로그인 안된 상태라면 로그인 창으로 이동
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [keyword, setKeyword] = useState([]);
  const [page, setPage] = useState(1);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data.searchTarget, data.searchKeyword, data.isChecked);
    getSearchResult(data);
  };

  const getSearchResult = async (data) => {
    const BASEURI = `http://52.78.32.230:8080/search`;
    const { searchTarget, searchKeyword, isChecked } = data;
    const reqURI = `${BASEURI}?searchTarget=${searchTarget}&searchKeyword=${searchKeyword}&isChecked=${isChecked}&page=${page}`;
    const res = await axios(reqURI);
    console.log(reqURI);
    console.log(res);
    if (res.data?.code === 200) {
      setProducts(res.data.data.content);
    }
  };

  const addKeyword = (e) => {
    const clicked = e.target.value;
    setKeyword(e.target.value);

    // getSearchResult(data)
  };

  // const [selected, setSelected] = useState('');
  // const handleChangeSelect = (e) => {
  //   setSelected(e.target.value)
  //   console.log(e.target.value)
  //   // setKeyword(e.target.options[e.target.selectedIndex].text)
  // }
  // const handleChangeWord = (e) => {
  //   setKeyword(e.target.value)
  //   console.log(e.target.value)
  // }
  // const [isChecked, setIsChecked] = useState('');
  // const handleChangechecked = (e) => {
  //   // if(accessToken) {
  //     // setIsChecked(e.target.checked)
  //     // console.log(e.target.checked)
  //   // } else {
  //   //   navigate('/')
  //   // }
  // }

  useEffect(() => {
    getSearchResult(initailData);
  }, []);

  return (
    <div>
      <h2 className='mt-8 sm:mb-8 text-3xl font-bold'>태그로 찾기</h2>
      <div className='mb-16 flex flex-wrap gap-3'>
        {['대출', '소액', '신용', '부동산'].map((data, i) => (
          <Button key={i} data={data} addKeyword={addKeyword} isOn={false} />
        ))}
      </div>

      <h2 className='mt-8 text-3xl font-bold'>상품 검색</h2>
      <div className='mb-16'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-wrap gap-3 rounded-[10px]'>
          <div className='w-full sm:text-right text-left'>
            <label htmlFor='available' className=''>
              내가 가입할 수 있는 상품만 보기
            </label>
            <input
              type='checkbox'
              id='available'
              className='ml-2'
              {...register('isChecked')}
              // onChange={handleChangechecked}
            />
            {/* ////////////////////////////////////////////////////////// */}
            <label htmlFor='available2' className=''>
              오름차순
            </label>
            <input
              type='checkbox'
              id='available2'
              className='ml-2'
              // {...register('isChecked')}
              // onChange={handleChangechecked}
            />
            <label htmlFor='available3' className=''>
              내림차순
            </label>
            <input
              type='checkbox'
              id='available3'
              className='ml-2'
              // {...register('isChecked')}
              // onChange={handleChangechecked}
            />
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
        {products.length > 0 ? (
          products.map((data) => (
            <ProductCard key={data.productId} data={data} />
          ))
        ) : (
          <div className='my-40 flex justify-center items-center text-black40 font-bold text-lg'>
            등록된 상품이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

const Button = ({ data, addKeyword, isOn }) => {
  const [isActive, setIsActive] = useState(isOn);
  const btnToggle = (e) => {
    setIsActive((prev) => !prev);
    addKeyword(e);
  };
  return (
    <button
      type='button'
      className={`px-6 py-2 rounded-full text-lg text-black40
        ${
          isActive
            ? 'border-2 border-yellow text-yellow font-bold'
            : 'border border-light-gray'
        }`}
      onClick={btnToggle}
      value={data}>
      {data}
    </button>
  );
};

export default Financial;
