import React, { useState } from 'react';
import WastageTab from "./WastageTab";

// --- Constants ---
const aleoFont = 'Aleo, sans-serif';
const figmaBlack = "#212224";
const secondaryBrown = "#B39793";
const goldenBrown = "#C99E5A";
const headingSepLine = "#EBCDB5";
const goBackColor = "#4A3936";
const figmaLightBrown = "#B39793";

// --- Improved Select/Input/Search matching the dummy code's visuals ---
// --- Select ---
const Select = ({
  value,
  onValueChange,
  placeholder = "Type of Ingredient",
  children,
  options,
  style,
  className,
}: any) => (
  <select
    value={value}
    onChange={e => onValueChange(e.target.value)}
    className={`w-[220px] h-[32px] rounded-[5px] bg-[#fff] border border-[#B39793] font-normal justify-between pr-3 ${className || ''}`}
    style={{
      borderColor: figmaLightBrown,
      background: "#fff",
      fontSize: 16,
      minWidth: 220,
      minHeight: 32,
      marginTop: -20,
      color: value ? figmaBlack : figmaLightBrown,
      lineHeight: 'normal',
      display: 'flex',
      alignItems: 'center',
      boxShadow: 'none',
      ...style,
    }}
  >
    <option value="" disabled style={{ color: figmaLightBrown }}>{placeholder}</option>
    {(options || [
      { value: "fruits", label: "Fruits" },
      { value: "vegetables", label: "Vegetables" },
      { value: "dairy", label: "Dairy" },
      { value: "grains-seeds", label: "Grains & Seeds" },
      { value: "poultry", label: "Poultry" },
      { value: "raw-meat", label: "Raw meat" },
      { value: "in-house-ingredient", label: "In-house Ingredient" },
      { value: "nuts", label: "Nuts" },
      { value: "fungi", label: "Fungi" },
      { value: "kitchen-utilities", label: "Kitchen utilities" },
    ]).map((item: any) => (
      <option key={item.value} value={item.value} style={{ color: figmaBlack }}>
        {item.label}
      </option>
    ))}
    {children}
  </select>
);

// --- Input ---
const Input = ({ value, onChange, placeholder, className, style, ...props }: any) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`pl-10 w-[314px] h-[32px] rounded-[10px] text-black bg-[#fff] border border-[#B39793] placeholder:text-[#B39793] font-normal ${className || ''}`}
    style={{
      borderColor: figmaLightBrown,
      background: "#fff",
      fontSize: 16,
      ...style,
    }}
    {...props}
  />
);

// --- Search Icon ---
const Search = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke={figmaLightBrown} strokeWidth="1.5"/>
    <path d="M17 17L14 14" stroke={figmaLightBrown} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// --- Back Arrow SVG (No circle, color #4A3936, proper alignment) ---
const BackArrowSvg = ({ onClick }: { onClick: () => void }) => (
  <button
    aria-label="back"
    onClick={onClick}
    style={{
      background: "transparent",
      border: "none",
      outline: "none",
      padding: 0,
      marginRight: 12,
      marginTop: -20,
      cursor: "pointer",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    type="button"
  >
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M17.5 7L11.5 14L17.5 21" stroke={goBackColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);

// --- Shield Icon Button ---
const ShieldButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="relative flex items-center justify-center p-0 bg-transparent shadow-none
               hover:bg-transparent hover:shadow-none focus:bg-transparent focus:shadow-none active:bg-transparent active:shadow-none"
    onClick={onClick}
    aria-label="suspicious"
    style={{
      width: "48px",
      height: "48px",
      padding: 0,
      overflow: "hidden",
      marginTop: -20,
      backgroundColor: "transparent",
      boxShadow: "none",
    }}
    type="button"
  >
    <svg
      width="33"
      height="44"
      viewBox="0 0 41 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "33px",
        height: "44px",
        display: "block",
      }}
    >
      <path
        d="M31.6 38.5C36.6 32.9 40.9 23.9 38.1 10L38 9.05L37 9.2C32 9.9 29.2 9.6 27.1 8.75C25 7.85 23.5 6.35 21.2 4.25L20.5 3.65L19.8 4.25C17.5 6.35 16.1 7.85 13.9 8.75C11.8 9.6 9 9.9 4 9.2L3 9.05L2.85 10C0.1 23.9 4.4 32.9 9.4 38.5C13 42 17 45 21 46C25 45 29 42 31.6 38.5Z"
        stroke="#B39793"
        strokeWidth="2.6"
        fill="#F0EDE5"
      />
      <svg
        x="8"
        y="10"
        width="26"
        height="27"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <path
          d="M13.1827 18H14.4655C15.1145 18 15.6477 17.4682 15.725 16.7973L17 3.31364H13.1364V0H11.6141V3.31364H7.77364L8.00545 5.22818C9.32682 5.61273 10.5632 6.30818 11.305 7.07727C12.4177 8.23909 13.1827 9.44182 13.1827 11.4055V18ZM0 17.1818V16.3636H11.6141V17.1818C11.6141 17.6236 11.2664 18 10.8182 18H0.772727C0.347727 18 0 17.6236 0 17.1818ZM11.6141 11.4545C11.6141 4.90909 0 4.90909 0 11.4545H11.6141ZM0 13.0909H11.5909V14.7273H0V13.0909Z"
          fill="#4B3937"
        />
      </svg>
    </svg>
  </button>
);

