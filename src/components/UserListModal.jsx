import React from 'react';
import { Link } from 'react-router-dom';

const UserListModal = ({ users, onClose, title = "Users" }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-full max-w-md shadow-2xl relative max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <Link
                                to={`/channel/${user.username}`}
                                key={user._id}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-all group"
                                onClick={onClose}
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
                                    <img
                                        src={user.avatar}
                                        alt={user.username}
                                        className="w-full h-full rounded-full object-cover bg-gray-900"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{user.fullName}</h3>
                                    <p className="text-sm text-gray-400">@{user.username}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-8">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserListModal;
