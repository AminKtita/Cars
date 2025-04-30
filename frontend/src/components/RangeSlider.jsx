import React from "react";
import Slider from "@mui/material/Slider";

export const RangeSlider = ({ min, max, value, onChange }) => {
  return (
    <div className="w-full">
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        sx={{
          color: "#dc2626", // Tailwind red-600
          height: 8,
          "& .MuiSlider-thumb": {
            height: 24,
            width: 24,
            backgroundColor: "#fff",
            border: "2px solid #dc2626",
            "&:hover": {
              boxShadow: "0 0 0 8px rgba(220,38,38,0.16)",
            },
          },
        }}
      />
    </div>
  );
};