// --- Bucket Icon Button for main page ---
const BucketButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label="delete"
    style={{
      background: "transparent",
      border: "none",
      borderRadius: "50%",
      boxShadow: "0px 2px 6px 0px #B3979340",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.15s",
    }}
    type="button"
  >
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" stroke={figmaLightBrown} strokeWidth="1" fill="white"/>
      <g transform="translate(10, 7)">
        <path d="M12.8088 9.4659V11.9332L14.6965 13.7837M12.8088 8.23224V8.84907M12.8088 15.0174V15.6342M9.03337 11.9332H9.66261M15.955 11.9332H16.5843M16.8989 11.9332C16.8989 12.9966 16.468 14.0164 15.7009 14.7683C14.9339 15.5202 13.8936 15.9426 12.8088 15.9426C11.7241 15.9426 10.6837 15.5202 9.9167 14.7683C9.14967 14.0164 8.71875 12.9966 8.71875 11.9332C8.71875 10.8699 9.14967 9.85005 9.9167 9.09815C10.6837 8.34624 11.7241 7.92383 12.8088 7.92383C13.8936 7.92383 14.9339 8.34624 15.7009 9.09815C16.468 9.85005 16.8989 10.8699 16.8989 11.9332Z" stroke="#4B3937" strokeWidth="0.8"/>
        <path d="M17.1699 13.4707L17.1279 14.0098L16.3252 24.3301L16.3242 24.3291C16.3028 24.6478 16.16 24.945 15.9258 25.1611C15.7195 25.3514 15.4565 25.4664 15.1797 25.4922L15.0605 25.498H6.44727C6.12742 25.4982 5.81772 25.3785 5.58203 25.1611C5.34613 24.9435 5.20146 24.6436 5.18164 24.3223V24.3213L4.5498 14.0029L4.51758 13.4717H5.04883L16.6289 13.4707H17.1699Z" fill="white" stroke="#4B3937"/>
        <path d="M8.69434 16.4766C8.76808 16.473 8.83863 16.4989 8.89062 16.5449C8.92931 16.5793 8.95586 16.6227 8.96777 16.6689L8.97461 16.7168L9.2041 21.2832V21.291C9.20616 21.3228 9.20215 21.3552 9.19141 21.3857C9.18062 21.4163 9.16355 21.4455 9.14062 21.4707C9.11767 21.4959 9.08908 21.517 9.05664 21.5322C9.02412 21.5475 8.98788 21.5558 8.95117 21.5576C8.91454 21.5594 8.87783 21.5541 8.84375 21.542C8.80982 21.5299 8.77951 21.5113 8.75391 21.4883C8.72823 21.4651 8.7073 21.4379 8.69336 21.4082C8.67943 21.3785 8.67201 21.3464 8.6709 21.3145V21.3066L8.44141 16.7393C8.43849 16.6761 8.46082 16.6122 8.50684 16.5625C8.5533 16.5123 8.62068 16.4802 8.69434 16.4766ZM12.7578 16.4883C12.8309 16.4918 12.8978 16.5237 12.9443 16.5732C12.9789 16.6101 13.0002 16.6547 13.0078 16.7012L13.0107 16.748L12.7822 21.3027C12.777 21.3638 12.7483 21.4228 12.6982 21.4668C12.6463 21.5122 12.5761 21.5377 12.5029 21.5342C12.4298 21.5306 12.3629 21.4988 12.3164 21.4492C12.2819 21.4124 12.2606 21.3677 12.2529 21.3213L12.25 21.2744L12.4785 16.7236C12.4828 16.6609 12.512 16.5997 12.5635 16.5547C12.6153 16.5096 12.685 16.4848 12.7578 16.4883Z" fill="black" stroke="#4B3937"/>
        <path d="M12.3295 2.28241C12.5867 2.08948 12.912 1.99814 13.2367 2.03395C13.5626 2.07 13.862 2.23205 14.0636 2.49022C14.2651 2.74839 14.3464 3.0741 14.2967 3.39186C14.2471 3.70843 14.0721 3.99239 13.8149 4.18532L3.56482 11.8743C3.30761 12.0672 2.98232 12.1586 2.65761 12.1227C2.33173 12.0867 2.03228 11.9246 1.83074 11.6665C1.6292 11.4083 1.54791 11.0826 1.59759 10.7648C1.64717 10.4482 1.82213 10.1643 2.07935 9.97136L12.3295 2.28241ZM6.84474 2.86318C7.10203 2.67018 7.42714 2.5788 7.75196 2.61472C8.07783 2.65077 8.37729 2.81282 8.57882 3.07099L9.32096 4.02168L4.57829 7.57931L3.83616 6.62862C3.63463 6.37047 3.55334 6.04473 3.603 5.72699C3.65252 5.41026 3.82747 5.12653 4.08476 4.93353L6.84474 2.86318Z" stroke="#4B3937"/>
      </g>
    </svg>
  </button>
);

