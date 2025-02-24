const { TB_WORKS, TB_WORK_SUMMARY } = require('../../models');
const { Op } = require('sequelize');

// 전체 업무 조회 + 필터링 (관리자용)
exports.getAllWorks = async (filters) => {
    const { start_date, end_date, employee_id, process_id } = filters;
  
    const whereClause = {};
  
    if (start_date && end_date) {
      whereClause.start_at = { [Op.between]: [new Date(start_date), new Date(end_date)] };
    }
    if (employee_id) {
      whereClause.employee_id = employee_id;
    }
    if (process_id) {
      whereClause.process_id = process_id;
    }
  
    return await TB_WORKS.findAll({
      where: whereClause,
      order: [['start_at', 'DESC']], // 최신 업무 먼저 조회
    });
  };
  
  // 특정 직원의 업무 조회
exports.getEmployeeWorks = async (employeeId) => {
    return await TB_WORKS.findAll({
      where: { employee_id: employeeId },
      order: [['start_at', 'DESC']],
    });
};

// 출근 기록 생성 (실질적 업무 시작)
exports.startWork = async (employeeId, processId, scheduleId) => {
  return await TB_WORKS.create({
    employee_id: employeeId,
    process_id: processId,
    schedule_id: scheduleId,
    start_at: new Date(),
    completed_quantity: 0,  // 처음 출근 시 생산량은 0
  });
};

// 퇴근 기록 저장 (실질적 업무 종료)
exports.endWork = async (workId, completedQuantity) => {
  const work = await TB_WORKS.findByPk(workId);
  if (!work) {
    throw new Error('업무 기록을 찾을 수 없습니다.');
  }

  return await work.update({
    end_at: new Date(),
    completed_quantity: completedQuantity,
  });
};

// 업무 기록 수정
exports.updateWork = async (workId, updatedData) => {
  const work = await TB_WORKS.findByPk(workId);
  if (!work) {
    throw new Error('업무 기록을 찾을 수 없습니다.');
  }
  return await work.update(updatedData);
};

// 업무 기록 삭제
exports.deleteWork = async (workId) => {
  const work = await TB_WORKS.findByPk(workId);
  if (!work) {
    throw new Error('업무 기록을 찾을 수 없습니다.');
  }
  return await work.destroy();
};

// 직원의 업무 성과 요약 조회
exports.getWorkSummary = async (employeeId) => {
  return await TB_WORK_SUMMARY.findAll({
    where: { employee_id: employeeId },
  });
};
