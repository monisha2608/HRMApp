import { createContext, useState, useContext } from "react";

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([]);

  const addApplication = (job, formData) => {
    const newApp = {
      id: Date.now(),
      title: job.title,
      status: "Under Review",
      date: new Date().toISOString(),
      candidate: formData.name,
    };
    setApplications((prev) => [...prev, newApp]);
  };

  return (
    <ApplicationContext.Provider value={{ applications, addApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  return useContext(ApplicationContext);
}
