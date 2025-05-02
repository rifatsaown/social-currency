import { Loader, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Campaign } from '../../Interface';
import { userApi } from '../../services/api';
import UserLayout from './UserLayout';

const UserCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useAuth();

  useEffect(() => {
    if (userData?._id) {
      fetchCampaigns();
    }
  }, [userData]);

  const fetchCampaigns = async () => {
    if (!userData?._id) return;

    try {
      setLoading(true);
      setError(null);
      const campaignsData = await userApi.getUserCampaigns(userData._id);
      setCampaigns(campaignsData);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Failed to load your campaigns. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
            <p className="mt-2 text-gray-600">Loading your campaigns...</p>
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
                onClick={fetchCampaigns}
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

  return (
    <UserLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Campaigns</h1>
        <p className="text-gray-600 mt-1">
          Manage and view all your active campaigns
        </p>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <img
            src="https://illustrations.popsy.co/amber/creative-work.svg"
            alt="No campaigns"
            className="w-64 h-64 mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No campaigns yet
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            You don't have any campaigns assigned to you yet. Once you are added
            to a campaign, it will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">
              All Campaigns ({campaigns.length})
            </h2>
          </div>
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
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {campaign.name}
                      </div>
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
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                      {campaign.description || 'No description available'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default UserCampaigns;
