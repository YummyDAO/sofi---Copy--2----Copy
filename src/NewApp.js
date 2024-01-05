import { Routes, Route } from "react-router-dom"
import OrdHome from "./OrdHome"
import Genesis from "./Genesis"
import App from "./App"

function Appnew() {
  return (
    <div className="App">
      <Routes>
        {/*<Route path="/" element={ <App/> } />
        <Route path="/profile" element={ <Profile/> } />
        <Route path="/scroll" element={ <Scroll/> } />
        <Route path="/signin" element={ <Signin/> } />*/}
        <Route path="/home" element={ <OrdHome/> } />
        <Route path="/" element={ <App/> } />
      </Routes>
    </div>
  )
}

export default Appnew