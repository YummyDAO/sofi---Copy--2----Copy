import { Routes, Route } from "react-router-dom"
import OrdHome from "./OrdHome"
import Genesis from "./Genesis"
import Bridgewithdraw from "./Bridgewithdraw"
import App from "./App"

function Appnew() {
  return (
    <div className="App">
      <Routes>
        {/*<Route path="/" element={ <App/> } />
        <Route path="/profile" element={ <Profile/> } />
        <Route path="/scroll" element={ <Scroll/> } />
        <Route path="/signin" element={ <Signin/> } />*/}
        <Route path="/withdraw" element={ <Bridgewithdraw/> } />
        <Route path="/" element={ <App/> } />
      </Routes>
    </div>
  )
}

export default Appnew