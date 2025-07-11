import {
  Check,
  Copy,
  Instagram,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { userApi } from '../../services/api';

interface EligibilityCheck {
  _id: string;
  fullName: string;
  email: string;
  instagramHandle: string;
  mobileNumber: string;
  city: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface ApprovedUser {
  id: string;
  email: string;
  temporaryPassword: string;
}

const EligibilityChecks = () => {
  const [eligibilityChecks, setEligibilityChecks] = useState<
    EligibilityCheck[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [approvedUser, setApprovedUser] = useState<ApprovedUser | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    loadEligibilityChecks();
  }, []);

  const loadEligibilityChecks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.getAllEligibilityChecks();
      setEligibilityChecks(data as EligibilityCheck[]);
    } catch (err) {
      setError('Failed to load eligibility checks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = async (id: string, status: 'approved' | 'rejected') => {
    setProcessing((prev) => ({ ...prev, [id]: true }));
    setError(null);
    setSuccess(null);
    setApprovedUser(null);

    try {
      const response = await userApi.processEligibilityCheck(id, status);

      if (status === 'approved') {
        // Store the temporary password from the response
        const typedResponse = response as { email: string; temporaryPassword: string };
        setApprovedUser({
          id,
          email: typedResponse.email,
          temporaryPassword: typedResponse.temporaryPassword,
        });

        setSuccess(
          'User has been approved and account has been created successfully'
        );
      } else {
        setSuccess('User has been rejected successfully');
      }

      // Update the list
      setEligibilityChecks((prev) =>
        prev.map((check) => (check._id === id ? { ...check, status } : check))
      );

      // Refresh the list after 5 seconds (increased time to allow viewing credentials)
      setTimeout(() => {
        if (status === 'rejected') {
          loadEligibilityChecks();
        }
      }, 5000);
    } catch (err) {
      setError(`Failed to ${status} user`);
      console.error(err);
    } finally {
      setProcessing((prev) => ({ ...prev, [id]: false }));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeCredentialsModal = () => {
    setApprovedUser(null);
    loadEligibilityChecks();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Eligibility Checks</h2>
        <button
          onClick={loadEligibilityChecks}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && !approvedUser && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      {/* Credentials Modal */}
      {approvedUser && (
        <div className="mb-6 p-4 border border-green-300 bg-green-50 rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-green-800">
              User Account Created Successfully
            </h3>
            <button
              onClick={closeCredentialsModal}
              className="text-green-600 hover:text-green-800"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mt-2 text-green-700">
            An account has been created for this user. Please share these
            credentials with them:
          </p>

          <div className="mt-4 bg-white p-4 rounded border border-green-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Email:</span>
              <div className="flex items-center">
                <span className="font-medium text-gray-800 mr-2">
                  {approvedUser.email}
                </span>
                <button
                  onClick={() => copyToClipboard(approvedUser.email)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Copy email"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temporary Password:</span>
              <div className="flex items-center">
                <span className="font-medium text-gray-800 mr-2">
                  {approvedUser.temporaryPassword}
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(approvedUser.temporaryPassword)
                  }
                  className="text-blue-600 hover:text-blue-800"
                  title="Copy password"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {copied && (
              <div className="mt-2 text-xs text-green-600">
                Copied to clipboard!
              </div>
            )}
          </div>

          <div className="mt-3 text-xs text-gray-600">
            Note: The user should change their password after the first login.
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={closeCredentialsModal}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading eligibility checks...</p>
        </div>
      ) : eligibilityChecks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No eligibility checks found</p>
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
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
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
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eligibilityChecks.map((check) => (
                <tr key={check._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {check.fullName}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Instagram size={14} className="mr-1" />
                          <span>{check.instagramHandle}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail size={14} className="mr-1" /> {check.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone size={14} className="mr-1" /> {check.mobileNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <MapPin size={14} className="mr-1" /> {check.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(check.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        check.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : check.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {check.status.charAt(0).toUpperCase() +
                        check.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {check.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleProcess(check._id, 'approved')}
                          disabled={processing[check._id]}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center disabled:opacity-50"
                        >
                          {processing[check._id] ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                          ) : (
                            <Check size={16} className="mr-1" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleProcess(check._id, 'rejected')}
                          disabled={processing[check._id]}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center disabled:opacity-50"
                        >
                          {processing[check._id] ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                          ) : (
                            <X size={16} className="mr-1" />
                          )}
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        {check.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EligibilityChecks;
