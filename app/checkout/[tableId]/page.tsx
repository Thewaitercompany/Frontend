"use client";

import React from "react";
import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

interface CheckoutPageParams {
  tableId: string;
}

interface CheckoutPageProps {
  params: Promise<CheckoutPageParams>;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  total: string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ params }) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const { tableId } = resolvedParams;

  const [items, setItems] = React.useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = React.useState<string>("0.00");
  const [gst, setGst] = React.useState<string>("0.00");
  const [_totalPayable, setTotalPayable] = React.useState<string>("0.00");
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [hoveredRating, setHoveredRating] = React.useState(0);

  React.useEffect(() => {
    const fetchCheckoutSummary = async () => {
      try {
        const response = await fetch(
          `https://qr-customer-sj9m.onrender.com/cart/checkout-summary/${tableId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch checkout summary");
        }

        const data = await response.json();
        // Update state with the fetched data
        setItems(data.orderSummary.items);
        setTotalAmount(data.orderSummary.totalAmount);
        setGst(data.orderSummary.gst);
        setTotalPayable(data.orderSummary.totalPayable);
      } catch (error) {
        console.error("Error fetching checkout summary:", error);
      }
    };

    if (tableId) {
      fetchCheckoutSummary();
    }
  }, [tableId]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", { review, rating });
    setReview("");
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      <Navbar tableId={tableId} />

      <main className="p-4 space-y-4 mb-24">
        {/* Order Summary Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="font-serif italic mb-6">
            We hope you enjoyed our service!
          </p>

          <h2 className="font-serif mb-4">Order Summary</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
              <div className="font-serif text-sm">Dish Name</div>
              <div className="text-center font-serif text-sm">Quantity</div>
              <div className="text-right font-serif text-sm">Price</div>

              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="font-serif">{item.name}</div>
                  <div className="text-center font-serif">{item.quantity}</div>
                  <div className="text-right font-serif">₹ {item.total}</div>
                </React.Fragment>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3 grid grid-cols-[2fr_1fr_1fr] gap-4">
              <div className="font-serif text-sm">Tax Type</div>
              <div className="text-center font-serif text-sm">Percent</div>
              <div className="text-right font-serif text-sm">Amount</div>

              <div className="font-serif">GST</div>
              <div className="text-center font-serif">
                <span>10%</span>
              </div>
              <div className="text-right font-serif">₹ {gst}</div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between font-serif">
                <span>Total Amount Payable</span>
                <span>₹ {totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Review Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-serif mb-4">Leave a Review</h2>

          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                title="Rate this restaurant"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-2xl"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "stroke-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmitReview}>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write here..."
              className="w-full h-32 p-3 rounded-lg border border-gray-200 resize-none mb-4 font-serif"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#B39793] text-white px-6 py-2 rounded-md font-serif"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 grid grid-cols-2 gap-4 bg-[#F5F1EA]">
        <button
          type="button"
          onClick={() => {
            console.log("Payment process initiated");
          }}
          className="bg-[#B39793] text-white py-3 rounded-md font-serif"
        >
          Pay Now
        </button>
        <button
          type="button"
          onClick={() => router.push(`/menu/${resolvedParams.tableId}`)}
          className="bg-[#B39793] text-white py-3 rounded-md font-serif"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
