import "./App.css";
import BarChart from "./barChart";
import { data } from "./data";
import DistributionChart from "./distributionChart";
import PieChart from "./pieChart";
import BubbleChart from "./bubbleChart";

function App() {
   return (
      <div className='App'>
         <div>
            <h3>Bar Chart</h3>
            <BarChart data={data} />
         </div>
         <div>
            <h1>PieChart</h1>
            <PieChart data={data} />
         </div>
         <div>
            <h3>Distribution Chart</h3>
            <DistributionChart data={data} />
         </div>
         <div>
            <h3>Bubble Chart</h3>
            <BubbleChart data={data} />
         </div>
      </div>
   );
}

export default App;
