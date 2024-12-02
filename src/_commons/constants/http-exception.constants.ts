export const CustomHttpException = {
  UNAUTHORIZED_ACCOUNT: {
    statusCode: 401,
    code: 'UNAUTHORIZED_ACCOUNT',
    message: '잘못된 아이디 또는 패스워드입니다.',
  },
  CONFLICT_EMAIL: {
    statusCode: 409,
    code: 'CONFLICT_EMAIL',
    message: '이미 사용중인 이메일입니다.',
  },
  DB_SERVER_ERROR: {
    statusCode: 500,
    code: 'DB_SERVER_ERROR',
    message: 'DB 서버 에러. 관리자에게 문의해주세요.',
  },
};
