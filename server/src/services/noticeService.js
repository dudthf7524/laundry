const { TB_NOTICE, TB_NOTICE_RECIPIENT } = require('../../models');

// 공지 생성
exports.createNotice = async (admin_id, content, start_date, end_date) => {
  return await TB_NOTICE.create({ admin_id, content, start_date, end_date });
};

// 모든 공지 조회
exports.getAllNotices = async () => {
  return await TB_NOTICE.findAll();
};

// 특정 공지 조회
exports.getNoticeById = async (noticeId) => {
  return await TB_NOTICE.findByPk(noticeId);
};

// 본인에게 할당된 모든 공지 조회
exports.getNoticesForUser = async (userId) => {
  return await TB_NOTICE.findAll({
    include: [
      {
        model: TB_NOTICE_RECIPIENT,
        where: { employee_id: userId },  // 수신자 테이블에서 해당 유저의 공지만 포함
        attributes: [],  // 불필요한 recipient 정보는 생략
      }
    ],
    order: [['start_date', 'DESC']],  // 최신 순으로 정렬
  });
};
