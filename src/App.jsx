import { Toaster } from 'react-hot-toast';
import './App.css'
import UnionForm from './components/Form/Form';

function App() {

  // eslint-disable-next-line no-undef
  // const apiFile = process.env.API_KEY;
  // console.log(apiFile);

  return (
    <div className='mx-auto container'>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <UnionForm></UnionForm>
    </div>
  )
}

export default App