// --- Colored Bucket Button for set limit page ---
const ColoredBucketButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label="delete"
    style={{
      background: "transparent",
      border: "none",
      borderRadius: "50%",
      boxShadow: "0px 2px 6px 0px #C99E5A40",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      marginTop: -3,
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.15s",
    }}
    type="button"
  >
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="19" stroke={goldenBrown} strokeWidth="1" fill="white"/>
      <g transform="translate(10, 7)">
        <path d="M12.8088 9.4659V11.9332L14.6965 13.7837M12.8088 8.23224V8.84907M12.8088 15.0174V15.6342M9.03337 11.9332H9.66261M15.955 11.9332H16.5843M16.8989 11.9332C16.8989 12.9966 16.468 14.0164 15.7009 14.7683C14.9339 15.5202 13.8936 15.9426 12.8088 15.9426C11.7241 15.9426 10.6837 15.5202 9.9167 14.7683C9.14967 14.0164 8.71875 12.9966 8.71875 11.9332C8.71875 10.8699 9.14967 9.85005 9.9167 9.09815C10.6837 8.34624 11.7241 7.92383 12.8088 7.92383C13.8936 7.92383 14.9339 8.34624 15.7009 9.09815C16.468 9.85005 16.8989 10.8699 16.8989 11.9332Z" stroke="#4B3937" strokeWidth="0.8"/>
        <path d="M17.1699 13.4707L17.1279 14.0098L16.3252 24.3301L16.3242 24.3291C16.3028 24.6478 16.16 24.945 15.9258 25.1611C15.7195 25.3514 15.4565 25.4664 15.1797 25.4922L15.0605 25.498H6.44727C6.12742 25.4982 5.81772 25.3785 5.58203 25.1611C5.34613 24.9435 5.20146 24.6436 5.18164 24.3223V24.3213L4.5498 14.0029L4.51758 13.4717H5.04883L16.6289 13.4707H17.1699Z" fill="white" stroke="#4B3937"/>
        <path d="M8.69434 16.4766C8.76808 16.473 8.83863 16.4989 8.89062 16.5449C8.92931 16.5793 8.95586 16.6227 8.96777 16.6689L8.97461 16.7168L9.2041 21.2832V21.291C9.20616 21.3228 9.20215 21.3552 9.19141 21.3857C9.18062 21.4163 9.16355 21.4455 9.14062 21.4707C9.11767 21.4959 9.08908 21.517 9.05664 21.5322C9.02412 21.5475 8.98788 21.5558 8.95117 21.5576C8.91454 21.5594 8.87783 21.5541 8.84375 21.542C8.80982 21.5299 8.77951 21.5113 8.75391 21.4883C8.72823 21.4651 8.7073 21.4379 8.69336 21.4082C8.67943 21.3785 8.67201 21.3464 8.6709 21.3145V21.3066L8.44141 16.7393C8.43849 16.6761 8.46082 16.6122 8.50684 16.5625C8.5533 16.5123 8.62068 16.4802 8.69434 16.4766ZM12.7578 16.4883C12.8309 16.4918 12.8978 16.5237 12.9443 16.5732C12.9789 16.6101 13.0002 16.6547 13.0078 16.7012L13.0107 16.748L12.7822 21.3027C12.777 21.3638 12.7483 21.4228 12.6982 21.4668C12.6463 21.5122 12.5761 21.5377 12.5029 21.5342C12.4298 21.5306 12.3629 21.4988 12.3164 21.4492C12.2819 21.4124 12.2606 21.3677 12.2529 21.3213L12.25 21.2744L12.4785 16.7236C12.4828 16.6609 12.512 16.5997 12.5635 16.5547C12.6153 16.5096 12.685 16.4848 12.7578 16.4883Z" fill={goldenBrown} stroke="#4B3937"/>
        <path d="M12.3295 2.28241C12.5867 2.08948 12.912 1.99814 13.2367 2.03395C13.5626 2.07 13.862 2.23205 14.0636 2.49022C14.2651 2.74839 14.3464 3.0741 14.2967 3.39186C14.2471 3.70843 14.0721 3.99239 13.8149 4.18532L3.56482 11.8743C3.30761 12.0672 2.98232 12.1586 2.65761 12.1227C2.33173 12.0867 2.03228 11.9246 1.83074 11.6665C1.6292 11.4083 1.54791 11.0826 1.59759 10.7648C1.64717 10.4482 1.82213 10.1643 2.07935 9.97136L12.3295 2.28241ZM6.84474 2.86318C7.10203 2.67018 7.42714 2.5788 7.75196 2.61472C8.07783 2.65077 8.37729 2.81282 8.57882 3.07099L9.32096 4.02168L4.57829 7.57931L3.83616 6.62862C3.63463 6.37047 3.55334 6.04473 3.603 5.72699C3.65252 5.41026 3.82747 5.12653 4.08476 4.93353L6.84474 2.86318Z" stroke="#4B3937"/>
      </g>
    </svg>
  </button>
);

