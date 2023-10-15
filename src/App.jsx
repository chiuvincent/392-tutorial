import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDbData } from "./utilities/firebase";

import Dispatcher from "./components/Dispatcher";

const Main = () => {
  const [schedule, error] = useDbData("/");

  if (schedule !== undefined) {
    // Prof Riesbeck's fix
    Object.keys(schedule.courses).forEach((key) => {
      schedule.courses[key].id = key;
    });
  }
  if (schedule === undefined) {
    return <h1>Loading schedule data...</h1>;
  }

  return (
    <div className="container">
      <Dispatcher title={schedule.title} courses={schedule.courses} />
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Main />
      </div>
    </QueryClientProvider>
  );
};

export default App;
