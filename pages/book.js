import { useState } from "react"
import Header from "../components/Header"
import InfoCard from "../components/InfoCard"

const book = () => {
    const [book, setBook] = useState(false)
  return (
    <div>
        <Header />
        
        {book ? <InfoCard /> : <h1>Not booked anything</h1>}
    </div>
  
  )
}

export default book