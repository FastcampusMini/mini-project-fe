import React from 'react';
import { IconType } from 'react-icons';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { joinNames } from '@libs/utils';

interface INavProps {
  left?: 'arrow' | 'cancel';
  right?: 'arrow' | 'cancel';
  addClass?: string;
}

const ICON_SIZE = 28;

const Nav = ({ left, right, addClass }: INavProps) => {
  const navigate = useNavigate();
  return (
    <nav className={joinNames('mb-10 flex justify-between px-3', addClass)}>
      {left === 'arrow' ? (
        <AiOutlineArrowLeft
          size={ICON_SIZE}
          className='cursor-pointer'
          onClick={() => navigate(-1)}
        />
      ) : left === 'cancel' ? (
        <span className='font-bold text-lg' onClick={() => navigate(-1)}>
          취소
        </span>
      ) : (
        <div></div>
      )}
      {right === 'arrow' ? (
        <AiOutlineArrowRight
          size={ICON_SIZE}
          className='cursor-pointer'
          onClick={() => navigate(1)}
        />
      ) : right === 'cancel' ? (
        <span className='font-bold text-lg' onClick={() => navigate(-1)}>
          취소
        </span>
      ) : (
        <div></div>
      )}
    </nav>
  );
};

export default Nav;
