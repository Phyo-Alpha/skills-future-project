import { useEffect } from "react";
import emailjs from "@emailjs/browser";
import RegistrationForm from "./components/form";
import TopBar from "./components/layout/top-bar";

function App() {
  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <RegistrationForm />
    </div>
  );
}

export default App;
