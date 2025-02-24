const { TB_PROCESSES, TB_ENABLED_TASKS } = require('../../models');

// 업무 공정 추가
exports.createProcess = async (processData) => {
  return await TB_PROCESSES.create(processData);
};

// 업무 공정 수정
exports.updateProcess = async (processId, updatedData) => {
  const process = await TB_PROCESSES.findByPk(processId);
  if (!process) {
    throw new Error('업무 공정을 찾을 수 없습니다.');
  }
  return await process.update(updatedData);
};

// 업무 공정 삭제
exports.deleteProcess = async (processId) => {
  const process = await TB_PROCESSES.findByPk(processId);
  if (!process) {
    throw new Error('업무 공정을 찾을 수 없습니다.');
  }
  return await process.destroy();
};

// 직원에게 업무 부과
exports.assignTask = async (taskData) => {
  return await TB_ENABLED_TASKS.create(taskData);
};

// 부과된 업무 수정
exports.updateTask = async (taskId, updatedData) => {
  const task = await TB_ENABLED_TASKS.findByPk(taskId);
  if (!task) {
    throw new Error('부과된 업무를 찾을 수 없습니다.');
  }
  return await task.update(updatedData);
};

// 부과된 업무 삭제
exports.deleteTask = async (taskId) => {
  const task = await TB_ENABLED_TASKS.findByPk(taskId);
  if (!task) {
    throw new Error('부과된 업무를 찾을 수 없습니다.');
  }
  return await task.destroy();
};
