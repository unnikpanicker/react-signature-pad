import React from "react";

interface IconType {
  iconType: "clear" | "save" | "download";
  fillColor?: string;
}
const Icons: React.FC<IconType> = ({ iconType, fillColor = "black" }) => {
  switch (iconType) {
    case "clear":
      return (
        <svg
          fill={fillColor}
          role="ic-clear"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.48 3 7.73 7.75 3 12.59a2 2 0 0 0 0 2.82l4.3 4.3A1 1 0 0 0 8 20h12v-2h-7l7.22-7.22a2 2 0 0 0 0-2.83L15.31 3a2 2 0 0 0-2.83 0zM8.41 18l-4-4 4.75-4.84.74-.75 4.95 4.95-4.56 4.56-.07.08z" />
        </svg>
      );

    case "save":
      return (
        <svg
          fill={fillColor}
          viewBox="0 0 512 512"
          role="ic-save"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          width="20px"
        >
          <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
        </svg>
      );

    case "download":
      return (
        <svg
          fill={fillColor}
          role="ic-download"
          viewBox="0 0 96 96"
          height="20px"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <g>
            <path d="M90,54a5.9966,5.9966,0,0,0-6,6V78H12V60A6,6,0,0,0,0,60V84a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6V60A5.9966,5.9966,0,0,0,90,54Z" />
            <path d="M43.7578,64.2422a5.9979,5.9979,0,0,0,8.4844,0l18-18a5.9994,5.9994,0,0,0-8.4844-8.4844L54,45.5156V12a6,6,0,0,0-12,0V45.5156l-7.7578-7.7578a5.9994,5.9994,0,0,0-8.4844,8.4844Z" />
          </g>
        </svg>
      );
    default:
      return <></>;
  }
};

export default Icons;
