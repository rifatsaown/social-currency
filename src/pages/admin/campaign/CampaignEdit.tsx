import { ArrowLeft, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Campaign, Participant } from '../../../Interface';
import { campaignApi, userApi } from '../../../services/api';
import AdminLayout from '../AdminLayout';

const CampaignEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'active' | 'completed' | 'draft'>(
    'draft'
  );
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [availableParticipants, setAvailableParticipants] = useState<
    Participant[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (id) {
      fetchCampaign(id);
      fetchParticipants();
    }
  }, [id]);

  const fetchCampaign = async (campaignId: string) => {
    try {
      setLoading(true);
      setError('');
      const campaignData = await campaignApi.getCampaignById(campaignId);
      setCampaign(campaignData);

      // Set form data
      setName(campaignData.name);
      setDescription(campaignData.description || '');
      setStatus(campaignData.status);
      setSelectedParticipants(campaignData.participants.map((p) => p._id));
    } catch (err) {
      console.error('Error fetching campaign:', err);
      setError('Failed to load campaign details');
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipants = async () => {
    try {
      const participantData = await userApi.getAllParticipants();
      setAvailableParticipants(participantData as Participant[]);
    } catch (err) {
      console.error('Error fetching participants:', err);
      setError('Failed to load participants');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError('Campaign name is required');
      return;
    }

    if (selectedParticipants.length === 0) {
      setError('Please select at least one participant');
      return;
    }

    try {
      setUpdateLoading(true);
      setError('');

      const updateData = {
        name,
        description,
        status,
        participants: selectedParticipants,
      };

      console.log('Updating campaign data:', JSON.stringify(updateData));

      await campaignApi.updateCampaign(id!, updateData);
      navigate(`/admin/campaigns/${id}`);
    } catch (err) {
      console.error('Error updating campaign:', err);
      setError('Failed to update campaign');
      setUpdateLoading(false);
    }
  };

  const toggleParticipant = (participantId: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(participantId)
        ? prev.filter((p) => p !== participantId)
        : [...prev, participantId]
    );
  };

  // Filter participants based on search term
  const filteredParticipants = availableParticipants.filter(
    (participant) =>
      participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (participant.instaHandle &&
        participant.instaHandle
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaign details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error && !campaign) {
    return (
      <AdminLayout>
        <div className="mb-4">
          <Link
            to="/admin/campaigns"
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Campaigns
          </Link>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          to={`/admin/campaigns/${id}`}
          className="flex items-center text-purple-600 hover:text-purple-800 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Campaign Details
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Campaign</h1>
            <p className="text-gray-600 mt-1">
              Update campaign details and participants
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Campaign Name*
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter campaign name"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as 'active' | 'completed' | 'draft')
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter campaign description"
              rows={3}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Participants*
            </label>

            <div className="mb-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Search participants..."
              />
            </div>

            <div className="border border-gray-200 rounded-md overflow-y-auto max-h-60">
              {filteredParticipants.length === 0 ? (
                <div className="py-4 text-center text-gray-500">
                  {searchTerm
                    ? `No participants found matching "${searchTerm}"`
                    : 'No participants available'}
                </div>
              ) : (
                filteredParticipants.map((participant) => (
                  <div
                    key={participant._id}
                    className={`flex items-center px-3 py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                      selectedParticipants.includes(participant._id)
                        ? 'bg-purple-50'
                        : ''
                    }`}
                    onClick={() => toggleParticipant(participant._id)}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{participant.fullName}</div>
                      <div className="text-sm text-gray-500">
                        {participant.email}
                      </div>
                      {participant.instaHandle && (
                        <div className="text-xs text-gray-400">
                          @{participant.instaHandle}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedParticipants.includes(participant._id)}
                        onChange={() => {}}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-2 text-sm text-gray-600">
              {selectedParticipants.length} participants selected
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Link
              to={`/admin/campaigns/${id}`}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
            >
              <X size={18} className="mr-1" />
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-1" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CampaignEdit;
