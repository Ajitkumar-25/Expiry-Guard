import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
const SelectComponent = ({
  selectData,
  onEmailChange,
  onNameChange,
  isOrderComponent,
}) => {
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const handleChange = (email) => {
    setSelectedEmail(email);

    const selectedSupplier = selectData.find((item) => item.email === email);

    onEmailChange(email);

    onNameChange(selectedSupplier ? selectedSupplier.name : "");

    setSelectedName(selectedSupplier ? selectedSupplier.name : "");
  };

  return (
    <div>
      {/* Email Select Dropdown */}
      <Select value={selectedEmail} onValueChange={handleChange}>
        <SelectTrigger className="w-full h-12 border border-gray-300 rounded-md p-3 mt-2 mb-5">
          <SelectValue
            placeholder="Select Email"
            className="text-blue-500"
          />
        </SelectTrigger>
        <SelectContent>
          {selectData.map((item, index) => {
            const emailValue = item.email || item.driverEmail; // Use driverEmail if email is undefined
            return (
              <SelectItem key={index} value={emailValue}>
                {emailValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* Autofilled Name Input */}
      {!isOrderComponent && (
        <Input
          type="text"
          value={selectedName}
          placeholder="Supplier Name"
          className="w-full h-12 border border-gray-300 rounded-md p-3 mt-2 mb-5"
          readOnly
        />
      )}
    </div>
  );
};

export default SelectComponent;
