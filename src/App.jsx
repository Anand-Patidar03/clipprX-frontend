import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";

import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Watch from "./pages/Watch";
import PlaylistList from "./pages/PlaylistList";
import PlaylistDetail from "./pages/PlaylistDetail";
import TweetFeed from "./pages/TweetFeed";
import EmptyState from "./components/EmptyState";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Video Routes */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/:videoId"
          element={
            <ProtectedRoute>
              <Watch />
            </ProtectedRoute>
          }
        />

        {/* User & Channel Routes */}
        <Route
          path="/channel/:username"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Features / Placeholders mapped from backend routes */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-900 pt-20 px-6">
                <EmptyState
                  title="Watch History"
                  description="Your recently watched videos will appear here."
                  actionText="Browse Videos"
                  onAction={() => window.location.href = '/'}
                />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/liked-videos"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-900 pt-20 px-6">
                <EmptyState
                  title="Liked Videos"
                  description="Videos you like will be saved here."
                />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-900 pt-20 px-6">
                <EmptyState
                  title="Subscriptions"
                  description="Channels you subscribe to will appear here."
                  actionText="Explore Channels"
                  onAction={() => window.location.href = '/'}
                />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <PlaylistList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlist/:playlistId"
          element={
            <ProtectedRoute>
              <PlaylistDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-900 pt-20 px-6">
                <EmptyState
                  title="Creator Dashboard"
                  description="Manage your videos and view channel analytics."
                  actionText="Upload Video"
                  onAction={() => window.location.href = '/upload'}
                />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-900 pt-20 px-6">
                <EmptyState
                  title="Settings"
                  description="Manage your account preferences and profile."
                />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-900 pt-20 px-6">
                <EmptyState
                  title="Search Results"
                  description="Find videos, channels, and playlists."
                />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <TweetFeed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
