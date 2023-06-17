import RootApp from "./RootApp";
import AllContext from 'context/AllContext';
import './App.css';

function App() {
  return (
    <AllContext>
      <RootApp />
    </AllContext>
  )
}

export default App;