// --- Clock SVG for Set Time Limit box ---
const ClockSvg = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 0.5C13.6946 0.5 17.5 4.30544 17.5 9C17.5 13.6946 13.6946 17.5 9 17.5C4.30544 17.5 0.5 13.6946 0.5 9C0.5 4.30544 4.30544 0.5 9 0.5ZM9 1.2998C6.95783 1.2998 4.99969 2.11163 3.55566 3.55566C2.11163 4.99969 1.2998 6.95783 1.2998 9C1.2998 11.0422 2.11163 13.0003 3.55566 14.4443C4.99969 15.8884 6.95783 16.7002 9 16.7002C11.0422 16.7002 13.0003 15.8884 14.4443 14.4443C15.8884 13.0003 16.7002 11.0422 16.7002 9C16.7002 6.95783 15.8884 4.99969 14.4443 3.55566C13.0003 2.11163 11.0422 1.2998 9 1.2998ZM9 4.09961C9.09795 4.09964 9.19243 4.13608 9.26562 4.20117C9.33683 4.26449 9.38249 4.3511 9.39551 4.44531L9.40039 4.51465V8.83496L9.54688 8.98047L11.9824 11.417C12.0539 11.4889 12.0955 11.5852 12.0986 11.6865C12.1017 11.7881 12.0662 11.8876 11.999 11.9639C11.9318 12.04 11.8375 12.088 11.7363 12.0977C11.6379 12.1069 11.5402 12.0783 11.4609 12.0195L11.4092 11.9746L8.71777 9.2832C8.65682 9.2222 8.61686 9.14287 8.60449 9.05762L8.59961 8.98047V4.5C8.59961 4.39391 8.64178 4.29181 8.7168 4.2168C8.77314 4.16046 8.84486 4.12275 8.92188 4.10742L9 4.09961Z" fill={secondaryBrown} stroke={goldenBrown}/>
  </svg>
);

// --- Floating Save Button (Floating, Overlapping, Outside the Main Box) ---
const FloatingSaveButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="!w-[130px] !h-[40px] !rounded-[8px] !bg-[#C99E5A] !text-white !font-['Aleo'] !text-[16px] !font-medium !shadow-none"
    onClick={onClick}
    style={{
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      position: "absolute",
      left: 154 + 1246 - 30 - 130,
      top: 225 + 610 - 30 - 40,
      zIndex: 30,
      display: "block",
    }}
    type="button"
  >
    Save Changes
  </button>
);

