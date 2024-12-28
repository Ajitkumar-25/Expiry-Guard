import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../../services/common";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TailSpin } from "react-loader-spinner";
import OnboardingCarousel from "@/Onboarding/OnboardingCarousel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    companyName: "",
    commoditySold: "",
    userType: "supplier",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUserTypeChange = (value) => {
    setFormData({ ...formData, userType: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData).unwrap();
      toast.success("Registration successful!You Can Proceed By Login", {
        position: "top-right",
      
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(`Registration failed.${error.data.msg}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
     
      });
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <TailSpin height="80" width="80" color="#f3a247" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen flex-col md:flex-row">
        <div className="md:w-1/2 w-full bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white flex flex-col justify-center items-center p-6 md:p-0">
          {/* <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Join the Network</h1>
          <p className="mb-6">
            Connect your business and access analytics tailored for your
            industry.
          </p>
          <div className="mt-4">
            <p className="text-sm">
              “The best platform for suppliers and retailers.”
            </p>
            <p className="text-sm font-bold mt-2">- Jane Doe, Manager</p>
          </div>
        </div> */}
          <OnboardingCarousel />
        </div>

        <div className="md:w-1/2 w-full flex justify-center items-center bg-gradient-to-l from-[#b7e6fa] to-[#ffffff]relative px-4 py-12 md:py-0">
          <div className="absolute top-4 w-[80%] h-[20%] bg-white/30 backdrop-blur-lg rounded-3xl md:hidden"></div>

          <form
            onSubmit={handleRegister}
            className="w-full max-w-lg p-8 shadow-lg rounded-3xl z-10 bg-white"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Register
            </h2>

            <ToggleGroup
              type="single"
              value={formData.userType}
              onValueChange={handleUserTypeChange}
              className="mb-6"
            >
              <ToggleGroupItem value="supplier">Supplier</ToggleGroupItem>
              <ToggleGroupItem value="retailer">Retailer</ToggleGroupItem>
            </ToggleGroup>
            <Input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              required
              className="mb-6 h-12"
            />
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
              className="mb-6 h-12"
            />
            <Input
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              type="Password"
              required
              className="mb-6 h-12"
            />
            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
              value={formData.phoneNumber}
              required
              className="mb-6 h-12"
            />
            <Input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              value={formData.address}
              required
              className="mb-6 h-12"
            />

            {formData.userType === "supplier" ? (
              <>
                <Input
                  name="companyName"
                  placeholder="Company Name"
                  onChange={handleChange}
                  value={formData.companyName}
                  required
                  className="mb-6 h-12"
                />
                <Input
                  name="commoditySold"
                  placeholder="Commodity Sold"
                  onChange={handleChange}
                  value={formData.commoditySold}
                  required
                  className="mb-6 h-12"
                />
              </>
            ) : (
              <></>
            )}

            <Button
              type="submit"
              variant="default"
              className="w-full h-12 bg-orange-500 text-white"
            >
              Create Account
            </Button>
            <div className="text-center mt-4">
              <p
                onClick={() => {
                  navigate("/");
                }}
              >
                Already have an account?{" "}
                <span className="underline hover:text-orange-500 cursor-pointer">
                  Login In
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
