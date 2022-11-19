import Logo from "./Logo";

function Footer() {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-4 items-center text-gray-600 bg-gray-100 p-5 md:px-10">
        <h5 className="font-bold p-2 text-gray-800">About</h5>
        <h5 className="font-bold p-2 text-gray-800">Contact</h5>
        <h5 className="font-bold p-2 text-gray-800">Support</h5>
        <Logo />
    </div>
  );
}

export default Footer;
