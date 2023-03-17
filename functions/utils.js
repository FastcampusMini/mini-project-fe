function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateId(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

function getRandomFloat(min, max, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

function generateRandomProduct() {
  const brands = [
    { brand: '하나은행', logo: 'https://i.postimg.cc/mg6QCRVc/hana.png' },
    { brand: 'ibk은행', logo: 'https://i.postimg.cc/3w42Z6bt/ibk.png' },
    { brand: '카카오뱅크', logo: 'https://i.postimg.cc/LscLQTc2/kakao.png' },
    { brand: 'KB은행', logo: 'https://i.postimg.cc/rscWMpyH/kb.png' },
    { brand: 'K뱅크', logo: 'https://i.postimg.cc/zBTWshNW/kbank.png' },
    { brand: '농협은행', logo: 'https://i.postimg.cc/yxPRdzk8/nh.png' },
    { brand: '신한은행', logo: 'https://i.postimg.cc/fT8XQZGH/shinhan.png' },
    { brand: '토스', logo: 'https://i.postimg.cc/G3JGzvqn/toss.png' },
    { brand: '우리은행', logo: 'https://i.postimg.cc/02km4rBM/wori.png' },
  ];

  const names = [
    '부동산담보대출',
    '튼튼주택대출',
    '스마트홈론',
    '대박프로퍼티론',
    '주거안정론',
    '에이스부동산대출',
    '한가롭게살자금융',
    '꿈의집프로젝트',
    '안심부동산금융',
  ];

  const { brand, logo } = brands[getRandomInt(0, brands.length - 1)];
  const price = getRandomInt(20, 40) * 100;
  const name = names[getRandomInt(0, names.length - 1)];
  const rate = getRandomFloat(2.0, 6.9, 1);
  const detail = `${getRandomInt(10, 99)}-${getRandomInt(
    100,
    999
  )}-${getRandomInt(1000, 9999)}`;
  const recommend = Math.random() > 0.5 ? true : false;

  return {
    brand,
    logo,
    price,
    name,
    rate,
    detail,
    productId: generateId(25),
    recommend,
  };
}

module.exports = generateRandomProduct;
