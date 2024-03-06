import Header from './components/Header';
import Body from './components/Body';
import './App.css';
import { Provider } from 'react-redux';
import store from './utils/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WatchPage from './components/WatchPage';
import MainContainer from "./components/MainContainer";

const appRouter= createBrowserRouter([
  {
    path:'/',
    element:<Body/>,
    children:[
      {
        path:"/",
        element:<MainContainer />,
      },
      {
        path:"/Watch",
        element:<WatchPage />,
      },
    ]
  }
]);
function App() {
  return (
    <Provider store={store}>
    <div >
      <Header />
      <RouterProvider router={appRouter}/>
    </div>
    </Provider>
      
      
  );
}

export default App;
