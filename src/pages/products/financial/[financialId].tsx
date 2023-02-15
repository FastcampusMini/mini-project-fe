import React from "react";
import { useParams } from "react-router-dom";

const Id = () => {
  const { financialId } = useParams();

  return (
    <div className="pt-16">      
      <img className="w-32" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/KB_logo.svg/220px-KB_logo.svg.png" alt="cartItem_logo" />
      <h2 className="my-8 text-3xl font-bold">국민은행 청년적금</h2>

      <ul className="mb-12 flex flex-wrap gap-4">
        {['20대 이상', '파킹통장', '세테크', '그 외 필터'].map((data, i) => (
          <li key={i} className='px-4 py-2 rounded-[10px] bg-black5 text-black40 font-bold'>{data}</li>
        ))}
      </ul>

      <div className="py-2 flex justify-between text-lg">
        <span className="text-black40 font-bold">이율</span>
        <b className="text-orange">최저 1.5%</b>
      </div>
      <div className="py-2 flex justify-between text-lg">
        <span className="text-black40 font-bold">문의</span>
        <b>031-123-1234</b>
      </div>

      <div className="my-10 flex justify-center items-center h-48 rounded-[10px] border border-black20 text-black40 font-bold bg-black5 overflow-hidden">상품 이미지 준비중</div>

      <h3 className="mt-10 mb-4 text-2xl font-bold">상품 설명</h3>
      <div className="text-orange font-bold text-lg">청년만 가입할 수 있는 적금입니다.</div>
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
      
      <button type="button" className="my-20 p-4 w-full rounded-[10px] bg-yellow text-white text-lg font-bold">신청하기</button>
    </div>
  );
};

export default Id;
