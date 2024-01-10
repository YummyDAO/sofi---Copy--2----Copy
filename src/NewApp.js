import { Routes, Route } from "react-router-dom"
import Bridgewithdraw from "./Bridgewithdraw"
import App from "./App"
import Transaction from "./Transaction"

function Appnew() {
  return (
    <div className="App">
      <Routes>
        {/*<Route path="/" element={ <App/> } />
        <Route path="/profile" element={ <Profile/> } />
        <Route path="/scroll" element={ <Scroll/> } />
        <Route path="/signin" element={ <Signin/> } />*/}
        <Route path="/withdraw" element={ <Bridgewithdraw/> } />
        <Route path="/transaction/:id" element={ <Transaction/> } />
        <Route path="/" element={ <App/> } />
      </Routes>
    </div>
  )
}

export default Appnew