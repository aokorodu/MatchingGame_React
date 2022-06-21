
import './App.css';
import MatchingGame from './Components/MatchingGame';

function App() {
  return (
   <MatchingGame svgWidth={500} svgHeight={500} rows={4} columns={4}/>
  );
}

export default App;
