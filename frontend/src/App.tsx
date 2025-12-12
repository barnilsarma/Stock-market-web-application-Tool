import { BrowserRouter,Routes,Route} from "react-router-dom"
import * as pages from "./pages" ;
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<pages.home/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
