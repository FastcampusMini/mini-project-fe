export function joinNames(...classnames: string[]): string {
  return classnames.join(' ');
}

// 배열, 사이즈, page를 입력받아서 해당 페이지 배열을 리턴한다.
export function paginaton<T>(arr?: T[], size: number = 10, page: number = 1) {
  const _page = parseInt(`${page - 1}`, 10);
  console.log(arr);
  if (!arr) return;
  if (_page < 0) throw Error('page는 0보다 커야 합니다.');
  if (_page * size > arr.length) throw Error('페이지가 없습니다.');
  const _first = _page * size;
  const _second = _first + size;
  console.log('arr.slice', arr.slice);
  if (!arr.slice) console.log('왜애러야', arr);
  return arr.slice(_first, _second);
}
