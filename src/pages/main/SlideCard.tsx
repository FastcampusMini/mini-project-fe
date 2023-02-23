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
interface IProps {
  product: IProduct;
}
function stickers(num: number) {
  const x = `${num}`;
  switch (x[x.length - 1]) {
    case '0':
      return sticker0;
    case '1':
      return sticker1;
    case '2':
      return sticker2;
    case '3':
      return sticker3;
    case '4':
      return sticker4;
    case '5':
      return sticker5;
    case '6':
      return sticker6;
    case '7':
      return sticker7;
    case '8':
      return sticker8;
    case '9':
      return sticker9;
    default:
      return sticker0;
  }
}
const SlideCard = ({ product }: IProps) => {
  return (
    <div className='rounded-2xl bg-[#fff] w-64 h-96 flex flex-col justify-between p-3 shadow-lg shrink-0'>
      <div className='w-20 h-10 rounded-full'>
        <img src={product.logo} alt='' className='w-8 h-8' />
      </div>
      <img
        className=' h-36 relative object-contain'
        src={stickers(product.productId)}
      />
      <div className='flex flex-col gap-4'>
        <h3 className='font-bold text-2lg'>{product.name}</h3>
        <p className='text-sm text-black60'>
          긴급자금이 필요하세요? 고금리 대출이자로 고민하시나요? 당신의 희망을
          이루도록 돕겠습니다!
        </p>
        <div className='flex items-end justify-end gap-2'>
          <span className='font-semibold text-yellow'>{product.rate}%</span>
          <span className='font-bold text-xl text-orange'>
            {' '}
            ₩{product.price}만
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
