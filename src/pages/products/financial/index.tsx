import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { CgSearch } from 'react-icons/cg';
import ProductCard from '../../../components/FinancialProdCard';

const Financial = () => {
  // name : {...register("해당inputName")}, handleSubmit : onsubmit={handleSubmit(onSubmit)}
  // const {register, handleSubmit} = useForm()
  const [keyword, setKeyword] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState();

  useEffect(() => {
    getSearchResult(keyword);
  }, [keyword]);

  const getSearchResult = async (keyword) => {
    const page = 1;
    const BASEURI = `http://52.78.32.230:8080/search?name=${keyword}&page=${page}`;
    const res = await axios(BASEURI);
    setProducts(res.data.data.content);
    console.log(BASEURI);
  };

  const addKeyword = (e) => {
    const clicked = e.target.value;
    // let newKeyword = []
    // newKeyword = keyword.includes(clicked) ? keyword.filter((item) => item != clicked) : [...keyword, clicked]
    keyword.indexOf(clicked) > -1
      ? setKeyword(keyword.filter((item) => item != clicked))
      : setKeyword([...keyword, clicked]);
    // setKeyword(newKeyword)
  };

  return (
    <div>
      <h2 className='mt-8 sm:mb-8 text-3xl font-bold'>상품 검색</h2>
      <div className='mb-16'>
        <form className='flex flex-wrap gap-3 rounded-[10px]'>
          <div className='w-full sm:text-right text-left'>
            <label htmlFor='check1' className=''>
              내가 가입할 수 있는 상품만 보기
            </label>
            <input type='checkbox' id='check1' className='ml-2' />
          </div>

          <div className='pr-3 py-2 outline-none rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus:border-2 hover:border-2 focus:border-yellow invalid:border-light-gray valid:border-yellow hover:border-yellow text-lg'>
            <select className='pl-3 outline-none focus:outline-none'>
              <option hidden>상품 유형</option>
              <option value={''}>전체</option>
              <option value={''}>대출</option>
              <option value={''}>예금</option>
            </select>
          </div>

          <div className='pr-3 outline-none rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus:border-2 hover:border-2 focus:border-yellow invalid:border-light-gray valid:border-yellow hover:border-yellow text-lg'>
            <select className='pl-3 py-2 outline-none focus:outline-none'>
              <option hidden>연봉</option>
              <option value={''}>전체</option>
              <option value={''}>2000 미만</option>
              <option value={''}>3000 미만</option>
              <option value={''}>4000 미만</option>
              <option value={''}>5000 이상</option>
            </select>
          </div>

          <div className='relative grow'>
            <input
              type='text'
              required
              className='pl-4 pr-4 py-3 w-full h-full rounded-full border-2 border-light-gray bg-white overflow-hidden focus:outline-none focus-within:border-yellow focus-within:border-2 valid:border-2 valid:border-yellow'
              placeholder='원하는 상품을 검색하세요'
              defaultValue={''}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button
              className='absolute top-0 bottom-0 right-4 text-black40'
              type='submit'>
              <CgSearch size='26'></CgSearch>
            </button>
          </div>
        </form>
      </div>

      <h2 className='my-8 text-3xl font-bold'>키워드로 찾기</h2>
      <div className='mb-16 flex flex-wrap gap-3'>
        {['대출', '소액', '세테크', '부동산'].map((data, i) => (
          // i !== 0
          // ? <Button key={i} data={data} addKeyword={addKeyword} isOn={false} />
          // : <Button key={i} data={data} addKeyword={addKeyword} isOn={true} />
          <Button key={i} data={data} addKeyword={addKeyword} isOn={false} />
        ))}
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
