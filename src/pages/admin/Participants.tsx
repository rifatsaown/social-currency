import {
  CoinsIcon,
  Eye,
  EyeOff,
  Search,
  Trash2,
  UserCheck,
  UserX,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { userApi } from '../../services/api';
import AdminLayout from './AdminLayout';

interface Participant {
  _id: string;
  fullName: string;
  email: string;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  instaHandle?: string;
  phoneNumber?: string;
  createdAt?: string;
  password?: string;
  coinBalance?: number;
}

const Participants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [coinBalanceModal, setCoinBalanceModal] = useState<{
    isOpen: boolean;
    userId: string | null;
    currentBalance: number;
  }>({
    isOpen: false,
    userId: null,
    currentBalance: 0,
  });
  const [coinAmount, setCoinAmount] = useState<number>(0);
  const [coinLoading, setCoinLoading] = useState(false);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      setError('');
      const participantsData = await userApi.getAllParticipants();
      setParticipants(participantsData as Participant[]);
      setFilteredParticipants(participantsData as Participant[]);
    } catch (err) {
      console.error('Error fetching participants:', err);
      setError('Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredParticipants(participants);
    } else {
      const filtered = participants.filter(
        (participant) =>
          participant.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          participant.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredParticipants(filtered);
    }
  }, [searchTerm, participants]);

  const toggleUserStatus = async (userId: string, makeActive: boolean) => {
    try {
      setToggleLoading(userId);
      setError('');

      // Use our updateUserStatus method that properly maps to backend status
      await userApi.updateUserStatus(userId, makeActive);

      // Update the local state
      setParticipants((prevParticipants) =>
        prevParticipants.map((p) =>
          p._id === userId
            ? { ...p, status: makeActive ? 'active' : 'inactive' }
            : p
        )
      );
    } catch (err) {
      console.error('Error toggling user status:', err);
      setError('Failed to update user status');
    } finally {
      setToggleLoading(null);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setDeleteLoading(userId);
      setError('');

      // Delete user through API
      await userApi.deleteUser(userId);

      // Remove from local state
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p._id !== userId)
      );
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    } finally {
      setDeleteLoading(null);
    }
  };

  const togglePasswordVisibility = (userId: string) => {
    setShowPassword((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const openCoinBalanceModal = (userId: string, currentBalance: number = 0) => {
    setCoinBalanceModal({
      isOpen: true,
      userId,
      currentBalance,
    });
    setCoinAmount(0);
  };

  const closeCoinBalanceModal = () => {
    setCoinBalanceModal({
      isOpen: false,
      userId: null,
      currentBalance: 0,
    });
    setCoinAmount(0);
  };

  const updateCoinBalance = async () => {
    if (!coinBalanceModal.userId || coinAmount === 0) return;

    try {
      setCoinLoading(true);
      setError('');

      // Update coin balance through API
      const updatedUser = await userApi.updateCoinBalance(
        coinBalanceModal.userId,
        coinAmount
      );

      // Update local state
      setParticipants((prevParticipants) =>
        prevParticipants.map((p) =>
          p._id === coinBalanceModal.userId
            ? { ...p, coinBalance: updatedUser.coinBalance }
            : p
        )
      );

      closeCoinBalanceModal();
    } catch (err) {
      console.error('Error updating coin balance:', err);
      setError('Failed to update coin balance');
    } finally {
      setCoinLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manage Participants</h1>
          <p className="text-gray-600">View and manage all participants</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-4 relative">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading participants...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : filteredParticipants.length === 0 ? (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          No participants found.
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
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
                  Date Added
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Instagram Handle
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Temp Password
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Coin Balance
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParticipants.map((participant) => (
                <tr key={participant._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {participant.fullName || 'No Name'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {participant.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        participant.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {participant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {participant.createdAt
                      ? new Date(participant.createdAt).toLocaleDateString()
                      : 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {participant.instaHandle || 'No Handle'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {participant.password ? (
                      <div className="flex items-center">
                        <span className="text-gray-700 font-mono">
                          {showPassword[participant._id]
                            ? participant.password
                            : '••••••••'}
                        </span>
                        <button
                          onClick={() =>
                            togglePasswordVisibility(participant._id)
                          }
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          title={
                            showPassword[participant._id]
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {showPassword[participant._id] ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700 mr-2">
                        {participant.coinBalance || 0}
                      </span>
                      <button
                        onClick={() =>
                          openCoinBalanceModal(
                            participant._id,
                            participant.coinBalance || 0
                          )
                        }
                        className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-100"
                        title="Update coin balance"
                      >
                        <CoinsIcon size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-y-2">
                    {toggleLoading === participant._id ? (
                      <div className="text-gray-400">Processing status...</div>
                    ) : (
                      <>
                        {participant.status === 'active' ? (
                          <button
                            onClick={() =>
                              toggleUserStatus(participant._id, false)
                            }
                            className="text-red-600 hover:text-red-900 flex items-center justify-end gap-1 w-full"
                          >
                            <UserX size={16} /> Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              toggleUserStatus(participant._id, true)
                            }
                            className="text-green-600 hover:text-green-900 flex items-center justify-end gap-1 w-full"
                          >
                            <UserCheck size={16} /> Activate
                          </button>
                        )}
                      </>
                    )}

                    {deleteLoading === participant._id ? (
                      <div className="text-gray-400">Deleting...</div>
                    ) : (
                      <button
                        onClick={() => deleteUser(participant._id)}
                        className="text-red-600 hover:text-red-900 flex items-center justify-end gap-1 w-full"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Coin Balance Modal */}
      {coinBalanceModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Update Coin Balance</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Current Balance</p>
              <p className="text-lg font-semibold">
                {coinBalanceModal.currentBalance} coins
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add/Remove Coins
              </label>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    setCoinAmount((prev) => Math.max(-1000, prev - 10))
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
                >
                  -10
                </button>
                <input
                  type="number"
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(Number(e.target.value))}
                  className="border-y border-gray-300 p-2 w-full text-center"
                  placeholder="Enter amount"
                />
                <button
                  onClick={() =>
                    setCoinAmount((prev) => Math.min(1000, prev + 10))
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
                >
                  +10
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter a positive number to add coins, negative to remove coins
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeCoinBalanceModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={updateCoinBalance}
                disabled={coinAmount === 0 || coinLoading}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white 
                ${
                  coinAmount === 0
                    ? 'bg-blue-300'
                    : 'bg-blue-600 hover:bg-blue-700'
                }
                ${coinLoading ? 'opacity-75 cursor-not-allowed' : ''}
                `}
              >
                {coinLoading ? 'Updating...' : 'Update Balance'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Participants;
