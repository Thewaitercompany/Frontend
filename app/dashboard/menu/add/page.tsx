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
              onClick={() => router.push("/dashboard")}
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

            <h2 className="text-xl font-medium font-black">Add New Dish</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative -translate-x-[50%]">
              <FontAwesomeIcon
                icon={faBell}
                className="text-[#4D3E3B] text-2xl h-[25px]"
              />

              {/* Notification dot */}
              <span
                className="absolute bg-[#F55151] border border-white text-white text-[12px] leading-[14px] font-normal w-[16px] h-[16px] flex items-center justify-center rounded-full"
                style={{
                  left: "96.41%",
                  top: "13.7%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "Aleo",
                }}
              >
                1
              </span>
            </div>
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
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Ingredient</th>
                  <th className="py-2 px-4">Cost</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Toggle</th>
                </tr>
              </thead>
              <tbody className="text-[#4b2e2e] font-medium">
                {" "}
                {/* added font-medium to match header */}
                <tr className="border-b border-[#f5e9e2]">
                  <td className="py-3 px-4">
                    <div className="col-span-1 flex flex-col items-center">
                      <label
                        htmlFor="image-upload"
                        className="w-24 h-24 bg-[#f5f1eb] border border-[#e5c99a] rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
                      >
                        {menuItem.image ? (
                          <Image
                            src={menuItem.image}
                            alt="Dish"
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            Add image
                          </span>
                        )}
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="col-span-1">
                      <input
                        type="text"
                        name="name"
                        placeholder="Add the name of the dish"
                        className="w-full p-2 border border-[#e5c99a] rounded-lg text-sm font-serif bg-[#f5f1eb]"
                        value={menuItem.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="col-span-2">
                      <textarea
                        name="description"
                        placeholder="Add a brief description about the dish"
                        className="w-full p-2 border border-[#e5c99a] rounded-lg text-sm font-serif bg-[#f5f1eb]"
                        rows={3}
                        value={menuItem.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="col-span-2 flex flex-col gap-2">
                      <button
                        type="button"
                        className="w-full p-2 border border-[#e5c99a] rounded-lg text-sm flex items-center justify-between bg-[#f5f1eb] hover:bg-[#e9e2d6] font-serif"
                        onClick={() => setShowIngredientModal(true)}
                      >
                        <span>
                          {menuItem.ingredients
                            ? "Edit Ingredients"
                            : "Add Ingredients and its quantity"}
                        </span>
                        <Plus className="w-4 h-4 text-[#C99E5A]" />
                      </button>
                      {menuItem.ingredients && (
                        <div className="text-xs text-gray-600 mt-1 font-serif">
                          {menuItem.ingredients}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="col-span-1">
                      <input
                        type="text"
                        name="cost"
                        placeholder="Add the total cost of the dish"
                        className="w-full p-2 border border-[#e5c99a] rounded-lg text-sm font-serif bg-[#f5f1eb]"
                        value={menuItem.cost}
                        onChange={handleInputChange}
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="col-span-1">
                      <input
                        type="text"
                        name="price"
                        placeholder="Add the selling price of the dish"
                        className="w-full p-2 border border-[#e5c99a] rounded-lg text-sm font-serif bg-[#f5f1eb]"
                        value={menuItem.price}
                        onChange={handleInputChange}
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="col-span-1">
                      <select
                        name="category"
                        value={menuItem.category}
                        onChange={(e) =>
                          setMenuItem((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-[#e5c99a] rounded-lg text-sm font-serif bg-[#f5f1eb]"
                        title="Category"
                      >
                        <option value="Starters">Starters</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Drinks">Drinks</option>
                      </select>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="col-span-1 flex flex-col items-center">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={menuItem.isVeg}
                          onChange={() =>
                            setMenuItem((prev) => ({
                              ...prev,
                              isVeg: !prev.isVeg,
                            }))
                          }
                          className="accent-[#C99E5A] w-5 h-5 rounded border-gray-300"
                        />
                        <span className="text-base font-serif">Veg Only</span>
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-8 py-2 text-white rounded-[12px] text-lg font-semibold shadow-none bg-[#C99E5A] hover:bg-[#b88d49] font-serif transition-all duration-200"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{ minWidth: "200px" }}
          >
            {isSubmitting ? "Saving..." : "Save New Dish"}
          </button>
        </div>

        {showIngredientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="flex flex-col items-end">
              <div className="bg-white rounded-2xl shadow-xl p-8 w-[1000px] max-w-full border border-[#e5c99a] font-serif">
                <div className="flex items-center justify-between gap-6 mb-4">
                  {/* Left: Close button + heading */}
                  <div className="flex items-center gap-2">
                    {/* onClick={() => setShowIngredientModal(false)} */}
                    <button
                      title="Close"
                      onClick={() => setShowIngredientModal(false)}
                      className="w-[12px] h-[22px]"
                    >
                      <svg
                        width="12"
                        height="22"
                        viewBox="0 0 12 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.2783 22C10.0528 22 9.82943 21.9527 9.62109 21.8604C9.4126 21.7679 9.22305 21.6317 9.06348 21.4609L0.505859 12.3018C0.345648 12.1316 0.218655 11.9291 0.131836 11.7061C0.0449954 11.483 4.81931e-05 11.2436 0 11.002C0 10.7601 0.0449486 10.5201 0.131836 10.2969C0.218671 10.0739 0.345642 9.87134 0.505859 9.70117L9.06348 0.541992C9.22253 0.370347 9.41163 0.233622 9.62012 0.140625C9.82858 0.0476665 10.0525 4.31617e-05 10.2783 0C10.5041 0 10.7281 0.0477222 10.9365 0.140625C11.1451 0.233624 11.335 0.370298 11.4941 0.541992C11.6544 0.71215 11.7813 0.914709 11.8682 1.1377C11.9551 1.36092 12 1.60095 12 1.84277C12 2.08448 11.955 2.32375 11.8682 2.54688C11.7814 2.7699 11.6544 2.97238 11.4941 3.14258L4.13477 11.002L11.4941 18.8604C11.8162 19.2053 11.9971 19.6735 11.9971 20.1611C11.997 20.4024 11.9525 20.6413 11.8662 20.8643C11.7799 21.0873 11.6535 21.2902 11.4941 21.4609C11.1719 21.8059 10.7341 22 10.2783 22Z"
                          fill="#4A3936"
                        />
                        <path
                          d="M10.2783 22C10.0528 22 9.82943 21.9527 9.62109 21.8604C9.4126 21.7679 9.22305 21.6317 9.06348 21.4609L0.505859 12.3018C0.345648 12.1316 0.218655 11.9291 0.131836 11.7061C0.0449954 11.483 4.81931e-05 11.2436 0 11.002C0 10.7601 0.0449486 10.5201 0.131836 10.2969C0.218671 10.0739 0.345642 9.87134 0.505859 9.70117L9.06348 0.541992C9.22253 0.370347 9.41163 0.233622 9.62012 0.140625C9.82858 0.0476665 10.0525 4.31617e-05 10.2783 0C10.5041 0 10.7281 0.0477222 10.9365 0.140625C11.1451 0.233624 11.335 0.370298 11.4941 0.541992C11.6544 0.71215 11.7813 0.914709 11.8682 1.1377C11.9551 1.36092 12 1.60095 12 1.84277C12 2.08448 11.955 2.32375 11.8682 2.54688C11.7814 2.7699 11.6544 2.97238 11.4941 3.14258L4.13477 11.002L11.4941 18.8604C11.8162 19.2053 11.9971 19.6735 11.9971 20.1611C11.997 20.4024 11.9525 20.6413 11.8662 20.8643C11.7799 21.0873 11.6535 21.2902 11.4941 21.4609C11.1719 21.8059 10.7341 22 10.2783 22Z"
                          stroke="#EFECE4"
                        />
                      </svg>
                    </button>
                    <h2 className="text-xl font-semibold text-[#4b2e2e] whitespace-nowrap">
                      Add ingredients to the restaurant dish
                    </h2>
                  </div>

                  {/* Right: Dropdown + search input */}
                  <div className="flex gap-4">
                    <select
                      value={ingredientType}
                      onChange={(e) => setIngredientType(e.target.value)}
                      className="border border-[#e5c99a] rounded px-3 py-1 text-base bg-white focus:outline-none font-serif min-w-[180px]  text-[#B39793] placeholder-[#B39793]"
                      title="Type of Ingredient"
                    >
                      <option value="">Type of Ingredient</option>
                      <option value="Veg">Veg</option>
                      <option value="Spice">Spice</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="relative w-[196px] h-[32px]">
                      {/* SVG Background */}
                      <svg
                        width="196"
                        height="32"
                        viewBox="0 0 196 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 left-0 pointer-events-none"
                        dangerouslySetInnerHTML={{
                          __html: `
      <rect x="0.3" y="0.3" width="195.4" height="31.4" rx="3.7" fill="#FCFDFD" stroke="#B39793" stroke-width="0.6"/>
      <!-- your full SVG paths go here -->
    `,
                        }}
                      />

                      {/* Input Field */}
                      <input
                        type="text"
                        placeholder="Search"
                        value={ingredientFilter}
                        onChange={(e) => setIngredientFilter(e.target.value)}
                        className="absolute top-0 left-0 w-full h-full px-3 bg-transparent text-[#B39793] placeholder-[#B39793] font-serif focus:outline-none z-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-100 rounded mb-4">
                  <table className="w-full text-sm font-serif text-center">
                    <thead>
                      <tr>
                        <th className="py-2 px-2 font-semibold border-b border-[#e5c99a]">
                          Select
                        </th>
                        <th className="py-2 px-2 font-semibold border-b border-[#e5c99a]">
                          Ingredients
                        </th>
                        <th className="py-2 px-2 font-semibold border-b border-[#e5c99a]">
                          Quantity
                        </th>
                        <th className="py-2 px-2 font-semibold border-b border-[#e5c99a]">
                          Unit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIngredients.map((ing) => {
                        const selected = selectedIngredients.find(
                          (sel) => sel.name === ing.name
                        );
                        return (
                          <tr
                            key={ing.name}
                            className="border-b border-[#e5c99a] bg-white"
                          >
                            <td className="py-2 px-2 border-b border-[#e5c99a] align-middle">
                              <input
                                type="checkbox"
                                checked={!!selected}
                                onChange={() => handleIngredientCheck(ing.name)}
                                className="accent-[#C99E5A] w-5 h-5 rounded border-[#e5c99a]"
                                title={`Select ${ing.name} ingredient`}
                              />
                            </td>
                            <td className="py-2 px-2 border-b border-[#e5c99a] align-middle">
                              {ing.name}
                            </td>
                            <td className="py-2 px-2 border-b border-[#e5c99a] align-middle">
                              {selected ? (
                                <input
                                  type="number"
                                  min="0"
                                  aria-label="Ingredient quantity"
                                  placeholder="Quantity"
                                  title="Quantity"
                                  value={selected.quantity}
                                  onChange={(e) =>
                                    handleIngredientChange(
                                      ing.name,
                                      "quantity",
                                      e.target.value
                                    )
                                  }
                                  className="w-20 px-2 py-1 border border-[#e5c99a] rounded text-sm focus:outline-none font-serif bg-[#f5f1eb]"
                                />
                              ) : (
                                <span className="text-gray-400 font-serif">
                                  Nil
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-2 border-b border-[#e5c99a] align-middle">
                              <select
                                disabled={!selected}
                                value={selected?.unit || "grams"}
                                onChange={(e) =>
                                  handleIngredientChange(
                                    ing.name,
                                    "unit",
                                    e.target.value
                                  )
                                }
                                className="border border-[#e5c99a] rounded px-2 py-1 text-sm bg-[#f5f1eb] focus:outline-none font-serif"
                                title="Unit"
                              >
                                <option value="grams">grams</option>
                                <option value="ml">ml</option>
                                <option value="pieces">pieces</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ✅ Button placed below the modal and centered */}
              <button
                className="mt-2 mr-4 bg-[#C99E5A] hover:bg-[#b88d49] text-white rounded-2xl text-xl font-semibold font-serif"
                onClick={handleAddIngredients}
                disabled={selectedIngredients.length === 0}
                style={{ width: "192px", height: "41px" }}
              >
                Add Ingredients
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
