import React from "react";

type Props = {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
};

const ToggleSwitch = ({ isChecked, setIsChecked }: Props) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors relative">
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            isChecked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
};

export default React.memo(ToggleSwitch);
