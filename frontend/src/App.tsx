import { BrowserRouter,Routes,Route} from "react-router-dom"
import * as pages from "./pages" ;
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<pages.home/>} />
          <Route path="/admin" element={<pages.AdminDashboard/>} />
          <Route path="/posts" element={<pages.Posts/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
