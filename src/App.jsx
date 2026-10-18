import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { I18nProvider } from './i18n/index.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MessengerWidget from './components/MessengerWidget.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import CRM from './pages/CRM.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* Main website layout with Header + Footer */
function WebsiteLayout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
      <MessengerWidget />
    </>
  );
}

/* CRM is a fully standalone app — no Header, no Footer, own layout */
function AppRouter() {
  const location = useLocation();
  const isCRM = location.pathname === '/admin';

  return (
    <>
      <ScrollToTop />
      {isCRM ? (
        <main>
          <CRM />
        </main>
      ) : (
        <WebsiteLayout />
      )}
    </>
  );
}

const routerBasename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter basename={routerBasename === '/' ? undefined : routerBasename}>
        <AppRouter />
      </BrowserRouter>
    </I18nProvider>
  );
}
