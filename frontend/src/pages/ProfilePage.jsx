import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { updateProfile } from '../services/api';

export const ProfilePage = () => {
    const { user, fetchUser } = useAppContext();
    const [formData, setFormData] = useState({ username: '', email: '' });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [imageChanged, setImageChanged] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || ''
            });
            setLoading(false);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');    

        if (passwordData.newPassword && passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }
    
        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        if (file) data.append('profileImage', file);
        if (passwordData.newPassword) {
            data.append('currentPassword', passwordData.currentPassword);
            data.append('newPassword', passwordData.newPassword);
            data.append('confirmPassword', passwordData.confirmPassword);
        }
    
        try {
            await updateProfile(data);
            await fetchUser();
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setImageChanged(false);
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message;
            let userMessage = 'Failed to update profile';
            
            if (errorMessage.includes('Current password is incorrect')) {
                userMessage = 'Current password is incorrect';
            } else if (errorMessage.includes('Passwords do not match')) {
                userMessage = 'New passwords must match';
            } else if (errorMessage.includes('already exists')) {
                userMessage = errorMessage;
            }
            
            setError(userMessage);
            console.error('Error updating profile:', errorMessage);
        }
    };
    
    


    if (loading) return <div className="text-center p-8">Loading profile...</div>;

    return (
        <section className="bg-white py-6 md:py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <NavLink to="/" className="text-red-600 hover:text-red-700 inline-flex items-center gap-1 mb-4">
                        ← Back to Home
                    </NavLink>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Manage your account settings and profile information
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="space-y-8 p-6 bg-gray-50 rounded-xl">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-900">Profile Details</h2>
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        {user?.profileImage ? (
                                            <img 
                                                src={`http://localhost:8001${user.profileImage}`} 
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = assets.profile_icon}
                                            />
                                        ) : (
                                            <img src={assets.profile_icon} className="w-20 h-20" alt="Default Profile" />
                                        )}
                                    </div>
                                    <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                                        <img src={assets.image} className="w-5 h-5" alt="Edit" />
                                        <input
                                            type="file"
                                            id="profileImage"
                                            className="hidden"
                                            onChange={(e) => {
                                                setFile(e.target.files[0]);
                                                setImageChanged(true);
                                            }}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                                {imageChanged && (
                                    <p className="text-sm text-green-600">
                                        Image changed. Click Update Profile to save changes.
                                    </p>
                                )}
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {user?.username || 'No username set'}
                                    </h3>
                                    <p className="text-gray-600">{user?.email}</p>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
                                    <dl className="space-y-3">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Member Since</dt>
                                            <dd className="text-gray-900 ml-3">
                                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Favorite Cars</dt>
                                            <dd className="text-gray-900 ml-3">    {user?.favoritesCount ?? 0}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Saved Filters</dt>
                                            <dd className="text-gray-900 ml-3">{user?.filtersCount ?? 0}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
                                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <div>{error}</div>
                                </div>
                                )}

                                {successMessage && (
                                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start">
                                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>{successMessage}</div>
                                </div>
                                )}

                            <div>
                                <label className="block text-gray-700 mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Password</h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-gray-700 mb-2">Current Password</label>
                                        <input
                                            type={showPasswords.current ? 'text' : 'password'}
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-8"
                                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                        >
                                            <img 
                                                src={showPasswords.current ? assets.open_eye : assets.close_eye} 
                                                className="w-5 h-5" 
                                                alt="Toggle visibility" 
                                            />
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-gray-700 mb-2">New Password</label>
                                        <input
                                            type={showPasswords.new ? 'text' : 'password'}
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-8"
                                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                        >
                                            <img 
                                                src={showPasswords.new ? assets.open_eye : assets.close_eye} 
                                                className="w-5 h-5" 
                                                alt="Toggle visibility" 
                                            />
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-gray-700 mb-2">Confirm New Password</label>
                                        <input
                                            type={showPasswords.confirm ? 'text' : 'password'}
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-8"
                                            onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                        >
                                            <img 
                                                src={showPasswords.confirm ? assets.open_eye : assets.close_eye} 
                                                className="w-5 h-5" 
                                                alt="Toggle visibility" 
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    className="w-full bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};