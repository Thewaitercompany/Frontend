import React, { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

// Figma/Design palette
const aleoFont = 'Aleo, serif';
const figmaBrownishColor = '#C99E5A';
const figmaLightBrown = "#B39793";
const figmaOffWhite = "#F0EDE5";
const figmaDarkBrown = "#4B3937";
const figmaPeach = "#EBCDB5";
const figmaBlack = "#212224";

// Figma-style Tickbox (custom as per your provided code snippet)
const CustomTickbox: React.FC<{
  checked: boolean;
  onChange?: (checked: boolean) => void;
  ariaLabel?: string;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
}> = ({
  checked,
  onChange,
  ariaLabel,
  style = {},
  className = "",
  disabled,
}) => (
  <div
    className={`w-7 h-6 rounded-[4px] flex items-center justify-center border-[1.2px] border-[#C99E5A] bg-white cursor-pointer select-none ${className}`}
    style={{
      width: 28,
      height: 24,
      border: "1.2px solid #C99E5A",
      borderRadius: 4,
      background: "#fff",
      ...style,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.7 : 1,
      padding: 0,
      boxSizing: "border-box",
      overflow: 'visible'
    }}
    tabIndex={0}
    role="checkbox"
    aria-checked={checked}
    aria-label={ariaLabel}
    onClick={() => !disabled && onChange?.(!checked)}
  >
    {checked && (
      // Tick arc SVG, exactly as provided in your snippet
      <svg
        width="64"
        height="64"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'translate(1px, 4px)' }}
      >
        <path
          d="M4 12C5.5 14.5 9 20 12.5 13C14 10.5 18.5 4 24 2.5"
          stroke="#0BA52A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </div>
);

const ingredientTypes = [
  { value: "vegetable", label: "Vegetable" },
  { value: "spice", label: "Spice" },
  { value: "condiment", label: "Condiment" },
  { value: "dairy", label: "Dairy" },
  { value: "sauce", label: "Sauce" },
  { value: "grain", label: "Grain" },
  { value: "protein", label: "Protein" },
  { value: "other", label: "Other" },
];

const dummyIngredientsForWastage = [
  { id: 1, name: "Potato", type: "vegetable", cost: 0, hasBox: true },
  { id: 2, name: "Paprika", type: "spice", cost: 0, hasBox: true },
  { id: 3, name: "Salt", type: "condiment", cost: 0, hasBox: true },
  { id: 4, name: "Garlic powder", type: "spice", cost: 0, hasBox: true },
  { id: 5, name: "Black pepper", type: "spice", cost: 0, hasBox: true },
  { id: 6, name: "Mayonnaise", type: "condiment", cost: 0, hasBox: true },
];

interface AddWastagePageProps {
  onBack: () => void;
}

const BackArrowSvg: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => (
  <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }} aria-label="Back">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M23 27L10 16L23 5" stroke="#4D3E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);
const PlusSignButton: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => (
  <button onClick={onClick} style={{ background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: `1px solid ${figmaLightBrown}`, backgroundColor: figmaOffWhite }} aria-label="Add">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.8333 1.83333C12.8333 1.3471 12.6402 0.880788 12.2964 0.536971C11.9525 0.193155 11.4862 0 11 0C10.5138 0 10.0475 0.193155 9.70364 0.536971C9.35982 0.880788 9.16667 1.3471 9.16667 1.83333V9.16667H1.83333C1.3471 9.16667 0.880788 9.35982 0.536971 9.70364C0.193155 10.0475 0 10.5138 0 11C0 11.4862 0.193155 11.9525 0.536971 12.2964C0.880788 12.6402 1.3471 12.8333 1.83333 12.8333H9.16667V20.1667C9.16667 20.6529 9.35982 21.1192 9.70364 21.463C10.0475 21.8068 10.5138 22 11 22C11.4862 22 11.9525 21.8068 12.2964 21.463C12.6402 21.1192 12.8333 20.6529 12.8333 20.1667V12.8333H20.1667C20.6529 12.8333 21.1192 12.6402 21.463 12.2964C21.8068 11.9525 22 11.4862 22 11C22 10.5138 21.8068 10.0475 21.463 9.70364C21.1192 9.35982 20.6529 9.16667 20.1667 9.16667H12.8333V1.83333Z" fill={figmaDarkBrown}/>
    </svg>
  </button>
);

