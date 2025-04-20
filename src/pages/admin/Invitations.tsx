import { CheckCircle, Copy, Mail } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from './AdminLayout';

const Invitations = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      setInviteLink('');
      setCopied(false);

      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/invite`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, displayName }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send invitation');
      }

      const data = await response.json();
      setSuccessMessage(`Invitation sent to ${email} successfully`);
      setInviteLink(data.inviteLink);
      setEmail('');
      setDisplayName('');
    } catch (err: Error | unknown) {
      console.error('Error sending invitation:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send invitation';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Send Invitations</h1>
        <p className="text-gray-600">
          Invite new participants to join the platform
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <form onSubmit={handleSendInvitation}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter participant's email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Display Name (Optional)
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter participant's name"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></div>
                Sending...
              </>
            ) : (
              <>
                <Mail size={16} />
                Send Invitation
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {successMessage}
        </div>
      )}

      {inviteLink && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Invitation Link
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Share this link with the participant. The link can only be used
            once.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Invitations;
