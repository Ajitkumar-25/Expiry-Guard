import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SelectComponent = ({ selectData, onSelectChange, selectedValue }) => {
  const handleChange = (value) => {
    onSelectChange(value);
  };
  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="w-full  h-12 border border-gray-300 rounded-md p-3 mt-2 mb-5">
        <SelectValue
          placeholder="Select Your Category"
          className="text-blue-500"
        />
      </SelectTrigger>
      <SelectContent>
        {selectData.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
