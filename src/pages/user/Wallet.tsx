import {
  ArrowDownRight,
  ArrowUpRight,
  Coins,
  CreditCard,
  Loader,
  RefreshCw,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ActivityLog } from '../../Interface';
import { userApi } from '../../services/api';
import UserLayout from './UserLayout';

const UserWallet = () => {
  const [coinBalance, setCoinBalance] = useState<number>(0);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user dashboard data which includes coin balance and activities
      const dashboardData = await userApi.getUserDashboard();
      setCoinBalance(dashboardData.user.coinBalance || 0);

      // Filter activities related to coin balance
      const coinActivities = dashboardData.recentActivities.filter(
        (activity) =>
          activity.action.toLowerCase().includes('coin') ||
          (activity.details && activity.details.toLowerCase().includes('coin'))
      );

      setActivities(coinActivities);
    } catch (err) {
      console.error('Error fetching wallet data:', err);
      setError('Failed to load your wallet data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-8 w-8 animate-spin text-pink-500 mx-auto" />
            <p className="mt-2 text-gray-600">Loading your wallet...</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
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
                onClick={fetchWalletData}
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

  // Helper function to determine if a transaction is a deposit or withdrawal
  const isDeposit = (activity: ActivityLog): boolean => {
    if (!activity.details) return false;
    return (
      activity.details.toLowerCase().includes('added') ||
      !activity.details.toLowerCase().includes('deducted')
    );
  };

  // Helper function to extract amount from activity details
  const getTransactionAmount = (activity: ActivityLog): number | null => {
    if (!activity.details) return null;

    const matches = activity.details.match(/\d+/);
    if (matches) {
      return parseInt(matches[0], 10);
    }
    return null;
  };

  return (
    <UserLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Coin Wallet</h1>
        <p className="text-gray-600 mt-1">
          Manage your social currency coin balance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-gradient-to-br from-pink-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center">
            <Coins className="h-10 w-10 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Available Balance</h2>
              <p className="text-4xl font-bold mt-2">{coinBalance}</p>
              <p className="text-sm opacity-80 mt-1">Social Currency Coins</p>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
              disabled
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Send Coins
            </button>
            <button
              className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
              disabled
            >
              <ArrowDownRight className="h-4 w-4 mr-2" />
              Request Coins
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="h-6 w-6 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-700">Coin Stats</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Earned</span>
              <span className="font-semibold text-gray-900">{coinBalance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Redemptions</span>
              <span className="font-semibold text-gray-900">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Activity</span>
              <span className="font-semibold text-gray-900">
                {activities.length > 0
                  ? new Date(activities[0].timestamp).toLocaleDateString()
                  : 'No activity yet'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Transaction History</h2>
          <button
            onClick={fetchWalletData}
            className="text-sm text-pink-600 hover:text-pink-700 flex items-center"
          >
            <RefreshCw size={14} className="mr-1" /> Refresh
          </button>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Coins className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              No transactions yet
            </h3>
            <p className="text-gray-500 mt-1 max-w-md mx-auto">
              Your coin transactions will appear here once you start earning
              coins from campaigns
            </p>
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
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isDeposit(activity)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isDeposit(activity) ? 'Deposit' : 'Withdrawal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <span
                        className={
                          isDeposit(activity)
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {isDeposit(activity) ? '+' : '-'}
                        {getTransactionAmount(activity) || 'Unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserWallet;
