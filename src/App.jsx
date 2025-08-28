
import Random from "./components/Random"
import Tags from "./components/Tags"
function App() {
  return (
  <div  className="bg-gradient-to-r from-cyan-200 to-violet-300 w-full h-screen overflow-x-hidden">
     <h1 className="text-center text-2xl bg-white mt-10 mx-6" >GIFs Search</h1>
     
     <Random></Random>
     <Tags></Tags>

  </div>
  )
}
export default App
