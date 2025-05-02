import { Activity, CreditCard, Loader, RefreshCw, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Campaign, UserDashboardData } from '../../Interface';
import { userApi } from '../../services/api';
import UserLayout from './UserLayout';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getUserDashboard();
      setDashboardData(data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load your dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-8 w-8 animate-spin text-pink-500 mx-auto" />
            <p className="mt-2 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={fetchDashboardData}
                className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-500"
              >
                <RefreshCw size={16} className="mr-1" /> Try Again
              </button>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }

  if (!dashboardData) {
    return (
      <UserLayout>
        <div className="text-center text-gray-600">No data available</div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {dashboardData.user.fullName}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your activities and campaigns
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-lg shadow-sm">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-700">
              Active Campaigns
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {
              dashboardData.campaigns.filter((c) => c.status === 'active')
                .length
            }
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total campaigns: {dashboardData.campaigns.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-lg shadow-sm">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-700">
              Coin Balance
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {dashboardData.user.coinBalance || 0}
          </p>
          <p className="text-sm text-gray-500 mt-1">Available to redeem</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-lg shadow-sm">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-700">
              Recent Activity
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {dashboardData.recentActivities.length}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Actions in the last 30 days
          </p>
        </div>
      </div>

      {/* My Campaigns section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Campaigns</h2>
        {dashboardData.campaigns.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">You don't have any campaigns yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Campaign Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.campaigns.map((campaign: Campaign) => (
                  <tr key={campaign._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </div>
                      {campaign.description && (
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {campaign.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          campaign.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : campaign.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(campaign.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Activity section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>
        {dashboardData.recentActivities.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dashboardData.recentActivities.map((activity) => (
              <div key={activity._id} className="flex items-start">
                <div className="bg-gray-100 rounded-full p-2 mr-4">
                  <Activity className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {activity.action}
                  </p>
                  {activity.details && (
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.details}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(activity.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
