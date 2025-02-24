const { TB_USERS, TB_AUTHS } = require('../../models');

const findUserByUsername = async (user_id) => {
  return await TB_USERS.findOne({ where: { user_id } });
};

const createUser = async (user_id, name, nickname, password) => {
  // 기본 권한 가져오기
  const defaultAuth = await TB_AUTHS.findOne({ where: { auth_code: 'USER' } }); // 'USER'는 일반 유저 권한 코드

  if (!defaultAuth) {
    throw new Error('기본 권한이 설정되어 있지 않습니다.'); // 기본 권한이 없을 경우 예외 처리
  }

  // 유저 생성
  return await TB_USERS.create({
    user_id,
    name,
    nickname,
    password,
    auth_code: defaultAuth.auth_code, // 기본 권한 설정
  });
};

const deleteUser = async (user_id) => {
  return await TB_USERS.destroy({ where: { user_id } });
};

module.exports = { findUserByUsername, createUser, deleteUser };
