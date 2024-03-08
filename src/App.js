import './App.css';
import { FormProvider } from './FormsApplication/FormsContext';
import Forms from './FormsApplication/Forms';

function App() {
  return (
    <div className="App">
      <FormProvider>
         <Forms/>
      </FormProvider>
    </div>
  );
}

export default App;
