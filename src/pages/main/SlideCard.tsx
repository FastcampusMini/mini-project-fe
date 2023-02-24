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

const SlideCard = ({ product }: IProps) => {
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
          <img
            className='relative w-36 mx-auto'
            src={getSticker(product?.productId)}
          />
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='font-bold text-2lg'>{product?.name}</h3>
        <p className='text-sm text-black60'>
          긴급자금이 필요하세요? 고금리 대출이자로 고민하시나요? 당신의 희망을
          이루도록 돕겠습니다!
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
