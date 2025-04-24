import { CheckCircle, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Campaign, CreateCampaignData, Participant } from '../../Interface';
import { campaignApi, userApi } from '../../services/api';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaign: Campaign) => void;
}

const CreateCampaignModal = ({
  isOpen,
  onClose,
  onCampaignCreated,
}: CreateCampaignModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [participantsLoading, setParticipantsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all participants when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchParticipants();
    }
  }, [isOpen]);

  const fetchParticipants = async () => {
    try {
      setParticipantsLoading(true);
      const participantData = await userApi.getAllParticipants();
      setParticipants(participantData as Participant[]);
    } catch (err) {
      console.error('Error fetching participants:', err);
      setError('Failed to load participants');
    } finally {
      setParticipantsLoading(false);
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
      setLoading(true);
      setError('');

      const campaignData: CreateCampaignData = {
        name,
        description,
        participants: selectedParticipants,
      };

      console.log('Submitting campaign data:', JSON.stringify(campaignData));

      const newCampaign = await campaignApi.createCampaign(campaignData);
      onCampaignCreated(newCampaign);
    } catch (err) {
      console.error('Error creating campaign:', err);
      setError('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  const toggleParticipant = (id: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Filter participants based on search term
  const filteredParticipants = participants.filter(
    (participant) =>
      participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (participant.instaHandle &&
        participant.instaHandle
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Campaign
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-grow">
          {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{error}</p>
            </div>
          )}

          <form id="campaignForm" onSubmit={handleSubmit}>
            <div className="mb-4">
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

            <div className="mb-4">
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

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Select Participants*
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

              {participantsLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">
                    Loading participants...
                  </p>
                </div>
              ) : filteredParticipants.length === 0 ? (
                <div className="py-4 text-center text-gray-500">
                  {searchTerm
                    ? `No participants found matching "${searchTerm}"`
                    : 'No participants available'}
                </div>
              ) : (
                <div className="border border-gray-200 rounded-md overflow-y-auto max-h-60">
                  {filteredParticipants.map((participant) => (
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
                        <div className="font-medium">
                          {participant.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {participant.email}
                        </div>
                        {participant.instaHandle && (
                          <div className="text-xs text-gray-400">
                            @{participant.instaHandle}
                          </div>
                        )}
                      </div>
                      {selectedParticipants.includes(participant._id) && (
                        <CheckCircle className="text-purple-600" size={20} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-2 text-sm text-gray-600">
                {selectedParticipants.length} participants selected
              </div>
            </div>
          </form>
        </div>

        <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="campaignForm"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Plus size={20} className="mr-1" />
                Create Campaign
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
