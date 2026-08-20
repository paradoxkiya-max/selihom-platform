import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Awareness from "./pages/Awareness";
import Stories from "./pages/Stories";
import Gallery from "./pages/Gallery";
import { Blog, Events } from "./pages/BlogAndEvents";
import { Contact, Press, Volunteer, Donate, DonateSuccess } from "./pages/ConversionPages";
import AdminDashboard from "./pages/AdminDashboard";
import { Privacy, Terms } from "./pages/LegalPages";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/awareness"} component={Awareness} />
      <Route path={"/stories"} component={Stories} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/events"} component={Events} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/press"} component={Press} />
      <Route path={"/volunteer"} component={Volunteer} />
      <Route path={"/donate"} component={Donate} />
      <Route path={"/donate/success"} component={DonateSuccess} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