// --- Set Wastage Limit Page (Inner Page) ---
const SetWastageLimit: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const wastageLimits = [
    { id: 1, ingredient: "Potato", setLimit: "-", setTimeLimit: "01-03-25 to 01-04-25", unit: "grams" },
    { id: 2, ingredient: "Tomato", setLimit: "-", setTimeLimit: "01-03-25 to 01-04-25", unit: "grams" },
    { id: 3, ingredient: "Onions", setLimit: "-", setTimeLimit: "01-03-25 to 01-04-25", unit: "grams" },
    { id: 4, ingredient: "Bell Pepper", setLimit: "-", setTimeLimit: "01-03-25 to 01-04-25", unit: "grams" },
    { id: 5, ingredient: "Sugar", setLimit: "-", setTimeLimit: "01-03-25 to 01-04-25", unit: "grams" },
    { id: 6, ingredient: "Cloves", setLimit: "-", setTimeLimit: "01-03-25 to 01-04-25", unit: "grams" },
    { id: 7, ingredient: "Paprika", setLimit: "-", setTimeLimit: "01-03-25 to 01-04-25", unit: "grams" },
  ];

  // Search state for the search bar on this page only
  const [searchQuery, setSearchQuery] = useState("");

  // Main return
  return (
    <>
      {/* Centre Page Box */}
      <div
        className="bg-white rounded-lg shadow p-2"
        style={{
          width: 1246,
          height: 610,
          position: "absolute",
          top: 145,
          left: 104,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 20,
        }}
      >
        <div
          className="bg-white rounded-xl shadow p-2 flex-grow flex flex-col"
          style={{
            position: "relative",
            boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
            borderRadius: 14,
            padding: "34px 42px 36px 42px",
            height: "100%",
          }}
        >
{/* Top Section */}
<div className="flex items-center w-full mb-0" style={{ marginBottom: 0, paddingBottom: 0 }}>
  <BackArrowSvg onClick={onBack} />
  <h2
    className="text-[22px] font-medium text-[#202224] font-['Aleo']"
    style={{
      lineHeight: "20px",
      letterSpacing: "0px",
      marginLeft: 0,
      marginTop:-20,
      marginRight: "auto",
      textAlign: "left",
      fontWeight: 400,
      display: "flex",
      alignItems: "center",
      transform: "translateY(-2px)",
    }}
  >
    <span style={{ marginLeft: 4 }}>Set limit for wastage of food</span>
  </h2>
  <div className="flex items-center gap-2 ml-auto" style={{ fontFamily: aleoFont , transform: "translateY(-15px)" }}>
    <input
      type="text"
      defaultValue="01-03-25 to 01-04-25"
      className="!w-[192px] !h-[30px] !rounded-[4px] !border-[1px] !border-[#C99E5A] !bg-[#FCFDFD] !text-[16px] !pl-[10px] !pr-[40px] focus-visible:ring-offset-0 focus-visible:ring-0 font-['Aleo'] text-[#202224]"
      style={{ boxShadow: "none", transform: "translateY(-2px)" }}
    />
    <div className="absolute right-[280px] top-[44px] pointer-events-none" style={{ transform: "translateY(-35px)" }}>
      <ClockSvg />
    </div>
    {/* --- Search Bar only --- */}
    <div style={{ position: "relative", marginLeft: "10px", transform: "translateY(-3px)" }}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: figmaLightBrown, height: '20px', width: '20px' }}
      />
      <Input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
      />
    </div>
    <div style={{ transform: "translateY(-2px)" }}>
      <ColoredBucketButton onClick={onBack} />
    </div>
  </div>
</div>

{/* Soft separation line (enhanced visibility) */}
<div
  className="relative"
  style={{
    left: "-42px",
    width: "calc(100% + 85px)",
    height: "10px",
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0))",
    marginTop: 2,
    marginBottom: 14,
    borderTop: "5px solid rgba(0, 0, 0, 0.06)",
    borderBottom: "none",
  }}
/>


{/* Headings */}
<div
  className="grid grid-cols-4 gap-2 px-2 py-2"
  style={{
    fontFamily: "Aleo",
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "100%",
    letterSpacing: "0px",
    color: figmaBlack,
    marginTop: "0px",
    marginBottom: "-1px",
    alignItems: "center",
    width: "99%",
    marginLeft: "1%",
  }}
>
  <div style={{ textAlign: "left", transform: "translateY(-2px)" }}>Ingredient</div>
  <div style={{ textAlign: "left", transform: "translateY(-2px)" }}>Set Limit</div>
  <div style={{ textAlign: "left", transform: "translateY(-2px)" }}>Set Time Limit</div>
  <div style={{ textAlign: "left", transform: "translateY(-2px)" }}>Unit</div>
</div>

          {/* Heading separation line */}
