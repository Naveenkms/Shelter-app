

function Footer() {
  return (
    <div className="grid  sm:grid-cols-2 md:grid-cols-4 gap-y-10 text-gray-600 bg-gray-100 px-32 py-14">
        <div className="space-y-4 text-xs">
            <h5 className="font-bold text-gray-800">About</h5>
            <p> How Airbnb works </p>
            <p>Newsroom</p>
            <p>Investors</p>
            <p>Airbnb plus</p>
            <p>Airbnb Luxe</p>
        </div>
        <div className="space-y-4 text-xs">
            <h5 className="font-bold text-gray-800">Community</h5>
            <p>Newsroom</p>
            <p>Airbnb Luxe</p>
            <p>Airbnb plus</p>
            <p> How Airbnb works </p>
            <p>Investors</p>
        </div><div className="space-y-4 text-xs">
            <h5 className="font-bold text-gray-800">Host</h5>
            <p>Investors</p>
            <p>Airbnb plus</p>
            <p>Newsroom</p>
            <p>Airbnb Luxe</p>
            <p> How Airbnb works </p>
        </div><div className="space-y-4 text-xs">
            <h5 className="font-bold text-gray-800">Support</h5>
            <p>Airbnb Luxe</p>
            <p> How Airbnb works </p>
            <p>Investors</p>
            <p>Airbnb plus</p>
            <p>Newsroom</p>
        </div>
    </div>
  )
}

export default Footer