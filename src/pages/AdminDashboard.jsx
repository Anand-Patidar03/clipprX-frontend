import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { formatTimeAgo } from '../utils/timeAgo';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/admin/users");
            setUsers(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch users", err);
            setError("Failed to load users.");
            setLoading(false);
        }
    };

    const handleToggleBlock = async (userId) => {
        try {
            const res = await api.patch(`/admin/users/${userId}/block`);
            setUsers(users.map(user =>
                user._id === userId ? { ...user, isBlocked: res.data.data.isBlocked } : user
            ));
        } catch (err) {
            console.error("Failed to block/unblock user", err);
            alert(err.response?.data?.message || "Action failed");
        }
    };

    if (loading) return <div className="text-white text-center mt-10">Loading Dashboard...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-6 text-purple-500">Admin Dashboard</h1>

            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-700 text-gray-300 border-b border-gray-600">
                            <th className="p-4">User</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-750 transition">
                                <td className="p-4 flex items-center gap-3">
                                    <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <div className="font-bold">{user.fullName}</div>
                                        <div className="text-xs text-gray-400">@{user.username}</div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-300">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.isBlocked ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                        {user.isBlocked ? 'Suspended' : 'Active'}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 text-sm">{formatTimeAgo(user.createdAt)}</td>
                                <td className="p-4">
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => handleToggleBlock(user._id)}
                                            className={`px-4 py-2 rounded font-bold text-sm transition ${user.isBlocked ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}
                                        >
                                            {user.isBlocked ? 'Unblock' : 'Suspend'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
