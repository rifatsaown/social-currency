import { CategoryScale, ChartData as ChartJsData } from 'chart.js';
import Chart from 'chart.js/auto';
import {
  Activity,
  BarChart2,
  Calendar,
  InfoIcon,
  RefreshCw,
  TrendingUp,
  UserCheck,
  Users,
  UserX,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ActivityLog, ChartData, DashboardData, Stats } from '../../Interface';
import AdminLayout from './AdminLayout';

// Register the CategoryScale component
Chart.register(CategoryScale);

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalParticipants: 0,
    activeParticipants: 0,
    inactiveParticipants: 0,
    influencers: 0,
    brands: 0,
    admins: 0,
  });
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const result = await response.json();
      const dashboardData = result.data as DashboardData;

      setStats(dashboardData.userStats);
      setChartData(dashboardData.charts);
      setActivities(dashboardData.recentActivities);

      console.log('Fetched dashboard data:', dashboardData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard statistics');

      // Set fallback sample data if API fails
      setFallbackData();
    } finally {
      setLoading(false);
    }
  };

  // Fallback data in case API fails
  const setFallbackData = () => {
    const currentDate = new Date();

    // Sample user statistics
    const sampleStats: Stats = {
      totalParticipants: 125,
      activeParticipants: 87,
      inactiveParticipants: 38,
      influencers: 98,
      brands: 22,
      admins: 5,
    };

    // Sample chart data
    const sampleChartData: ChartData = {
      statusDistribution: {
        active: 87,
        inactive: 18,
        pending: 15,
        blocked: 5,
      },
      monthlyRegistrations: Array.from({ length: 6 }, (_, i) => {
        const month = new Date();
        month.setMonth(currentDate.getMonth() - 5 + i);
        return {
          _id: {
            month: month.getMonth() + 1,
            year: month.getFullYear(),
          },
          count: Math.floor(Math.random() * 20) + 5,
        };
      }),
    };

    // Sample activities
    const sampleActivities: ActivityLog[] = Array.from(
      { length: 5 },
      (_, i) => ({
        _id: `sample-${i}`,
        userId: {
          _id: `user-${i}`,
          fullName: `User Example ${i + 1}`,
          email: `user${i + 1}@example.com`,
        },
        action: [
          'Logged in to the system',
          'Updated profile information',
          'Created a new post',
          'Changed account settings',
          'Registered as a new user',
        ][i],
        timestamp: new Date(currentDate.getTime() - i * 3600000),
        status: 'completed',
      })
    );

    setStats(sampleStats);
    setChartData(sampleChartData);
    setActivities(sampleActivities);
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    className,
    trend,
    percent,
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    className: string;
    trend?: 'up' | 'down' | 'neutral';
    percent?: number;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${className}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div
            className={`flex items-center text-sm font-medium
            ${
              trend === 'up'
                ? 'text-green-600'
                : trend === 'down'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {trend === 'up' ? (
              <TrendingUp size={16} className="mr-1" />
            ) : trend === 'down' ? (
              <TrendingUp size={16} className="mr-1 transform rotate-180" />
            ) : (
              <Activity size={16} className="mr-1" />
            )}
            {percent}%
          </div>
        )}
      </div>
      <h3 className="text-4xl font-bold text-gray-800">
        {value.toLocaleString()}
      </h3>
      <p className="text-gray-500 mt-1">{title}</p>
    </div>
  );

  // Format data for bar chart
  const getBarChartData = () => {
    if (!chartData) return null;

    const registrations = chartData.monthlyRegistrations;

    // Sort registrations by date
    registrations.sort((a, b) => {
      if (a._id.year !== b._id.year) {
        return a._id.year - b._id.year;
      }
      return a._id.month - b._id.month;
    });

    const labels = registrations.map((item) => {
      return `${monthNames[item._id.month - 1]} ${item._id.year}`;
    });

    const data = registrations.map((item) => item.count);

    return {
      labels,
      datasets: [
        {
          label: 'New Registrations',
          data,
          backgroundColor: 'rgba(124, 58, 237, 0.7)',
          borderColor: 'rgba(124, 58, 237, 1)',
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 20,
        },
      ],
    };
  };

  // Format data for doughnut chart
  const getDoughnutChartData = () => {
    if (!chartData) return null;

    const distribution = chartData.statusDistribution;

    return {
      labels: ['Active', 'Inactive', 'Pending', 'Blocked'],
      datasets: [
        {
          data: [
            distribution.active,
            distribution.inactive,
            distribution.pending,
            distribution.blocked,
          ],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)', // green
            'rgba(239, 68, 68, 0.8)', // red
            'rgba(234, 179, 8, 0.8)', // yellow
            'rgba(75, 85, 99, 0.8)', // gray
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(75, 85, 99, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status badge class based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome to your admin control center
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <button
              onClick={fetchDashboardData}
              className="flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              <RefreshCw size={16} className="mr-1" />
              Refresh Data
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-12">
          <div className="w-16 h-16 relative">
            <div className="absolute top-0 w-16 h-16 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 w-16 h-16 rounded-full border-4 border-t-purple-600 animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">
            Loading dashboard data...
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 flex items-start">
          <InfoIcon size={20} className="mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Error Loading Data</h3>
            <p className="mt-1">{error}</p>
            <button
              className="mt-3 text-sm font-medium text-red-700 hover:text-red-800 underline"
              onClick={fetchDashboardData}
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Participants"
              value={stats.totalParticipants}
              icon={Users}
              className="bg-gradient-to-r from-blue-500 to-blue-600"
              trend="up"
              percent={12}
            />
            <StatCard
              title="Active Participants"
              value={stats.activeParticipants}
              icon={UserCheck}
              className="bg-gradient-to-r from-green-500 to-green-600"
              trend="up"
              percent={8}
            />
            <StatCard
              title="Inactive Participants"
              value={stats.inactiveParticipants}
              icon={UserX}
              className="bg-gradient-to-r from-red-500 to-red-600"
              trend="down"
              percent={3}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">
                  Participant Registrations
                </h3>
                <Activity size={20} className="text-purple-600" />
              </div>
              <div className="h-72">
                {getBarChartData() ? (
                  <Bar
                    data={getBarChartData() as ChartJsData<'bar'>}
                    options={chartOptions}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-gray-400 text-sm">
                      No data available for chart
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">
                  Status Distribution
                </h3>
                <BarChart2 size={20} className="text-blue-600" />
              </div>
              <div className="h-72">
                {getDoughnutChartData() ? (
                  <Doughnut
                    data={
                      getDoughnutChartData() as unknown as ChartJsData<'doughnut'>
                    }
                    options={doughnutOptions}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-gray-400 text-sm">
                      No data available for chart
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-700">Recent Activity</h3>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <tr key={activity._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-sm font-medium">
                              {activity.userId.fullName?.charAt(0) || 'U'}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {activity.userId.fullName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {activity.userId.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {activity.action}
                          {activity.details && (
                            <p className="text-xs text-gray-400 mt-1">
                              {activity.details}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                              activity.status
                            )}`}
                          >
                            {activity.status.charAt(0).toUpperCase() +
                              activity.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(new Date(activity.timestamp))}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-sm text-gray-500"
                      >
                        No activity data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
