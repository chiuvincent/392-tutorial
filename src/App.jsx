import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

import Banner from './components/Banner';
import CourseList from './components/CourseList';

const Main = () => {
  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading schedule data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading schedule data...</h1>;
  if (!schedule) return <h1>No schedule data found</h1>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => {
  // const schedule = {
  //   "title": "CS Courses for MMXXII-MMXXIII",
  //   "courses": {
  //     "F101" : {
  //       "term": "Fall",
  //       "number": "101",
  //       "meets" : "MWF 11:00-11:50",
  //       "title" : "Computer Science: Concepts, Philosophy, and Connections"
  //     },
  //     "F110" : {
  //       "term": "Fall",
  //       "number": "110",
  //       "meets" : "MWF 10:00-10:50",
  //       "title" : "Intro Programming for non-majors"
  //     },
  //     "S313" : {
  //       "term": "Spring",
  //       "number": "313",
  //       "meets" : "TuTh 15:30-16:50",
  //       "title" : "Tangible Interaction Design and Learning"
  //     },
  //     "S314" : {
  //       "term": "Spring",
  //       "number": "314",
  //       "meets" : "TuTh 9:30-10:50",
  //       "title" : "Tech & Human Interaction"
  //     }
  //   }
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Main />
      </div>
    </QueryClientProvider>
  );
};

export default App;