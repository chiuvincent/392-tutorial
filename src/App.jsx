const App = () => {
  // const today = new Date();
  // const day = today.toLocaleString([], {weekday: 'long'});
  // const date = today.toLocaleDateString([], {dateStyle: 'long'})
  const schedule = {
    title: "CS Courses for 2018-2019"
  };

  return (
    <div>
      <h1>{schedule.title}</h1>
      
      {/* <p>Today is {day}, {date}.</p> */}
    </div>
  );
};

export default App;