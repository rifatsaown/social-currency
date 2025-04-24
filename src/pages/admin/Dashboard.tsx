import { UserCheck, Users, UserX } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Stats } from '../../Interface';

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalParticipants: 0,
    activeParticipants: 0,
    inactiveParticipants: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch participant data');
        }

        const data = await response.json();
        const participants = data.data || [];
        console.log('Fetched participants:', participants);


        setStats({
          totalParticipants: participants.length,
          activeParticipants: participants.filter((p: { status: unknown; }) => p.status === 'active')
            .length,
          inactiveParticipants: participants.filter((p: { status: unknown; }) => p.status !== 'active')
            .length,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    className,
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    className: string;
  }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${className}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-600">Overview of the system statistics</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading statistics...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Participants"
            value={stats.totalParticipants}
            icon={Users}
            className="bg-blue-500"
          />
          <StatCard
            title="Active Participants"
            value={stats.activeParticipants}
            icon={UserCheck}
            className="bg-green-500"
          />
          <StatCard
            title="Inactive Participants"
            value={stats.inactiveParticipants}
            icon={UserX}
            className="bg-red-500"
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
