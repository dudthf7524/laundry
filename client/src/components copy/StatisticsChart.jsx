import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { employees } from '../data/mockData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const StatisticsChart = ({
  attendanceData,
  taskData,
  type = 'attendance',
  timeFrame = 'daily',
  selectedEmployees = []
}) => {
  const [chartType, setChartType] = useState('bar'); // 'bar', 'line', or 'pie'

  // Transform data for charts based on the selected type and time frame
  const transformAttendanceData = () => {
    if (!attendanceData || attendanceData.length === 0) return [];

    // For daily view
    if (timeFrame === 'daily') {
      return attendanceData.map(record => {
        const employee = employees.find(e => e.id === record.employeeId) || {};

        // Parse hours for calculations
        const parseTimeToMinutes = (timeStr) => {
          if (!timeStr) return 0;
          const [hours, minutes] = timeStr.split(':').map(Number);
          return hours * 60 + minutes;
        };

        // Calculate work duration in minutes (if available)
        let workDuration = 0;
        if (record.totalWorkHours) {
          workDuration = parseTimeToMinutes(record.totalWorkHours);
        } else if (record.actualStart && record.actualEnd) {
          // Simple calculation if no totalWorkHours provided
          const startMinutes = parseTimeToMinutes(record.actualStart);
          const endMinutes = parseTimeToMinutes(record.actualEnd);
          workDuration = endMinutes - startMinutes;
        }

        return {
          date: record.date,
          name: `${employee.name} (${employee.nickname || 'N/A'})`,
          workHours: Math.max(0, workDuration / 60), // Convert minutes to hours
          status: record.status,
          roleType: record.roleType,
        };
      });
    }

    // For monthly/yearly aggregation
    const aggregatedData = {};

    attendanceData.forEach(record => {
      const employee = employees.find(e => e.id === record.employeeId) || {};
      const employeeName = `${employee.name} (${employee.nickname || 'N/A'})`;

      // Define the aggregation key based on timeFrame
      let key;
      if (timeFrame === 'monthly') {
        // Extract year and month from date (YYYY-MM-DD)
        key = record.date.substring(0, 7); // YYYY-MM
      } else if (timeFrame === 'yearly') {
        // Extract just the year
        key = record.date.substring(0, 4); // YYYY
      }

      if (!key) return;

      // Initialize aggregation entry if needed
      if (!aggregatedData[key]) {
        aggregatedData[key] = {};
      }

      // Initialize employee entry if needed
      if (!aggregatedData[key][employeeName]) {
        aggregatedData[key][employeeName] = {
          workDays: 0,
          totalWorkHours: 0,
        };
      }

      // Count working days
      if (record.status === '퇴근' || record.status === '근무중') {
        aggregatedData[key][employeeName].workDays += 1;
      }

      // Add work hours if available
      if (record.totalWorkHours) {
        const [hours, minutes] = record.totalWorkHours.split(':').map(Number);
        aggregatedData[key][employeeName].totalWorkHours += hours + (minutes / 60);
      }
    });

    // Convert the aggregated data to an array format for charts
    return Object.entries(aggregatedData).map(([period, employeeData]) => {
      const result = { period };

      Object.entries(employeeData).forEach(([employeeName, data]) => {
        // Only include selected employees if specified
        if (selectedEmployees.length === 0 ||
            selectedEmployees.includes(employees.find(e => `${e.name} (${e.nickname || 'N/A'})` === employeeName)?.id)) {
          result[`${employeeName} 근무일수`] = data.workDays;
          result[`${employeeName} 근무시간`] = data.totalWorkHours;
        }
      });

      return result;
    });
  };

  const transformTaskData = () => {
    if (!taskData || taskData.length === 0) return [];

    // For daily view
    if (timeFrame === 'daily') {
      return taskData.map(record => {
        const employee = employees.find(e => e.id === record.employeeId) || {};

        return {
          date: record.date,
          name: `${employee.name} (${employee.nickname || 'N/A'})`,
          taskType: record.taskType,
          count: record.count,
          duration: (() => {
            const [hours, minutes] = record.totalDuration.split(':').map(Number);
            return hours + (minutes / 60);
          })(),
          efficiency: (() => {
            // Calculate efficiency (items per hour)
            const [hours, minutes] = record.totalDuration.split(':').map(Number);
            const totalHours = hours + (minutes / 60);
            return totalHours > 0 ? record.count / totalHours : 0;
          })(),
        };
      });
    }

    // For monthly/yearly aggregation
    const aggregatedData = {};

    taskData.forEach(record => {
      const employee = employees.find(e => e.id === record.employeeId) || {};
      const employeeName = `${employee.name} (${employee.nickname || 'N/A'})`;

      // Define the aggregation key based on timeFrame
      let key;
      if (timeFrame === 'monthly') {
        key = record.date.substring(0, 7); // YYYY-MM
      } else if (timeFrame === 'yearly') {
        key = record.date.substring(0, 4); // YYYY
      }

      if (!key) return;

      // Initialize aggregation entry if needed
      if (!aggregatedData[key]) {
        aggregatedData[key] = {};
      }

      // Initialize employee entry if needed
      if (!aggregatedData[key][employeeName]) {
        aggregatedData[key][employeeName] = {
          taskCount: 0,
          totalItems: 0,
          totalDuration: 0,
        };
      }

      // Increment task statistics
      aggregatedData[key][employeeName].taskCount += 1;
      aggregatedData[key][employeeName].totalItems += record.count;

      // Add duration if available
      if (record.totalDuration) {
        const [hours, minutes] = record.totalDuration.split(':').map(Number);
        aggregatedData[key][employeeName].totalDuration += hours + (minutes / 60);
      }
    });

    // Convert the aggregated data to an array format for charts
    return Object.entries(aggregatedData).map(([period, employeeData]) => {
      const result = { period };

      Object.entries(employeeData).forEach(([employeeName, data]) => {
        // Only include selected employees if specified
        if (selectedEmployees.length === 0 ||
            selectedEmployees.includes(employees.find(e => `${e.name} (${e.nickname || 'N/A'})` === employeeName)?.id)) {
          result[`${employeeName} 작업수`] = data.taskCount;
          result[`${employeeName} 처리항목`] = data.totalItems;
          result[`${employeeName} 소요시간`] = data.totalDuration;

          // Calculate efficiency (items per hour)
          if (data.totalDuration > 0) {
            result[`${employeeName} 효율성`] = data.totalItems / data.totalDuration;
          }
        }
      });

      return result;
    });
  };

  // Choose the data to display based on the type
  const chartData = type === 'attendance' ? transformAttendanceData() : transformTaskData();

  // For pie charts - need special data format
  const preparePieChartData = () => {
    if (chartData.length === 0) return [];

    // For attendance data - create pie chart of work hours distribution
    if (type === 'attendance') {
      // Group by employee and sum work hours
      const employeeHours = {};

      chartData.forEach(record => {
        if (!record.name || !record.workHours) return;

        if (!employeeHours[record.name]) {
          employeeHours[record.name] = 0;
        }

        employeeHours[record.name] += record.workHours;
      });

      // Convert to array format for PieChart
      return Object.entries(employeeHours).map(([name, value]) => ({
        name,
        value: Number(value.toFixed(2))
      }));
    }

    // For task data - create pie chart of item count distribution
    if (type === 'task') {
      // Group by employee and sum item counts
      const employeeItems = {};

      chartData.forEach(record => {
        if (!record.name || !record.count) return;

        if (!employeeItems[record.name]) {
          employeeItems[record.name] = 0;
        }

        employeeItems[record.name] += record.count;
      });

      // Convert to array format for PieChart
      return Object.entries(employeeItems).map(([name, value]) => ({
        name,
        value
      }));
    }

    return [];
  };

  // Render bar chart
  const renderBarChart = () => {
    if (chartData.length === 0) {
      return <div className="text-center py-10 text-gray-500">차트를 표시할 데이터가 없습니다</div>;
    }

    // Get all the keys except the period/date
    const dataKeys = Object.keys(chartData[0]).filter(key =>
      key !== 'period' && key !== 'date'
    );

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={timeFrame === 'daily' ? 'date' : 'period'}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.slice(0, 5).map((key, index) => (
            <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Render line chart
  const renderLineChart = () => {
    if (chartData.length === 0) {
      return <div className="text-center py-10 text-gray-500">차트를 표시할 데이터가 없습니다</div>;
    }

    // Get all the keys except the period/date
    const dataKeys = Object.keys(chartData[0]).filter(key =>
      key !== 'period' && key !== 'date'
    );

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={timeFrame === 'daily' ? 'date' : 'period'}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.slice(0, 5).map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[index % COLORS.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // Render pie chart
  const renderPieChart = () => {
    const pieData = preparePieChartData();

    if (pieData.length === 0) {
      return <div className="text-center py-10 text-gray-500">차트를 표시할 데이터가 없습니다</div>;
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {type === 'attendance' ? '근태 통계' : '업무 통계'}
          {timeFrame === 'daily' ? ' (일별)' : timeFrame === 'monthly' ? ' (월별)' : ' (연도별)'}
        </h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'bar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setChartType('bar')}
          >
            막대 차트
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'line'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setChartType('line')}
          >
            선 차트
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'pie'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setChartType('pie')}
          >
            파이 차트
          </button>
        </div>
      </div>

      {chartType === 'bar' && renderBarChart()}
      {chartType === 'line' && renderLineChart()}
      {chartType === 'pie' && renderPieChart()}
    </div>
  );
};

export default StatisticsChart;