<div
  className="relative"
  style={{
    left: "-42px",
    width: "calc(97% + 119px)",
    height: "10px",
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
    marginTop: 2,
    marginBottom: 4,
    border: "1.5px solid #EBCDB5"
  }}
/>

          {/* List - Keep all in one page, no custom scroll bar */}
          <div className="flex flex-col gap-2 pr-2 flex-grow" style={{ height: 'auto' }}>
            {wastageLimits.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="grid grid-cols-4 gap-2 items-center px-2 py-2" style={{ marginLeft: "1%", width: "99%" }}>
                  <div
                    className="font-['Aleo'] font-normal text-[20px] text-[#202224]"
                    style={{
                      lineHeight: "100%",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      textAlign: "left",
                      transform: "translateY(-2px)",
                    }}
                  >
                    {item.ingredient}
                  </div>
                  <input
                    type="text"
                    defaultValue={item.setLimit}
                    className="!w-[87px] !h-[30px] !rounded-[5px] !border-[1px] !border-[#C99E5A] !bg-[#FCFDFD] !text-[16px] !text-[#202224] focus-visible:ring-offset-0 focus-visible:ring-0 text-center flex items-center justify-center"
                    style={{ boxShadow: "none", transform: "translateY(-2px)" }}
                  />
                  <input
                    type="text"
                    defaultValue={item.setTimeLimit}
                    className="!w-[148px] !h-[20px] !rounded-[4px] !border-[1px] !border-[#C99E5A] !bg-[#FCFDFD] !text-[15px] !px-[6px] focus-visible:ring-offset-0 focus-visible:ring-0 font-['Aleo'] font-normal"
                    style={{ boxShadow: "none", lineHeight: "20px", letterSpacing: "0px", transform: "translateY(-2px)" }}
                  />
                  <select
                    defaultValue={item.unit}
                    className="!w-[89px] !h-[30px] !rounded-[5px] !border-[1px] !border-[#C99E5A] !bg-[#FCFDFD] !text-[16px] !text-[#202224] focus:ring-offset-0 focus:ring-0"
                    style={{ boxShadow: "none", transform: "translateY(-2px)" }}
                  >
                    <option value="grams">grams</option>
                    <option value="kg">kg</option>
                    <option value="pieces">pieces</option>
                  </select>
                </div>
                {/* Line between each ingredient row */}
                {index < wastageLimits.length - 1 && (
                  <div
                    className="w-full"
                    style={{
                      height: "2px",
                      background: headingSepLine,
                      margin: "0 auto",
                      width: "108%",
                      marginLeft: "-3.6%",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* Floating Save Button as a separate absolutely-positioned element */}
      <FloatingSaveButton onClick={() => console.log('Save Changes clicked')} />
    </>
  );
};

const RiceWastageDetailPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedType, setSelectedType] = useState("");
  // Dummy data
  const rows = [
    {
      image: "/image1_rice.jpg",
      ingredient: "Rice",
      quantity: "500g",
      category: "Seeds &\nGrains",
      datetime: "13/03\n5:40pm",
      cost: "₹25",
      reason: "Expired",
    },
    {
      image: "/image1_rice.jpg",
      ingredient: "Rice",
      quantity: "250g",
      category: "Seeds &\nGrains",
      datetime: "12/03\n4:40pm",
      cost: "₹12.5",
      reason: "Spill",
    },
    {
      image: "/image1_rice.jpg",
      ingredient: "Rice",
      quantity: "800g",
      category: "Seeds &\nGrains",
      datetime: "10/03\n5:40pm",
      cost: "₹40",
      reason: "Expired",
    },
    {
      image: "/image1_rice.jpg",
      ingredient: "Rice",
      quantity: "500g",
      category: "Seeds &\nGrains",
      datetime: "08/03\n1:40pm",
      cost: "₹25",
      reason: "Missing",
    },
    {
      image: "/image1_rice.jpg",
      ingredient: "Rice",
      quantity: "350g",
      category: "Seeds &\nGrains",
      datetime: "05/03\n3:40pm",
      cost: "₹17.5",
      reason: "Spill",
    },
    {
      image: "/image1_rice.jpg",
      ingredient: "Rice",
      quantity: "600g",
      category: "Seeds &\nGrains",
      datetime: "04/03\n2:40pm",
      cost: "₹30",
      reason: "Expired",
      cut: true,
    },
  ];
  return (
    <>
      <div
        className="bg-white rounded-lg shadow p-2"
        style={{
          width: 1246,
          height: 610,
          position: 'absolute',
          top: 145,
          left: 104,
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 20,
        }}
      >
        <div
          className="bg-white rounded-xl shadow p-2 flex-grow flex flex-col"
          style={{
            position: "relative",
            borderRadius: 14,
            boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
            padding: "0px",
            height: "100%",
          }}
        >
          {/* Top Bar */}
          <div
            className="flex items-center"
            style={{
              width: "100%",
              minHeight: "64px",
              padding: "16px 24px 8px 16px",
              boxSizing: "border-box",
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
              background: "#fff",
              fontFamily: aleoFont,
            }}
          >
            <BackArrowSvg onClick={onBack} />
            <div className="flex gap-2 items-center ml-auto">
              <Select value={selectedType} onValueChange={setSelectedType} />
            </div>
          </div>
          {/* Soft separation line */}
          <div
            className="relative"
            style={{
              left: "-8px",
              width: "calc(100% + 16px)",
              height: "10px",
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
              marginTop: 2,
              marginBottom: 14,
            }}
          />
          {/* Table */}
          <div
            style={{
              flex: 1,
              background: "#FCFDFD",
              borderRadius: "0 0 14px 14px",
              overflowY: "auto",
              borderBottom: "none",
              borderLeft: "none",
              borderRight: "none",
              fontFamily: aleoFont,
              position: "relative",
            }}
          >
            {/* Headings */}
            <div
              className="grid grid-cols-8 items-center px-6 py-3"
              style={{
                fontWeight: 500,
                fontSize: "22px",
                borderBottom: `2px solid ${headingSepLine}`,
                color: figmaBlack,
                background: "#fff",
                marginTop: -5,
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                textAlign: "center",
              }}
            >
              <div className="text-center">Image</div>
              <div className="text-center">Ingredient</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Category</div>
              <div className="text-center">Date/time</div>
              <div className="text-center">Cost</div>
              <div className="text-center">Reason</div>
              <div className="text-center">Edit</div>
            </div>
            {/* Rows */}
            {rows.map((row, idx) => (
              <React.Fragment key={idx}>
                <div
                  className="grid grid-cols-8 items-center px-6"
                  style={{
                    fontSize: "18px",
                    background: "#fff",
                    borderBottom: idx === rows.length-1 ? 'none' : `1.5px solid ${headingSepLine}`,
                    color: figmaBlack,
                    fontFamily: aleoFont,
                    height: row.cut ? 38 : 80,
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                >
                  <div className="flex justify-center">
                    <img
                      src={row.image}
                      alt={row.ingredient}
                      style={{
                        borderRadius: 6,
                        width: 60,
                        height: 48,
                        objectFit: "cover",
                        background: "#f8f7f3",
                      }}
                    />
                  </div>
                  <div className="flex justify-center items-center">{row.ingredient}</div>
                  <div className="flex justify-center items-center">{row.quantity}</div>
                  <div className="flex flex-col items-center justify-center whitespace-pre-line" style={{ whiteSpace: "pre-line" }}>{row.category}</div>
                  <div className="flex flex-col items-center justify-center whitespace-pre-line" style={{ whiteSpace: "pre-line" }}>{row.datetime}</div>
                  <div className="flex justify-center items-center">{row.cost}</div>
                  <div className="flex justify-center items-center">{row.reason}</div>
                  <div className="flex justify-center items-center">
                    <svg width="22" height="22" fill="none" stroke="#4B3937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                    </svg>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* 6 of 300 items as a floating/absolute message below the table */}
      <div
        className="flex justify-end items-center text-[#202224]"
        style={{
          fontSize: 15,
          position: "absolute",
          left: 144 + 1246 - 212,
          top: 155 + 610 + 7,
          zIndex: 40,
          width: 208,
          background: "transparent",
          fontFamily: aleoFont,
        }}
      >
        6 of 300 items
      </div>
    </>
  );
};

// --- SusWastage Main Page ---
const SusWastage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showWastageLimitPage, setShowWastageLimitPage] = useState(false);
  const [showRiceDetailPage, setShowRiceDetailPage] = useState(false);

  // Type of ingredient dropdown state for the outer/main page
  const [selectedIngredientType, setSelectedIngredientType] = useState("");

  const suspiciousItems = [
    {
      id: 1,
      image: "/image1_rice.jpg",
      ingredient: "Rice",
      wasted: "3kg",
      setLimit: "2.5kg",
    },
    // More items if needed
  ];

  if (showWastageLimitPage) {
    return <SetWastageLimit onBack={() => setShowWastageLimitPage(false)} />;
  }
  if (showRiceDetailPage) {
    return <RiceWastageDetailPage onBack={() => setShowRiceDetailPage(false)} />;
  }

  return (
    <div
      className="bg-white rounded-lg shadow p-2"
      style={{
        width: 1246,
        height: 610,
        position: 'absolute',
        top: 145,
        left: 104,
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'column',
        overflow: "visible",
        zIndex: 20,
      }}
    >
      <div
        className="bg-white rounded-xl shadow p-2 flex-grow flex flex-col"
        style={{
          position: "relative",
          boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
          borderRadius: 14,
          padding: "0",
          height: "100%",
        }}
      >
        <div
          className="flex items-center"
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "28px 60px 0 36px",
            boxSizing: "border-box",
            marginBottom: 0,
            gap: "0",
            fontFamily: aleoFont,
          }}
        >
          <BackArrowSvg onClick={onBack} />
          <div className="flex gap-2 items-center ml-auto">
            {/* --- Type of Ingredient Dropdown only --- */}
            <Select value={selectedIngredientType} onValueChange={setSelectedIngredientType} />
            <ShieldButton onClick={onBack} />
          </div>
        </div>
        {/* Heading line */}
        <div
          className="relative"
          style={{
            left: "-8px",
            width: "calc(100% + 16px)",
            height: "10px",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
            marginTop: -2,
            marginBottom: 14,
          }}
        />
        <div className="flex justify-between items-center px-[36px]" style={{ marginBottom: "23px" }}>
          <h2
            className="text-[22px] font-medium text-[#202224] font-['Aleo']"
            style={{
              lineHeight: "20px",
              letterSpacing: "0px",
              width: "auto",
              height: "20px",
              fontSize: "26px",
              fontWeight: 400,
              marginBottom: 0,
            }}
          >
            Suspicious stock wastage
          </h2>
          {/* --- BucketButton restored exactly as before --- */}
          <BucketButton onClick={() => setShowWastageLimitPage(true)} />
        </div>
        {/* --- Suspicious Items Box --- */}
        <div
          className="flex flex-col gap-6"
          style={{
            padding: "0 36px",
          }}
        >
          {suspiciousItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white rounded-[14px]"
              style={{
                boxShadow: "0px 8px 40px rgba(185, 185, 185, 0.13), 0px 2px 8px rgba(185, 185, 185, 0.08)",
                width: "380px",
                height: "135px",
                maxWidth: "100%",
                marginBottom: "0",
                padding: "0 0",
                position: "relative",
                left: 0,
                top: -10,
                transition: "background 0.18s",
              }}
            >
              {/* --- Rice Block Left --- */}
              <div
                className="flex items-center justify-center"
                style={{
                    background: "#FDFBF9",
                    minWidth: 108,
                    width: 108,
                    height: 89,
                    marginLeft: 24,
                    marginRight: 24,
                    borderRadius: "8px",
                }}
              >
                <img
                src={item.image}
                alt={item.ingredient}
                style={{
                    width: "110px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    background: "#f8f7f3",
                }}
                />
              </div>
              {/* --- Details --- */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontFamily: "Aleo, serif",
                  fontSize: "20px",
                  color: "#202224",
                  height: "100%",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div>
                  Ingredient: <span style={{ color: goldenBrown }}>{item.ingredient}</span>
                </div>
                <div>
                  Wasted: <span style={{ color: goldenBrown }}>{item.wasted}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  Set Limit: <span style={{ color: goldenBrown }}>{item.setLimit}</span>
                  <button
                    className="font-['Cormorant_Garamond'] text-[18px] font-normal ml-2 p-0"
                    onClick={() => setShowRiceDetailPage(true)}
                    style={{
                        color: "#3788D9",
                        textDecoration: "underline",
                        textUnderlineOffset: "1px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        verticalAlign: "baseline",
                        lineHeight: "inherit",
                        padding: 0,
                        display: "inline",
                        transform: "translateY(15px)"
                    }}
                    type="button"
                  >
                    View more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* --- End Suspicious Box --- */}
      </div>
    </div>
  );
};

// --- Main Page Wrapper to host everything ---
const SusWastagePage: React.FC = () => {
  const [showSusWastage, setShowSusWastage] = useState(true);

  if (!showSusWastage) {
    // Show main WastageTab page
    return <WastageTab onBack={() => setShowSusWastage(true)} />;
  }

  // The SusWastage component will handle its own internal state (SetLimit etc.)
  return <SusWastage onBack={() => setShowSusWastage(false)} />;
};

export default SusWastagePage;