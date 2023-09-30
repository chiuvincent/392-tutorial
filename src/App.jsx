import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { useState } from "react";
import Banner from './components/Banner';
import CourseList from './components/CourseList';

const Main = ({_term}) => {
  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading schedule data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading schedule data...</h1>;
  if (!schedule) return <h1>No schedule data found</h1>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={Object.values(schedule.courses).filter(course => course.term === _term)} /> 
    </div>
  );
};

const queryClient = new QueryClient();


const terms = {
  Fall: <Main _term="Fall"/>,
  Winter: <Main _term="Winter"/>,
  Spring: <Main _term="Spring"/>
};

const MenuButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
    { term }
    </label>
  </div>
);

const MenuSelector = ({selection, setSelection}) => (
  <div className="btn-group">
    { 
      Object.keys(terms).map(term => <MenuButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const Menu = ({selection}) => (
  <div className="card" >
  { terms[selection] }
  </div>
);

const App = () => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  // return (
  //   <div className="container">
  //     <MenuSelector selection={selection} setSelection={setSelection} />
  //     <Menu selection={selection} />
  //   </div>
  // );
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <MenuSelector selection={selection} setSelection={setSelection} />
        <Menu selection={selection} />
      </div>
    </QueryClientProvider>
  );
};

export default App;