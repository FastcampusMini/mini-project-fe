interface IUser {
  // 회원가입한 사용자 정보
  userId: string;
  email: string; // 사용자 아이디
  displayName: string; // 사용자 표시 이름
  age: number; // 나이
  job: string | null; // 직업
  location: string | null; // 지역
  skills: string[] | null; // 특기
  wishlist: string[]; // 관심상품 목록
  myCart: string[]; // 장바구니
  annualSalary: number; // 연봉
  status: {
    creditScore: number; // 신용점수
    assets: IAssets; // 자산관련
    loan: ILoan; // 대출관련
    card: ICard; // 카드관련
    membership: IMembership; // 멤버십
  };
}

interface IAssets {}
interface ILoan {}
interface ICard {}

interface IMembership {}
