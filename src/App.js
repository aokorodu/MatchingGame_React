
import './App.css';
import MatchingGame from './Components/MatchingGame';

function App() {
  return (
   <MatchingGame svgWidth={500} svgHeight={500} rows={6} columns={6}/>
  );
}

export default App;
