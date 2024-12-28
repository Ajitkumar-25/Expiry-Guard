import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" bg-gray-800 flex flex-col space-y-10 justify-center p-10">
      <div className="flex justify-center space-x-8 text-white">
        <FaFacebook size={30} />
        <FaLinkedin size={30} />
        <FaInstagram size={30} />
        <FaYoutube size={30} />
        <FaTwitter size={30} />
      </div>
      <p className="text-center text-white font-medium">
        &copy; 2024 Expiry Guard Ltd. All rights reservered.
      </p>
    </footer>
  );
};

export default Footer;
