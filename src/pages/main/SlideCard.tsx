import React from 'react';
import sticker0 from '@/assets/stickers/free-sticker0.png';
import sticker1 from '@/assets/stickers/free-sticker1.png';
import sticker2 from '@/assets/stickers/free-sticker2.png';
import sticker3 from '@/assets/stickers/free-sticker3.png';
import sticker4 from '@/assets/stickers/free-sticker4.png';
import sticker5 from '@/assets/stickers/free-sticker5.png';
import sticker6 from '@/assets/stickers/free-sticker6.png';
import sticker7 from '@/assets/stickers/free-sticker7.png';
import sticker8 from '@/assets/stickers/free-sticker8.png';
import sticker9 from '@/assets/stickers/free-sticker9.png';
import { MdRecommend } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
interface IProps {
  product: IProduct;
  index: number;
}
const getSticker = (num: number) => {
  const _stickers = [
    sticker0,
    sticker1,
    sticker2,
    sticker3,
    sticker4,
    sticker5,
    sticker6,
    sticker7,
    sticker8,
    sticker9,
  ];
  const index = num % 10;
  return _stickers[index];
};
const getDescription = (num: number) => {
  const _description = [
    '긴급자금이 필요하세요? 고금리 대출이자로 고민하시나요? 당신의 희망을 이루도록 돕겠습니다!',
    '이 대출상품 어떠세요? 누구나 3분이면 한도조회 OK! 대출 상담 전문가가 항상 대기 중입니다.',
    '우수손님을 위한 대출 상품입니다. 우리는 낮은 이자율과 함께 최대 한도의 대출을 제공합니다.',
    '높은 한도! 소규모 비즈니스를 위한 자금을 필요로 한다면 저희와 함께하세요.',
    '빠르고 간편한 대출 신청 절차로 당신의 금융 문제를 해결해드립니다.',
    '현금이 부족한 상황에서는 우리가 도와드립니다. 단기 대출을 지금 신청하세요.',
    '대출 상담 전문가가 항상 대기 중입니다. 지금 상담을 신청하세요.',
    '저렴한 이자로 당신의 신용 점수가 낮더라도 저희가 대출을 제공해드립니다.',
    '저희와 함께라면 당신의 재무 상황을 좀 더 효율적으로 관리할 수 있습니다.',
    '빠른 승인과 출금으로 즉시 자금을 지원합니다. 지금 바로 문의하세요!',
  ];
  const index = num % 10;
  return _description[index];
};

const SlideCard = ({ product, index }: IProps) => {
  const navigate = useNavigate();
  return (
    <div
      className='cursor-pointer rounded-2xl bg-[#fff] w-64 h-96 flex flex-col justify-between p-3 shadow-lg shrink-0 first:ml-10 hover:-translate-y-3 transition-transform'
      onClick={() => navigate(`/products/financial/${product?.productId}`)}>
      <div className='w-20 h-10 rounded-full'>
        <img src={product?.logo} alt='' className='w-8 h-8' />
      </div>

      <div className='relative rounded-full w-28 h-28 mx-auto flex items-center justify-center bg-light-gray'>
        <div className='absolute w-36'>
          <img className='relative w-36 mx-auto' src={getSticker(index)} />
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='font-bold text-2lg'>{product?.name}</h3>
        <p className='text-sm h-12 text-black60 flex items-center text-ellipsis'>
          {getDescription(index)}
        </p>
        <div className='flex items-end justify-end gap-2'>
          <span className='font-semibold text-yellow'>{product?.rate}%</span>
          <span className='font-bold text-xl text-orange'>
            {' '}
            ₩{product?.price}만
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
