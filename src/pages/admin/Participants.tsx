import { UserCheck, UserX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { userApi } from '../../services/api';
import AdminLayout from './AdminLayout';

interface Participant {
  id: string; // For backward compatibility
  uid: string;
  displayName: string | null;
  email: string | null;
  isActive: boolean;
  createdAt?: string;
}

const Participants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  const fetchParticipants = async () => {
    try {
      const participantsData = await userApi.getAllParticipants();

      // Map the data to match our component's expected format
      const formattedParticipants = participantsData.map((p) => ({
        ...p,
        id: p.uid, // For backward compatibility
        isActive: p.isActive ?? false, // Ensure isActive is always a boolean
      }));

      setParticipants(formattedParticipants);
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

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      setToggleLoading(userId);

      // Update user status through API
      await userApi.updateUser(userId, { isActive });

      // Update the local state
      setParticipants((prevParticipants) =>
        prevParticipants.map((p) => (p.id === userId ? { ...p, isActive } : p))
      );
    } catch (err) {
      console.error('Error toggling user status:', err);
      setError('Failed to update user status');
    } finally {
      setToggleLoading(null);
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

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading participants...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : participants.length === 0 ? (
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
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {participant.displayName || 'No Name'}
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
                        participant.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {participant.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {participant.createdAt
                      ? new Date(participant.createdAt).toLocaleDateString()
                      : 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {toggleLoading === participant.id ? (
                      <span className="text-gray-400">Processing...</span>
                    ) : participant.isActive ? (
                      <button
                        onClick={() => toggleUserStatus(participant.id, false)}
                        className="text-red-600 hover:text-red-900 flex items-center justify-end gap-1"
                      >
                        <UserX size={16} /> Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleUserStatus(participant.id, true)}
                        className="text-green-600 hover:text-green-900 flex items-center justify-end gap-1"
                      >
                        <UserCheck size={16} /> Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default Participants;