const AddWastagePage: React.FC<AddWastagePageProps> = ({ onBack }) => {
  const [addWastageData, setAddWastageData] = useState({
    item: "",
    quantity: "",
    unit: "grams",
    suspiciousLimit: "",
    reason: "",
  });

  const [showIngredientDialog, setShowIngredientDialog] = useState(false);
  const [selectedIngredientType, setSelectedIngredientType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedWastageIngredients, setSelectedWastageIngredients] = useState<number[]>([]);
  const [ingredientRows] = useState(
    dummyIngredientsForWastage.map((item) => ({
      ...item,
      quantity: "",
      unit: "grams",
    }))
  );
  // REMOVED: const [autoStockEnabled, setAutoStockEnabled] = useState(false);

  const filteredIngredients = ingredientRows.filter(
    (item) =>
      (!selectedIngredientType || item.type === selectedIngredientType) &&
      (!searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      {/* --- DARK OVERLAY + DIALOG --- */}
      {showIngredientDialog && (
        <>
          {/* Figma-style dark overlay */}
          <div
            style={{
              position: "fixed",
              zIndex: 1999,
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(33,34,36,0.49)",
              transition: "background 0.14s",
              pointerEvents: "auto",
            }}
          />
          {/* Dialog block */}
          <div
            style={{
              position: "fixed",
              zIndex: 2000,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 1035,
              height: 554,
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "20px 38px 0 38px",
                fontFamily: aleoFont,
                fontWeight: 500,
                fontSize: 26,
                color: "#4A3936",
                justifyContent: "flex-start",
                letterSpacing: 0,
              }}
            >
              <button
                onClick={() => setShowIngredientDialog(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginRight: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  height: 32,
                }}
                aria-label="Go back"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M18 24L7 14L18 4" stroke="#4A3936" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span style={{ fontFamily: aleoFont, fontWeight: 500, fontSize: 24, color: "#4A3936" }}>
                Pick ingredients from the list to include in wastage.
              </span>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
              <Select value={selectedIngredientType} onValueChange={setSelectedIngredientType}>
                <SelectTrigger
                  style={{
                    border: `1.3px solid ${figmaLightBrown}`,
                    background: "#fff",
                    fontSize: 18,
                    minWidth: 200,
                    minHeight: 36,
                    color: figmaLightBrown,
                    borderRadius: 6,
                    boxShadow: 'none',
                    fontFamily: aleoFont,
                  }}
                >
                  <SelectValue placeholder="Type of Ingredient" />
                </SelectTrigger>
                <SelectContent className="!border-[1px] !border-[#B39793] !bg-white !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0">
                  {/* Select items unchanged */}
                  {[
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
                  ].map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
                <div style={{ position: "relative", width: 180, height: 36 }}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: figmaLightBrown, height: '19px', width: '19px', position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      paddingLeft: 34,
                      width: 180,
                      height: 36,
                      borderRadius: 6,
                      border: `1.3px solid ${figmaLightBrown}`,
                      background: "#fff",
                      fontSize: 17,
                      fontFamily: aleoFont,
                      color: "#B39793",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Thin separator line */}
            <div
              style={{
                width: "100%",
                height: 5,
                background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
                marginTop: 15,
                marginBottom: 10,
              }}
            />

            {/* Table Headings */}
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "90px 2.2fr 1.1fr 1.1fr 1.1fr",
                alignItems: "center",
                fontFamily: aleoFont,
                fontWeight: 500,
                fontSize: 23,
                color: figmaDarkBrown,
                background: "#fff",
                borderBottom: `1.5px solid ${figmaPeach}`,
                padding: "0 34px 0 34px",
                height: 45,
              }}
            >
              <div style={{ textAlign: "center" }}>Select</div>
              <div style={{ textAlign: "center" }}>Ingredients</div>
              <div style={{ textAlign: "center" }}>Quantity</div>
              <div style={{ textAlign: "center" }}>Unit</div>
              <div style={{ textAlign: "center" }}>Cost</div>
            </div>

            {/* Ingredient Rows */}
            <div
              style={{
                width: "100%",
                flex: 1,
                overflowY: "auto",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 6, // or 10, 15, etc. Adjust as needed.
              }}
            >
              {filteredIngredients.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "90px 2.2fr 1.1fr 1.1fr 1.1fr",
                    alignItems: "center",
                    fontFamily: aleoFont,
                    fontWeight: 500,
                    fontSize: 20,
                    color: "#4A3936",
                    height: 54,
                    borderBottom: `1.1px solid ${figmaPeach}`,
                    padding: "0 34px 0 34px",
                    background: "#fff"
                  }}
                >
                  {/* Tickbox */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {item.hasBox ? (
                      <CustomTickbox
                        checked={selectedWastageIngredients.includes(item.id)}
                        onChange={(checked) => {
                          setSelectedWastageIngredients((prev) =>
                            checked
                              ? [...prev, item.id]
                              : prev.filter((id) => id !== item.id)
                          );
                        }}
                        ariaLabel={`Select ${item.name}`}
                      />
                    ) : (
                      <span style={{
                        color: "#B39793",
                        fontWeight: 500,
                        fontSize: 20,
                        fontFamily: aleoFont,
                        letterSpacing: "1.5px"
                      }}>N/A</span>
                    )}
                  </div>
                  {/* Name */}
                  <div style={{
                    border: "none",
                    borderRadius: 7,
                    width: "70%",
                    margin: "auto",
                    height: 37,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    fontFamily: aleoFont,
                    fontWeight: 500,
                    fontSize: 20,
                    color: "#4A3936",
                    background: "#fff",
                    paddingLeft: 9,
                  }}>
                    {item.name}
                  </div>
                  {/* Quantity */}
                  <div style={{
                    border: `1.3px solid ${figmaBrownishColor}`,
                    borderRadius: 6,
                    width: "86px",
                    margin: "auto",
                    height: 37,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: aleoFont,
                    fontWeight: 500,
                    fontSize: 20,
                    color: "#4A3936",
                    background: "#fff",
                  }}>
                    -
                  </div>
                  {/* Unit dropdown (disabled, just shows the trigger, not clickable) */}
                  <div style={{
                    border: `1.3px solid ${figmaBrownishColor}`,
                    borderRadius: 6,
                    width: "98px",
                    margin: "auto",
                    height: 37,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff"
                  }}>
                    <div
                      style={{
                        fontFamily: aleoFont,
                        fontWeight: 500,
                        fontSize: 20,
                        color: "#4A3936",
                        background: "#fff",
                        border: "none",
                        height: 37,
                        minHeight: 37,
                        width: "100%",
                        borderRadius: 6,
                        boxShadow: "none",
                        padding: "0 9px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        pointerEvents: "auto",
                        userSelect: "none"
                      }}
                      tabIndex={0}
                      aria-label="Unit"
                    >
                      grams
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          marginLeft: 8,
                          marginRight: 2,
                        }}
                      >
                        <path d="M1 1.5L6 5.5L11 1.5" stroke="#B39793" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  {/* Cost */}
                  <div style={{
                    fontFamily: aleoFont,
                    fontWeight: 500,
                    fontSize: 20,
                    color: "#4A3936",
                    textAlign: "center",
                  }}>
                    ₹{item.cost}
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom bar */}
            <div
              style={{
                width: "100%",
                height: 54,
                background: "#F1EEE6",
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 42,
                paddingRight: 50,
                fontFamily: aleoFont,
                fontWeight: 700,
                fontSize: 24,
                color: figmaBlack
              }}
            >
              <span style={{ fontWeight: 700 }}>Total Cost</span>
              <span style={{ fontWeight: 700 }}>
                NA
              </span>
            </div>
          </div>
        </>
      )}

      {/* Main Add Wastage Page unchanged except "grams" box width/height */}
      <div
        className="bg-white rounded-lg shadow p-2"
        style={{
          width: 1246,
          height: 286,
          position: 'absolute',
          top: 145,
          left: 104,
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
        }}
      >
        <div className="bg-white rounded-xl flex flex-col" style={{ position: "relative", flexGrow: 1 }}>
          <div className="flex justify-between items-center w-full" style={{ padding: "16px 36px 0 36px" }}>
            <div className="flex items-center">
              <BackArrowSvg onClick={onBack} />
              <span style={{
                fontFamily: aleoFont,
                fontWeight: 700,
                fontSize: 28,
                color: "#4D3E3B",
                letterSpacing: "0px",
                marginLeft: 14,
              }}>Add wastage</span>
            </div>
            <PlusSignButton onClick={onBack} />
          </div>
          <div
            className="relative"
            style={{
              left: "-8px",
              width: "calc(100% + 16px)",
              height: "10px",
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
              marginTop: 8,
              marginBottom: 0,
            }}
          />
          <div
            style={{
              fontFamily: aleoFont,
              fontWeight: 500,
              fontSize: 22,
              color: "#212224",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 18,
              marginBottom: 0,
              padding: "0 56px",
              height: 26,
              textAlign: "center",
            }}
          >
            <div style={{ flex: 1.5, textAlign: "left", paddingLeft: "10px" }}>Dish/Ingredient</div>
            <div style={{ flex: 1, textAlign: "center" }}>Quantity</div>
            <div style={{ flex: 1, textAlign: "center" }}>Unit</div>
            <div style={{ flex: 1.5, textAlign: "center" }}>Suspicious Wastage Limit</div>
            <div style={{ flex: 1.2, textAlign: "center" }}>Reason</div>
          </div>
          <div style={{
            borderBottom: "1.5px solid #EBCDB5",
            margin: "16px 0 0 0",
          }}/>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "13px 56px 0 56px",
              fontFamily: aleoFont,
              background: "#fff",
              borderRadius: "0 0 14px 14px",
              gap: 20,
            }}
          >
            <div style={{ flex: 1.5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingLeft: "10px" }}>
              <button style={{
                  width: 160,
                  height: 40,
                  border: "1px solid #C99E5A",
                  borderRadius: 4,
                  background: "#fff",
                  color: "#C99E5A",
                  fontFamily: aleoFont,
                  fontWeight: 500,
                  fontSize: 16,
                  cursor: "pointer",
                  marginBottom: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
              }}>
                  Choose dish
              </button>
              <span style={{
                  fontFamily: aleoFont,
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#000",
                  marginBottom: 5,
                  marginTop: 5,
              }}>
                  OR
              </span>
              {/* THIS BUTTON OPENS THE DIALOG */}
              <button
                  style={{
                      width: 160,
                      height: 40,
                      border: "1px solid #C99E5A",
                      borderRadius: 4,
                      background: "#fff",
                      color: "#C99E5A",
                      fontFamily: aleoFont,
                      fontWeight: 500,
                      fontSize: 16,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                  }}
                  onClick={() => setShowIngredientDialog(true)}
              >
                  Choose ingredient
              </button>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <input
                type="text"
                value={addWastageData?.quantity}
                onChange={(e) => setAddWastageData({ ...addWastageData, quantity: e.target.value })}
                placeholder="-"
                style={{
                  width: 70,
                  height: 40,
                  border: "1px solid #C99E5A",
                  borderRadius: 4,
                  background: "#fff",
                  fontFamily: aleoFont,
                  fontWeight: 500,
                  fontSize: 18,
                  color: "#000",
                  textAlign: "center",
                  padding: "0 5px",
                  boxSizing: "border-box"
                }}
              />
            </div>
            {/* Grams box with requested size and positioning */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Select value={addWastageData.unit} onValueChange={(value) => setAddWastageData({ ...addWastageData, unit: value })}>
                <SelectTrigger
                  className="custom-dropdown-trigger flex items-center justify-between !border-[1px] !border-[#C99E5A] !bg-[#FCFDFD] !text-[16px] !h-[30px] !rounded-[4px] !shadow-none !min-w-[89px] !px-[10px] !leading-[30px] !align-middle
                  [&>svg:not(.custom-dropdown-icon)]:hidden [&>span[data-radix-select-icon]]:hidden"
                  style={{
                    width: 89,
                    height: 30,
                    top: 137,
                    left: 724,
                    border: "1px solid #C99E5A",
                    borderRadius: 4,
                    background: "#FCFDFD",
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingRight: 10,
                    minWidth: 89,
                    minHeight: 30,
                    boxShadow: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <SelectValue
                    placeholder="Unit"
                    className="custom-select-value !text-[#000] data-[placeholder-shown=true]:!text-[#000]"
                  />
                  <svg
                    className="custom-dropdown-icon !text-[#000] !w-[15px] !h-[15px] !ml-[8px] !shrink-0"
                    width="15"
                    height="15"
                    fill="none"
                    viewBox="0 0 15 15"
                  >
                    <path
                      d="M4 6L7.5 10L11 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </SelectTrigger>
              </Select>
            </div>
            <div style={{ flex: 1.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{
                  width: 114,
                  height: 30,
                  border: "1px solid #C99E5A",
                  borderRadius: 4,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: aleoFont,
                  fontWeight: 500,
                  fontSize: 18,
                  padding: "0 8px",
                  boxSizing: "border-box"
              }}>
                <input
                  type="text"
                  value={addWastageData?.suspiciousLimit}
                  onChange={(e) => setAddWastageData({ ...addWastageData, suspiciousLimit: e.target.value })}
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    width: 48,
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: 18,
                    lineHeight: "26px",
                    outline: "none",
                    background: "transparent",
                    padding: 0,
                    marginBottom: 0
                  }}
                />
                <span style={{
                  color: "#000",
                  fontWeight: 500,
                  fontSize: 19,
                  marginLeft: 4,
                  lineHeight: "26px"
                }}>kg</span>
                <svg width={15} height={15} style={{marginLeft: 4}}>
                  <path d="M4 6L7.5 10L11 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div style={{ flex: 1.2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <input
                type="text"
                value={addWastageData?.reason}
                onChange={(e) => setAddWastageData({ ...addWastageData, reason: e.target.value })}
                placeholder="Add a reason"
                style={{
                  width: 150,
                  height: 70,
                  border: "1px solid #C99E5A",
                  borderRadius: 8,
                  background: "#fff",
                  fontFamily: aleoFont,
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#000",
                  textAlign: "center",
                  padding: "0 10px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 36,
            bottom: -103,
            zIndex: 120,
          }}
        >
          <button
            style={{
              background: "#C99E5A",
              color: "#fff",
              fontFamily: aleoFont,
              fontSize: 24,
              fontWeight: 700,
              border: "none",
              borderRadius: 6,
              padding: 0,
              width: 188,
              height: 41,
              cursor: "pointer",
              boxShadow: "0 2px 8px 0 #C99E5A22"
            }}
            onClick={onBack}
          >
            Add Wastage
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWastagePage;