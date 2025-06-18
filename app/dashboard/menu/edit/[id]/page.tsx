"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import Image from "next/image";

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

export default function EditMenuItem() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

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
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Fetch dish data by ID
  useEffect(() => {
    async function fetchDish() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://qr-server-tabb.onrender.com/menu/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch dish");
        const data = await response.json();
        setMenuItem({
          image: data.image || null,
          name: data.name || "",
          description: data.description || "",
          ingredients: data.ingredients || "",
          cost: data.cost ? String(data.cost) : "",
          price: data.price ? String(data.price) : "",
          category: data.category || "Starters",
          isVeg: data.isVeg !== undefined ? data.isVeg : true,
        });
        // Parse ingredients for modal
        if (data.ingredients) {
          const parsed = String(data.ingredients)
            .split(",")
            .map((s: string) => {
              const match = s.match(/(.*)\s*\((\d+)(g|ml|pieces)\)/);
              if (match) {
                return {
                  name: match[1].trim(),
                  quantity: match[2],
                  unit: match[3],
                };
              }
              return null;
            })
            .filter(Boolean) as {
            name: string;
            quantity: string;
            unit: string;
          }[];
          setSelectedIngredients(parsed);
        }
      } catch (e) {
        alert("Failed to load dish.");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDish();
  }, [id]);

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
      const response = await fetch(
        `https://qr-server-tabb.onrender.com/menu/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(menuItem),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update menu item.");
      }
      alert("Menu item updated successfully!");
      router.push("/dashboard/menu");
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-0 font-serif">
      <header className="flex items-center gap-3 px-10 pt-6 pb-2 bg-[#f5f1eb]">
        <Link href="/dashboard/menu" className="flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-lg font-medium">Edit Dish</span>
        </Link>
      </header>
      <main className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-3xl p-8 shadow-none border border-[#e5c99a]">
          <div className="grid grid-cols-8 gap-6 items-center border-b border-[#e5c99a] pb-2 mb-6">
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
                  <span className="text-xs text-gray-400">Add image</span>
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
            <div className="col-span-1">
              <select
                name="category"
                value={menuItem.category}
                onChange={(e) =>
                  setMenuItem((prev) => ({ ...prev, category: e.target.value }))
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
            <div className="col-span-1 flex flex-col items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={menuItem.isVeg}
                  onChange={() =>
                    setMenuItem((prev) => ({ ...prev, isVeg: !prev.isVeg }))
                  }
                  className="accent-[#C99E5A] w-5 h-5 rounded border-[#e5c99a]"
                />
                <span className="text-base font-serif">Veg Only</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className={`fixed bottom-10 right-10 px-10 py-3 text-white rounded-lg text-xl font-semibold shadow-none bg-[#C99E5A] hover:bg-[#b88d49] font-serif`}
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{ minWidth: "240px" }}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
        {/* Ingredient Modal */}
        {showIngredientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[700px] max-w-full border border-[#e5c99a] font-serif">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
                onClick={() => setShowIngredientModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="text-lg font-semibold mb-4">
                Edit ingredients to the restaurant dish
              </div>
              <div className="flex gap-4 mb-4">
                <select
                  value={ingredientType}
                  onChange={(e) => setIngredientType(e.target.value)}
                  className="border border-[#e5c99a] rounded px-3 py-1 text-base bg-white focus:outline-none font-serif min-w-[180px]"
                  title="Type of Ingredient"
                >
                  <option value="">Type of Ingredient</option>
                  <option value="Veg">Veg</option>
                  <option value="Spice">Spice</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Search"
                  value={ingredientFilter}
                  onChange={(e) => setIngredientFilter(e.target.value)}
                  className="px-4 py-2 border border-[#e5c99a] rounded text-base focus:outline-none w-64 font-serif bg-white"
                />
              </div>
              <div className="overflow-y-auto max-h-72 border border-[#e5c99a] rounded mb-4">
                <table className="w-full text-sm font-serif">
                  <thead>
                    <tr className="border-b border-[#e5c99a] bg-[#f5f1eb]">
                      <th className="py-2 px-2 text-left font-semibold border-b border-[#e5c99a] border-r border-[#e5c99a]">
                        Select
                      </th>
                      <th className="py-2 px-2 text-left font-semibold border-b border-[#e5c99a] border-r border-[#e5c99a]">
                        Ingredients
                      </th>
                      <th className="py-2 px-2 text-left font-semibold border-b border-[#e5c99a] border-r border-[#e5c99a]">
                        Quantity
                      </th>
                      <th className="py-2 px-2 text-left font-semibold border-b border-[#e5c99a]">
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
                          <td className="py-2 px-2 border-b border-[#e5c99a] border-r border-[#e5c99a] align-middle">
                            <input
                              type="checkbox"
                              checked={!!selected}
                              onChange={() => handleIngredientCheck(ing.name)}
                              className="accent-[#C99E5A] w-5 h-5 rounded border-[#e5c99a]"
                              title={`Select ${ing.name} ingredient`}
                            />
                          </td>
                          <td className="py-2 px-2 border-b border-[#e5c99a] border-r border-[#e5c99a] align-middle">
                            {ing.name}
                          </td>
                          <td className="py-2 px-2 border-b border-[#e5c99a] border-r border-[#e5c99a] align-middle">
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
              <div className="flex justify-end">
                <button
                  className="px-10 py-3 bg-[#C99E5A] hover:bg-[#b88d49] text-white rounded-lg text-xl font-semibold font-serif shadow-none"
                  onClick={handleAddIngredients}
                  disabled={selectedIngredients.length === 0}
                  style={{ minWidth: "200px" }}
                >
                  Edit Ingredients
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
