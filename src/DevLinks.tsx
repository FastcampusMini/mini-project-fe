import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { joinNames } from './libs/utils';
import { useForm } from 'react-hook-form';
import { ax } from './libs/axiosClient';
import orderData from '@libs/mockup/getSearch.json';
import { useMutation } from '@tanstack/react-query';
import Search from './components/Search';
import { useSelector } from 'react-redux';
import cogoToast from 'cogo-toast';
import { firebaseConfig } from './firebase/fb';

const DevLinks = () => {
  const textRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const { register, handleSubmit, getValues } = useForm();
  const { mutate: login } = useMutation(
    ['login'],
    async ({ email, password }: any) => {
      ax.postLogin({ email, password });
    }
  );

  const { accessToken } = useSelector((state: any) => state.authToken);
  // const { accessToken, refreshToken } = useToken();

  const onValid = () => {
    const { email, password } = getValues();
    console.log('email', email, 'pw', password);
    // login({ email, password });
  };

  const handleTestSpan = async () => {
    const products_id_list = [
      '2CtHem2tzRubYqwCp5h5hReOc',
      '2F16uTFkca53ZDMNZ44Xe0ob8',
    ];
    const productId = '2CtHem2tzRubYqwCp5h5hReOc';
    // console.log(products_id_list);
    // const res = await ax.getSearch(accessToken, {
    //   searchKeyword: '안심',
    //   page: '2',
    // });
    // console.log(res);
  };
  return (
    <>
      <div
        className={joinNames(
          'fixed border  h-screen space-y-8 z-10 overflow-hidden',
          toggle ? 'w-6' : 'w-auto'
        )}>
        <h1
          onClick={() => setToggle(!toggle)}
          className={joinNames(
            'cursor-pointer font-bold w-auto',
            toggle ? 'bg-yellow text-black' : 'bg-black text-white'
          )}>
          test
        </h1>
        <form onSubmit={handleSubmit(onValid)} className='w-10'>
          <input
            type='text'
            className='border bg-gray'
            {...register('email')}
          />
          <input
            type='text'
            className='border bg-gray'
            {...register('password')}
          />
          <button>login</button>
        </form>
        <div className='w-auto'>
          <input
            className={!accessToken ? 'text-red' : ''}
            onChange={() => {}}
            type='text'
            value={!accessToken ? 'No accessToken' : accessToken}
            ref={textRef}
          />
          <div
            className='hover:bg-gray cursor-pointer active:bg-yellow border rounded'
            onClick={() => {
              if (!accessToken) {
                return cogoToast.error('accessToken 이 없습니다');
              }
              textRef.current.select();
              document.execCommand('copy');
              cogoToast.info(`복사: ${accessToken}`);
            }}>
            Copy!
          </div>
        </div>
        <span onClick={handleTestSpan}>testBTN</span>
        <ul>
          <li>
            <Link className='hover:bg-black/10' to='/'>
              / (home )
            </Link>
          </li>
          <li>
            <Link className='hover:bg-black/10' to='/user/edit'>
              /user/edit
            </Link>
          </li>
          <li>
            <Link className='hover:bg-black/10' to='/main'>
              /main
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link className='hover:bg-black/10' to='/user'>
              /user
            </Link>
          </li>
          <li>
            <Link className='hover:bg-black/10' to='/signup'>
              /signup
            </Link>
          </li>
          <li>
            <Link className='hover:bg-black/10' to='/signin'>
              /signin
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link className='hover:bg-black/10' to='/user/myCart'>
              /user/myCart
            </Link>
          </li>
          <li>
            <Link className='hover:bg-black/10' to='/user/wishlist'>
              /user/wishlist
            </Link>
          </li>
          <li>
            <Link className='hover:bg-black/10' to='/user/orderlist'>
              /user/orderlist
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link className='hover:bg-black/10' to='/products/financial'>
              //financial
            </Link>
          </li>
          <li>
            <Link className='hover:bg-black/10' to='/products/financial/1'>
              //financial/1
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DevLinks;
