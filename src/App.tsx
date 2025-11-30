import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { AnimalsProvider } from './contexts/AnimalsContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Adopt } from './pages/Adopt';
import { Donate } from './pages/Donate';
import { Transparency } from './pages/Transparency';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageAnimals } from './pages/admin/ManageAnimals';
import { Approvals } from './pages/admin/Approvals';
import { Financial } from './pages/admin/Financial';
import { ManagePosts } from './pages/admin/ManagePosts';
import { ManageEvents } from './pages/admin/ManageEvents';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Events } from './pages/Events';
import { HappyEndings } from './pages/HappyEndings';
import { PostsProvider } from './contexts/PostsContext';
import { EventsProvider } from './contexts/EventsContext';
import { UsersProvider } from './contexts/UsersContext';
import { ManageTeam } from './pages/admin/ManageTeam';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfUse } from './pages/TermsOfUse';
import { CookieBanner } from './components/CookieBanner';

function App() {
  return (
    <AuthProvider>
      <AnimalsProvider>
        <PostsProvider>
          <EventsProvider>
            <UsersProvider>
              <BrowserRouter>
                <Toaster position="top-right" richColors />
                <CookieBanner />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <Home />
                      </main>
                      <Footer />
                    </div>
                  } />
                  <Route path="/adotar" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <Adopt />
                      </main>
                      <Footer />
                    </div>
                  } />
                  <Route path="/doar" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <Donate />
                      </main>
                      <Footer />
                    </div>
                  } />
                  <Route path="/transparencia" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <Transparency />
                      </main>
                      <Footer />
                    </div>
                  } />
                  <Route path="/resgates" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <Blog />
                      </main>
                      <Footer />
                    </div>
                  } />
                  <Route path="/resgates/:id" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <BlogPost />
                      </main>
                      <Footer />
                    </div>
                  } />
                  <Route path="/eventos" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <Events />
                      </main>
                      <Footer />
                    </div>
                  } />
                  <Route path="/finais-felizes" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <HappyEndings />
                      </main>
                      <Footer />
                    </div>
                  } />
                  <Route path="/politica-de-privacidade" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <PrivacyPolicy />
                      </main>
                      <Footer />
                    </div>
                  } />
                  <Route path="/termos-de-uso" element={
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <TermsOfUse />
                      </main>
                      <Footer />
                    </div>
                  } />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/animals" element={
                    <ProtectedRoute>
                      <ManageAnimals />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/approvals" element={
                    <ProtectedRoute>
                      <Approvals />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/financial" element={
                    <ProtectedRoute>
                      <Financial />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/posts" element={
                    <ProtectedRoute>
                      <ManagePosts />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/events" element={
                    <ProtectedRoute>
                      <ManageEvents />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/team" element={
                    <ProtectedRoute>
                      <ManageTeam />
                    </ProtectedRoute>
                  } />
                </Routes>
              </BrowserRouter>
            </UsersProvider>
          </EventsProvider>
        </PostsProvider>
      </AnimalsProvider>
    </AuthProvider>
  );
}

export default App;
