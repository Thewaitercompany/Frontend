"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRouter } from "next/navigation";

interface MenuItem {
  image?: string | null;
  name: string;
  description: string;
  ingredients: string;
  cost: string;
  price: string;
  category: string;
  isVeg: boolean;
}

export default function AddMenuItem() {
  const [menuItem, setMenuItem] = useState<MenuItem>({
    image: null,
    name: "",
    description: "",
    ingredients: "",
    cost: "",
    price: "",
    category: "Starters",
    isVeg: true,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  // Static ingredient data for demo
  const allIngredients = [
    { name: "Potatoes", type: "Veg" },
    { name: "Paprika", type: "Spice" },
    { name: "Salt", type: "Spice" },
    { name: "Garlic powder", type: "Spice" },
    { name: "Black pepper", type: "Spice" },
    { name: "Mayonnaise", type: "Dairy" },
    { name: "Onion", type: "Veg" },
    { name: "Oil", type: "Other" },
  ];
  const [ingredientFilter, setIngredientFilter] = useState("");
  const [ingredientType, setIngredientType] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<
    {
      name: string;
      quantity: string;
      unit: string;
    }[]
  >([]);
  const router = useRouter();
  // Filtered ingredient list
  const filteredIngredients = allIngredients.filter(
    (ing) =>
      (!ingredientType || ing.type === ingredientType) &&
      (!ingredientFilter ||
        ing.name.toLowerCase().includes(ingredientFilter.toLowerCase()))
  );

  // Handle select/deselect ingredient
  const handleIngredientCheck = (name: string) => {
    if (selectedIngredients.some((ing) => ing.name === name)) {
      setSelectedIngredients(
        selectedIngredients.filter((ing) => ing.name !== name)
      );
    } else {
      setSelectedIngredients([
        ...selectedIngredients,
        { name, quantity: "", unit: "grams" },
      ]);
    }
  };

  const [showInvoicePopup, setShowInvoicePopup] = useState(false);


  // Handle quantity/unit change
  const handleIngredientChange = (
    name: string,
    field: "quantity" | "unit",
    value: string
  ) => {
    setSelectedIngredients(
      selectedIngredients.map((ing) =>
        ing.name === name ? { ...ing, [field]: value } : ing
      )
    );
  };

  // Confirm ingredient selection
  const handleAddIngredients = () => {
    // Create summary string for main form
    const summary = selectedIngredients
      .filter((ing) => ing.quantity)
      .map(
        (ing) =>
          `${ing.name} (${ing.quantity}${
            ing.unit === "grams" ? "g" : ing.unit
          })`
      )
      .join(", ");
    setMenuItem((prev) => ({ ...prev, ingredients: summary }));
    setShowIngredientModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuItem((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (
      !menuItem.name.trim() ||
      !menuItem.description.trim() ||
      !menuItem.ingredients.trim() ||
      !menuItem.cost.trim() ||
      !menuItem.price.trim() ||
      !menuItem.category.trim()
    ) {
      alert("All required fields must be provided.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("https://qr-server-tabb.onrender.com/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuItem),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save menu item.");
      }
      alert("Menu item added successfully!");
      setMenuItem({
        image: null,
        name: "",
        description: "",
        ingredients: "",
        cost: "",
        price: "",
        category: "Starters",
        isVeg: true,
      });
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-0 font-serif">
      <main className="mx-auto w-[1400px] ml-[6%]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-[#4b2e2e]">
            <button
              title="Back"
              onClick={() => router.push("/dashboard/sales-overview/expense-purchase")}
              className="w-[25px] h-[25px]"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="25" height="25" fill="#F1EEE6" />
                <path
                  d="M17.2783 23.75C17.0882 23.75 16.8994 23.7101 16.7227 23.6318C16.5457 23.5534 16.3833 23.4378 16.2461 23.291L7.68848 14.1318V14.1309C7.55062 13.9845 7.43978 13.8093 7.36426 13.6152C7.28884 13.4214 7.25005 13.2128 7.25 13.002C7.25 12.7909 7.28875 12.5817 7.36426 12.3877C7.42088 12.2422 7.49717 12.1073 7.58984 11.9873L7.68848 11.8721L16.2461 2.71289L16.2471 2.71191C16.3838 2.56437 16.5457 2.44803 16.7227 2.36914C16.8993 2.29042 17.0881 2.25004 17.2783 2.25C17.4688 2.25 17.6581 2.29029 17.835 2.36914C18.0119 2.44803 18.1738 2.56436 18.3105 2.71191L18.3115 2.71289L18.4102 2.82812C18.5028 2.94817 18.5791 3.08303 18.6357 3.22852C18.7113 3.42255 18.75 3.63167 18.75 3.84277C18.75 4.05366 18.7112 4.2622 18.6357 4.45605C18.5791 4.60147 18.5028 4.73645 18.4102 4.85645L18.3115 4.97168L10.9521 12.8311L10.792 13.002L10.9521 13.1729L18.3115 21.0312H18.3125C18.5894 21.3281 18.7471 21.7348 18.7471 22.1611C18.747 22.372 18.7079 22.5805 18.6328 22.7744C18.5577 22.9684 18.4487 23.1442 18.3115 23.291C18.0346 23.5874 17.6621 23.75 17.2783 23.75Z"
                  fill="#4A3936"
                  stroke="#EFECE4"
                  strokeWidth="0.5"
                />
              </svg>
            </button>

            <h2 className="text-xl font-medium font-black">Add New Expense</h2>
          </div>
          <div className="flex items-center gap-4">
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4893_14828)">
<circle cx="27" cy="25" r="20.5" fill="#F0EDE5" stroke="#B39793"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.8333 15.8333C28.8333 15.3471 28.6402 14.8808 28.2964 14.537C27.9525 14.1932 27.4862 14 27 14C26.5138 14 26.0475 14.1932 25.7036 14.537C25.3598 14.8808 25.1667 15.3471 25.1667 15.8333V23.1667H17.8333C17.3471 23.1667 16.8808 23.3598 16.537 23.7036C16.1932 24.0475 16 24.5138 16 25C16 25.4862 16.1932 25.9525 16.537 26.2964C16.8808 26.6402 17.3471 26.8333 17.8333 26.8333H25.1667V34.1667C25.1667 34.6529 25.3598 35.1192 25.7036 35.463C26.0475 35.8068 26.5138 36 27 36C27.4862 36 27.9525 35.8068 28.2964 35.463C28.6402 35.1192 28.8333 34.6529 28.8333 34.1667V26.8333H36.1667C36.6529 26.8333 37.1192 26.6402 37.463 26.2964C37.8068 25.9525 38 25.4862 38 25C38 24.5138 37.8068 24.0475 37.463 23.7036C37.1192 23.3598 36.6529 23.1667 36.1667 23.1667H28.8333V15.8333Z" fill="#4B3937"/>
</g>
<defs>
<filter id="filter0_d_4893_14828" x="0" y="0" width="54" height="54" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4893_14828"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4893_14828" result="shape"/>
</filter>
</defs>
</svg>

          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-none border border-[#e5c99a]">
          <div className="overflow-x-auto rounded-md ">
            <table className="min-w-full bg-white text-base text-center text-xl font-extrabold">
              {" "}
              {/* increased from text-sm to text-base */}
              <thead className="text-[#4b2e2e] font-medium">
                {" "}
                {/* changed font-large (invalid) to font-medium */}
                <tr className="border-b border-[#e0d5cc] bg-transparent">
                  <th className="py-2 px-4">Expense</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Date/Time</th>
                  <th className="py-2 px-4">Reason</th>
                  <th className="py-2 px-4">Paid to</th>
                  <th className="py-2 px-4">Paid by</th>
                  <th className="py-2 px-4">Add Invoice</th>
                </tr>
              </thead>
              <tbody className="text-[#4b2e2e] font-medium">
                {" "}
                {/* added font-medium to match header */}
                <tr className="border-b border-[#f5e9e2]">
                  
                    <td className="py-3 px-4">
                    <div className="relative w-full h-[100px]">
  <textarea
    name="name"
    className="w-full h-full p-0 pt-[32px] text-center border border-[#e5c99a] rounded-xl text-sm font-serif bg-[#f5f1eb] resize-none"
    value={menuItem.name}
    onChange={handleInputChange}
    placeholder="Add expense name"
  />
</div>

                  </td>

                  <td className="py-3 px-4">
                    <div className="relative w-full h-[100px]">
  <textarea
    name="name"
    className="w-full h-full p-0 pt-[32px] text-center border border-[#e5c99a] rounded-xl text-sm font-serif bg-[#f5f1eb] resize-none"
    value={menuItem.name}
    onChange={handleInputChange}
    placeholder="Add total amount paid"
  />
</div>

                  </td>

                  <td className="py-3 px-4">
                    <div className="relative w-full h-[100px]">
  <textarea
    name="name"
    className="w-full h-full p-0 pt-[32px] text-center border border-[#e5c99a] rounded-xl text-sm font-serif bg-[#f5f1eb] resize-none"
    value={menuItem.name}
    onChange={handleInputChange}
    placeholder="Enter date and time"
  />
</div>

                  </td>

                  <td className="py-3 px-4">
                    <div className="relative w-full h-[100px]">
  <textarea
    name="name"
    className="w-full h-full p-0 pt-[32px] text-center border border-[#e5c99a] rounded-xl text-sm font-serif bg-[#f5f1eb] resize-none"
    value={menuItem.name}
    onChange={handleInputChange}
    placeholder="Enter reason for expense"
  />
</div>

                  </td>

                  <td className="py-3 px-4">
                    <div className="relative w-full h-[100px]">
  <textarea
    name="name"
    className="w-full h-full p-0 pt-[32px] text-center border border-[#e5c99a] rounded-xl text-sm font-serif bg-[#f5f1eb] resize-none"
    value={menuItem.name}
    onChange={handleInputChange}
    placeholder="Enter name"
  />
</div>

                  </td>

                  <td className="py-3 px-4">
                    <div className="relative w-full h-[100px]">
  <textarea
    name="name"
    className="w-full h-full p-0 pt-[32px] text-center border border-[#e5c99a] rounded-xl text-sm font-serif bg-[#f5f1eb] resize-none"
    value={menuItem.name}
    onChange={handleInputChange}
    placeholder="Enter name"
  />
</div>

                  </td>

                  <td className="py-3 px-4">
                    <div className="relative w-full h-[100px]">
                        <textarea
                        name="name"
                        className="w-full h-full p-0 pt-[32px] text-center border border-[#e5c99a] rounded-xl text-sm font-serif bg-[#f5f1eb] resize-none"
                        value={menuItem.name}
                        onClick={() => setShowInvoicePopup(true)}
                        readOnly // so user doesn't type here, just opens popup
                        placeholder="Click to add invoice details"
                        />
                    </div>
                    </td>


                  
                </tr>
              </tbody>
            </table>

            {showInvoicePopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-2xl shadow-lg p-8 w-[400px]">
      <div className="flex items-center mb-6">
        <button onClick={() => setShowInvoicePopup(false)} className="text-xl mr-3"><svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2783 22C10.0528 22 9.82943 21.9527 9.62109 21.8604C9.4126 21.7679 9.22305 21.6317 9.06348 21.4609L0.505859 12.3018C0.345648 12.1316 0.218655 11.9291 0.131836 11.7061C0.0449954 11.483 4.81931e-05 11.2436 0 11.002C0 10.7601 0.0449486 10.5201 0.131836 10.2969C0.218671 10.0739 0.345642 9.87134 0.505859 9.70117L9.06348 0.541992C9.22253 0.370347 9.41163 0.233622 9.62012 0.140625C9.82858 0.0476665 10.0525 4.31617e-05 10.2783 0C10.5041 0 10.7281 0.0477222 10.9365 0.140625C11.1451 0.233624 11.335 0.370298 11.4941 0.541992C11.6544 0.71215 11.7813 0.914709 11.8682 1.1377C11.9551 1.36092 12 1.60095 12 1.84277C12 2.08448 11.955 2.32375 11.8682 2.54688C11.7814 2.7699 11.6544 2.97238 11.4941 3.14258L4.13477 11.002L11.4941 18.8604C11.8162 19.2053 11.9971 19.6735 11.9971 20.1611C11.997 20.4024 11.9525 20.6413 11.8662 20.8643C11.7799 21.0873 11.6535 21.2902 11.4941 21.4609C11.1719 21.8059 10.7341 22 10.2783 22Z" fill="#4A3936"/>
<path d="M10.2783 22C10.0528 22 9.82943 21.9527 9.62109 21.8604C9.4126 21.7679 9.22305 21.6317 9.06348 21.4609L0.505859 12.3018C0.345648 12.1316 0.218655 11.9291 0.131836 11.7061C0.0449954 11.483 4.81931e-05 11.2436 0 11.002C0 10.7601 0.0449486 10.5201 0.131836 10.2969C0.218671 10.0739 0.345642 9.87134 0.505859 9.70117L9.06348 0.541992C9.22253 0.370347 9.41163 0.233622 9.62012 0.140625C9.82858 0.0476665 10.0525 4.31617e-05 10.2783 0C10.5041 0 10.7281 0.0477222 10.9365 0.140625C11.1451 0.233624 11.335 0.370298 11.4941 0.541992C11.6544 0.71215 11.7813 0.914709 11.8682 1.1377C11.9551 1.36092 12 1.60095 12 1.84277C12 2.08448 11.955 2.32375 11.8682 2.54688C11.7814 2.7699 11.6544 2.97238 11.4941 3.14258L4.13477 11.002L11.4941 18.8604C11.8162 19.2053 11.9971 19.6735 11.9971 20.1611C11.997 20.4024 11.9525 20.6413 11.8662 20.8643C11.7799 21.0873 11.6535 21.2902 11.4941 21.4609C11.1719 21.8059 10.7341 22 10.2783 22Z" stroke="#EFECE4"/>
</svg>
</button>
        <h2 className="text-lg font-semibold">Fill invoice</h2>
      </div>

      <div className="border border-[#e5c99a] rounded-xl h-32 flex items-center justify-center mb-6">
        <button className="text-[#d0a255] font-medium border border-[#d0a255] px-4 py-2 rounded-xl flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.12996 10.5202V3.3832L3.85312 5.66004L2.62713 4.39026L7.00567 0.0117188L11.3842 4.39026L10.1582 5.66004L7.88138 3.3832V10.5202H6.12996ZM1.75142 14.0231C1.26978 14.0231 0.85761 13.8517 0.514916 13.509C0.172222 13.1663 0.000583806 12.7539 0 12.2716V9.64451H1.75142V12.2716H12.2599V9.64451H14.0113V12.2716C14.0113 12.7533 13.84 13.1657 13.4973 13.509C13.1546 13.8523 12.7421 14.0236 12.2599 14.0231H1.75142Z" fill="#C99E5A"/>
</svg>
 Upload Bill
        </button>
      </div>

      <div>
        <p className="font-semibold mb-1">Bill Details</p>
        <label className="block text-sm mb-2">
          Total Amount Paid
          <input
            type="text"
            placeholder="Total Amount Paid"
            className="w-full mt-1 px-3 py-2 border rounded-xl border-[#8C8B8B] outline-none"
          />
        </label>

        <label className="block text-sm mb-2">
          GST Number
          <input
            type="text"
            placeholder="GST Number"
            className="w-full mt-1 px-3 py-2 border rounded-xl border-[#8C8B8B] outline-none"
          />
        </label>

        <label className="block text-sm mb-4">
          GST Paid
          <input
            type="text"
            placeholder="Add GST Paid"
            className="w-full mt-1 px-3 py-2 border rounded-xl border-[#8C8B8B] outline-none"
          />
        </label>

        <div className="flex justify-center">
  <button className="w-[150px] bg-[#d0a255] text-white py-2 rounded-xl text-lg font-medium">
    Confirm
  </button>
</div>

      </div>
    </div>
  </div>
)}

          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-8 py-2 text-white rounded-[12px] text-lg font-semibold shadow-none bg-[#C99E5A] hover:bg-[#b88d49] font-serif transition-all duration-200"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{ minWidth: "200px" }}
          >
            {isSubmitting ? "Adding..." : "Add Expense"}
          </button>
        </div>

      </main>
    </div>
  );
}
