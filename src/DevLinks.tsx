import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { joinNames } from './libs/utils';
import { useForm } from 'react-hook-form';
import useLogin from './libs/hooks/useLogin';
import { ax } from './libs/axiosClient';
import useToken from './libs/hooks/useToken';
import orderData from '@libs/mockup/getSearch.json';
import useGetOrders from './libs/hooks/useGetOrders';
import { useMutation } from '@tanstack/react-query';
import Search from './components/Search';

const DevLinks = () => {
  const [toggle, setToggle] = useState(false);
  const { register, handleSubmit, getValues } = useForm();
  const { mutate: login } = useLogin();
  const { accessToken, refreshToken } = useToken();
  const onValid = () => {
    const { email, password } = getValues();
    login({ email, password });
  };
  const { data: orderdata } = useGetOrders(accessToken);

  const [name, setName] = useState('');
  const handleTest = async () => {
    const { email, password, other } = getValues();
    console.log('orderdata', orderdata);
    setName(other);
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
        <form
          onSubmit={handleSubmit(onValid)}
          className='border flex flex-col w-full'>
          <input
            type='text'
            {...register('email')}
            className='border'
            placeholder='email'
          />
          <input
            type='text'
            {...register('password')}
            className='border'
            placeholder='pw'
          />
          <button className='hover:bg-gray'>Login</button>
          <input
            type='text'
            {...register('other')}
            className='border'
            placeholder='other'
          />

          <div
            className='border hover:bg-orange hover:cursor-pointer rounded'
            onClick={handleTest}>
            handleTEST
          </div>
        </form>
        <Search name={name} accessToken={accessToken} />
        <ul>
          <li>
            <Link className='hover:bg-black/10' to='/'>
              / (home)
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
