
import './App.css';
import MatchingGame from './Components/MatchingGame';

function App() {
  return (
   <MatchingGame svgWidth={500} svgHeight={500} rows={4} columns={4} cardWidth={80} cardHeight={80} duration={30}/>
  );
}

export default App;
