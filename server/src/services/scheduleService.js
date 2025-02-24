const { TB_SCHEDULES, TB_VACATIONS } = require('../../models');
const { Op } = require('sequelize');

// 캘린더 데이터 조회
exports.getCalendarData = async () => {
  const schedules = await TB_SCHEDULES.findAll();
  const vacations = await TB_VACATIONS.findAll();

  return {
    schedules,
    vacations,
  };
};

// 단일 스케줄 추가
exports.createSchedule = async (scheduleData) => {
  return await TB_SCHEDULES.create(scheduleData);
};

// 반복(일괄) 스케줄 추가
exports.createBulkSchedules = async (startDate, endDate, dayOfWeek, scheduleData) => {
  const bulkSchedules = [];
  const current = new Date(startDate);

  while (current <= new Date(endDate)) {
    if (current.getDay() === dayOfWeek) {
      bulkSchedules.push({
        ...scheduleData,
        date: new Date(current),
      });
    }
    current.setDate(current.getDate() + 1);  // 다음 날짜로 이동
  }

  return await TB_SCHEDULES.bulkCreate(bulkSchedules);
};

// 스케줄 수정
exports.updateSchedule = async (scheduleId, updatedData) => {
  const schedule = await TB_SCHEDULES.findByPk(scheduleId);
  if (!schedule) {
    throw new Error('스케줄을 찾을 수 없습니다.');
  }

  return await schedule.update(updatedData);
};

// 휴가 기간 동안의 휴가 데이터 추가
exports.createVacation = async (employeeId, startDate, endDate, vacationType, status) => {
    const vacationDays = [];
    const current = new Date(startDate);
  
    while (current <= new Date(endDate)) {
      vacationDays.push({
        employee_id: employeeId,
        date: new Date(current),
        start_time: '09:00:00',  // 휴가 시작 시간 (고정)
        end_time: '18:00:00',    // 휴가 종료 시간 (고정)
        vacation_type: vacationType,
        status: status || '대기',  // 기본 상태 설정
      });
  
      current.setDate(current.getDate() + 1);  // 다음 날로 이동
    }
  
    return await TB_VACATIONS.bulkCreate(vacationDays);
  };

// 휴가 수정
exports.updateVacation = async (vacationId, updatedData) => {
    const vacation = await TB_VACATIONS.findByPk(vacationId);
    if (!vacation) {
      throw new Error('휴가를 찾을 수 없습니다.');
    }
  
    return await vacation.update(updatedData);
  };

// 휴가 삭제
exports.deleteVacation = async (vacationId) => {
    const vacation = await TB_VACATIONS.findByPk(vacationId);
    if (!vacation) {
      throw new Error('휴가를 찾을 수 없습니다.');
    }
  
    return await vacation.destroy();
  };