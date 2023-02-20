import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ConfirmModal from "../../../components/ui/ConfirmModal";

const Id = () => {
  const { financialId } = useParams()
  const [modal, setModal] = useState(false)
  const [detail, setDetail] = useState()

  const headers = {
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2ODI5NDE1LCJleHAiOjE2NzY4MzEyMTUsImVtYWlsIjoiaHMxIn0.WwFOTU8-BHkzFc7li33qvnw3PTVcgI_hwa0vlb6KU0Y'
  }
  
  useEffect(() => {
    console.log('useEffect 실행')
    getSearchResult()
    console.log('detail : ', detail)
  }, [])

  async function getSearchResult () {
    console.log('getSearchResult 실행')
    const BASEURI = `http://52.78.32.230:8080/api/products/details?products_id=${financialId}`
    const res = await axios(BASEURI, {
      headers
    })
    setDetail(res.data.data)
  }

  return (
    <div className="pt-16">
      {console.log('return render')}
      {console.log(detail)}
      <img className="w-32" src={detail?.logo} alt="cartItem_logo" />
      <h2 className="my-8 text-3xl font-bold">{detail?.name}</h2>

      <ul className="mb-12 flex flex-wrap gap-3">
        {['20대 이상', '파킹통장', '세테크', '청년', '경기도', '낮은이자', '그 외 필터'].map((data, i) => (
          <li key={i} className='px-4 py-2 rounded-full bg-black5 text-black40 font-bold'>{data}</li>
        ))}
      </ul>

      <div className="py-2 flex justify-between text-lg">
        <span className="text-black40 font-bold">이율</span>
        <b className="text-orange">최저 {detail?.rate} %</b>
      </div>
      <div className="py-2 flex justify-between text-lg">
        <span className="text-black40 font-bold">문의</span>
        <b>{detail?.detail}</b>
      </div>

      <div className="my-10 flex justify-center items-center h-48 rounded-[10px] border border-black20 text-black40 font-bold bg-black5 overflow-hidden">상품 이미지 준비중</div>

      <h3 className="mt-10 mb-4 text-2xl font-bold">상품 설명</h3>
      <div className="text-orange font-bold text-lg">청년 대출을 만나보세요. 소득이 없거나 재직기간이 1년 미만인 직장인도 만 19-34세 무주택 청년이라면 대출신청이 가능합니다.</div>
      <h3 className="mt-12 mb-4 text-2xl font-bold">안내 사항</h3>
      <ul className="text-black60 text-lg">
        <li>상품 약관 등 추가할 수 있는 정보. 길이 제한 없음.</li>
        <li>- 연체 이자율 : 회원별 · 이용상품별 정상이자율 + 3%p(최고 연 24%)
        </li>
        <li>- 연체발생시점에 정상이자율이 없는 경우 아래와 같이 적용.
        </li>
        <li>- 상환능력에 비해 신용카드 사용액이 과도할 경우 귀하의 개인신용평점이 하락할 수 있습니다.
        </li>
      </ul>
      
      <button 
        type="button" 
        className="mt-20 p-4 w-full rounded-[10px] bg-gray text-white text-lg font-bold" 
        onClick={() => setModal(true)}
      >장바구니 담기
      </button>
      <button 
        type="button" 
        className="mt-6 mb-20 p-4 w-full rounded-[10px] bg-yellow text-white text-lg font-bold" 
        onClick={() => setModal(true)}
      >신청하기
      </button>

      {modal && (
        <ConfirmModal
          title='신청하시겠습니까?'
          description=''
          onConfirm={() => setModal(false)}
          onCancel={() => setModal(false)}
        />
      )}
    </div>
  );
};

export default Id;
