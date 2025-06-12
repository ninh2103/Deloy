import { Provider } from 'react-redux'
import Blog from 'src/components/Blog/Blog'
import store from 'src/store'

function App() {
  return (
    <div className='p-5'>
      <Provider store={store}>
        <Blog />
      </Provider>
    </div>
  )
}

export default App
