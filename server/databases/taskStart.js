const { Op } = require("sequelize");
const { taskStart, Sequelize } = require("../models");
const { process } = require("../models");
const { taskEnd } = require("../models");
const { user } = require("../models");

const taskStartRegister = async (data, user_code) => {
    try {
        const result = await taskStart.create({
            task_count: data.task_count,
            task_start_time: data.task_start_time,
            process_code: data.process_code,
            task_start_date: data.task_start_date,
            user_code: user_code,
            task_start_state: '정상',
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }

};

const taskStartNewOne = async (user_code) => {
    try {
        const result = await taskStart.findOne({
            where: {
                user_code: user_code,
            },
            include: [{
                model: process, // process 모델을 포함
                required: true,  // 조인 방식 설정 (INNER JOIN)
                attributes: ['process_code', 'process_name', 'hour_average'],  // 필요한 속성만 포함
            },
            {
                model: taskEnd, // process 모델을 포함
                required: false,  // 조인 방식 설정 (INNER JOIN)
                attributes: ['task_end_id', 'task_end_date', 'task_end_time'],  // 필요한 속성만 포함
            }
            ],
            order: [['task_start_id', 'DESC']],
        });
        return result;
    } catch (error) {
        console.error(error);
    }

};

const taskStartDate = async (data) => {
    try {
        const results = await taskStart.findAll({
            include: [
                {
                    model: taskEnd,
                    required: false,
                    attributes: ['task_end_id', 'task_end_date', 'task_end_time', 'total_count', 'hour_average'], // ✅ 명확하게 필드 지정
                },
                {
                    model: user,
                    required: true,
                    attributes: ['user_code', 'user_name', 'user_position'], // ✅ 필요한 필드만 가져오기
                },
                {
                    model: process,
                    required: true,
                    attributes: ['process_code', 'process_name', 'hour_average'], // ✅ 필요한 필드만 가져오기
                },
            ],
            where: {
                task_start_date: {
                    [Op.gte]: data.startDate, // 2024-03-24 이상
                    [Op.lte]: data.endDate,   // 2025-06-24 이하
                },
            }, attributes: [
                'task_start_id',
                'task_start_date',
                'task_start_time',
                [
                    Sequelize.literal(`
                        LPAD(FLOOR(TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) / 3600), 2, '0')
                    `),
                    'sum_hour',
                ],
                [
                    Sequelize.literal(`
                        LPAD(FLOOR((TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) % 3600) / 60), 2, '0')
                    `),
                    'sum_minute',
                ],
                [
                    Sequelize.literal(`
                    ROUND(
                        total_count / 
                        (FLOOR(TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) / 3600) +
                        (FLOOR((TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) % 3600) / 60) / 60)), 
                        2
                    )
                `),
                    'avg_count_per_hour',
                ],
            ],
        });

        return results;
    } catch (error) {
        console.error('Error fetching attendance:', error);
        throw error;
    }
};


const taskStartMonth = async (data) => {

    try {
        const results = await taskStart.findAll({
            include: [
                {
                    model: taskEnd,
                    required: false,
                    attributes: ['task_end_id', 'task_end_date', 'task_end_time', 'total_count', 'hour_average'], // ✅ 명확하게 필드 지정
                },
                {
                    model: user,
                    required: true,
                    attributes: ['user_code', 'user_name', 'user_position'], // ✅ 필요한 필드만 가져오기
                },
                {
                    model: process,
                    required: true,
                    attributes: ['process_code', 'process_name', 'hour_average'], // ✅ 필요한 필드만 가져오기
                },
            ],
            where: Sequelize.literal(`SUBSTRING(task_start_date, 1, 7) = '${data.year}-${data.month}'`),
            attributes: [
                'task_start_id',
                'task_start_date',
                'task_start_time',
                [
                    Sequelize.literal(`
                        LPAD(FLOOR(TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) / 3600), 2, '0')
                    `),
                    'sum_hour',
                ],
                [
                    Sequelize.literal(`
                        LPAD(FLOOR((TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) % 3600) / 60), 2, '0')
                    `),
                    'sum_minute',
                ],
                [
                    Sequelize.literal(`
                    ROUND(
                        total_count / 
                        (FLOOR(TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) / 3600) +
                        (FLOOR((TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) % 3600) / 60) / 60)), 
                        2
                    )
                `),
                    'avg_count_per_hour',
                ],
            ],
        });

        return results;
    } catch (error) {
        console.error('Error fetching attendance:', error);
        throw error;
    }
};

const taskStartYear = async (data) => {

    try {
        const results = await taskStart.findAll({
            include: [
                {
                    model: taskEnd,
                    required: false,
                    attributes: ['task_end_id', 'task_end_date', 'task_end_time', 'total_count', 'hour_average'], // ✅ 명확하게 필드 지정
                },
                {
                    model: user,
                    required: true,
                    attributes: ['user_code', 'user_name', 'user_position'], // ✅ 필요한 필드만 가져오기
                },
                {
                    model: process,
                    required: true,
                    attributes: ['process_code', 'process_name', 'hour_average'], // ✅ 필요한 필드만 가져오기
                },
            ],
            where: Sequelize.literal(`SUBSTRING(task_start_date, 1, 4) = '${data.year}'`),
            attributes: [
                'task_start_id',
                'task_start_date',
                'task_start_time',
                [
                    Sequelize.literal(`
                        LPAD(FLOOR(TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) / 3600), 2, '0')
                    `),
                    'sum_hour',
                ],
                [
                    Sequelize.literal(`
                        LPAD(FLOOR((TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) % 3600) / 60), 2, '0')
                    `),
                    'sum_minute',
                ],
                [
                    Sequelize.literal(`
                    ROUND(
                        total_count / 
                        (FLOOR(TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) / 3600) +
                        (FLOOR((TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) % 3600) / 60) / 60)), 
                        2
                    )
                `),
                    'avg_count_per_hour',
                ],
            ],
        });

        return results;
    } catch (error) {
        console.error('Error fetching attendance:', error);
        throw error;
    }
};

const taskStartToday = async (user_code) => {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0'); // 두 자리로 표시
    const formattedDate = `${year}-${month}-${day}`;

    try {
        const result = await taskStart.findAll({
            where: {
                user_code: user_code,
                task_start_date: formattedDate,
            },
            include: [{
                model: process, // process 모델을 포함
                required: true,  // 조인 방식 설정 (INNER JOIN)
                attributes: ['process_code', 'process_name', 'hour_average'],  // 필요한 속성만 포함
            },
            {
                model: taskEnd, // process 모델을 포함
                required: false,  // 조인 방식 설정 (INNER JOIN)
                attributes: ['task_end_id', 'task_end_date', 'task_end_time'],  // 필요한 속성만 포함
            }
            ],
            order: [['task_start_id', 'DESC']],
        });
        return result;
    } catch (error) {
        console.error(error);
    }

};



const taskStartUpdate = async (data) => {
    try {
        await taskStart.update(
            {
                task_start_date: data.task_start_date,
                task_start_time: data.task_start_time,
                attendance_start_state: data.attendance_start_state,
            },

            {
                where: {
                    task_start_id: data.task_start_id,
                },
            },

        )
    } catch (error) {
        console.error(error);
    }

    try {
        const result = await taskEnd.update(
            {
                task_end_date: data.task_end_date,
                task_end_time: data.task_end_time,
                total_count: data.total_count,
            },
            {
                where: {
                    task_end_id: data.task_end_id,
                },
            },

        )
        return result;

    } catch (error) {
        console.error(error);
    }
};

// const taskStartSearch = async (user_code, searchDate) => {

//     try {
//         const result = await taskStart.findAll({
//             where: {
//                 user_code: user_code,
//                 task_start_date: searchDate,
//             },
//             include: [{
//                 model: process, // process 모델을 포함
//                 required: true,  // 조인 방식 설정 (INNER JOIN)
//                 attributes: ['process_code', 'process_name', 'hour_average'],  // 필요한 속성만 포함
//             },
//             {
//                 model: taskEnd, // process 모델을 포함
//                 required: false,  // 조인 방식 설정 (INNER JOIN)
//                 attributes: ['task_end_id', 'task_end_date', 'task_end_time'],  // 필요한 속성만 포함
//             }
//             ],
//             order: [['task_start_id', 'DESC']],

//         });
//         return result;
//     } catch (error) {
//         console.error(error);
//     }

// };

const taskStartSearch = async (user_code, searchDate) => {
  try {
    const result = await taskStart.findAll({
      where: {
        user_code,
        task_start_date: searchDate, // 특정 날짜만 필터링
      },
      include: [
        {
          model: process,
          required: true,
          attributes: ['process_code', 'process_name', 'hour_average'],
        },
        {
          model: taskEnd,
          required: false,
          attributes: ['task_end_id', 'task_end_date', 'task_end_time', 'total_count', 'hour_average'],
        },
      ],
      attributes: [
        'task_start_id',
        'task_start_date',
        'task_start_time',
        [
          Sequelize.literal(`
            LPAD(FLOOR(TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) / 3600), 2, '0')
          `),
          'sum_hour',
        ],
        [
          Sequelize.literal(`
            LPAD(FLOOR((TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) % 3600) / 60), 2, '0')
          `),
          'sum_minute',
        ],
        [
          Sequelize.literal(`
            ROUND(
              total_count / 
              (FLOOR(TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) / 3600) +
              (FLOOR((TIMESTAMPDIFF(SECOND, CONCAT(task_start_date, ' ', task_start_time), CONCAT(task_end_date, ' ', task_end_time)) % 3600) / 60) / 60)), 
              2
            )
          `),
          'avg_count_per_hour',
        ],
      ],
      order: [['task_start_id', 'DESC']],
    });

    return result;
  } catch (error) {
    console.error('Error in taskStartSearch:', error);
    throw error;
  }
};

module.exports = {
    taskStartRegister,
    taskStartNewOne,
    taskStartDate,
    taskStartMonth,
    taskStartYear,
    taskStartToday,
    taskStartUpdate,
    taskStartSearch,
};