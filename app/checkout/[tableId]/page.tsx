'use client';

import React from 'react';
import { Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

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
  price: number;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ params }) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const { tableId } = resolvedParams;
  
  const [review, setReview] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [hoveredRating, setHoveredRating] = React.useState(0);

  // Static data to match the image
  const [items] = React.useState<CartItem[]>([
    { id: 1, name: "Crispy fries", quantity: 1, price: 60 },
    { id: 2, name: "Chicken Nuggets", quantity: 1, price: 80 },
  ]);

  if (!resolvedParams) {
    return <div>Error: No parameters provided.</div>;
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const gstPercent = 10;
  const gstAmount = Math.round((subtotal * gstPercent) / 100);
  const totalAmount = subtotal + gstAmount;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Review submitted:', { review, rating });
    setReview('');
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-[#F1EEE6]">
      <Navbar tableId={tableId} />

      <main className="p-4 space-y-4">
        {/* Order Summary Card */}
        <div className="bg-white rounded-xl p-6">
          <p className="text-center italic mb-6 text-[15px]">
            We hope you enjoyed our service!
          </p>
          
          <h2 className="text-[15px] mb-4">Order Summary</h2>
          
          <div className="mb-6">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 text-[13px] italic mb-2">
              <span>Dish Name</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>
            
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_auto_auto] gap-4 text-[15px] py-1">
                <span>{item.name}</span>
                <span className="text-center">{item.quantity}</span>
                <span>₹ {item.price}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-3 mb-6">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 text-[13px] italic mb-2">
              <span>Tax Type</span>
              <span>Percent</span>
              <span>Amount</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 text-[15px]">
              <span>GST</span>
              <span>{gstPercent}%</span>
              <span>₹ {gstAmount}</span>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-3">
            <div className="flex justify-between text-[15px]">
              <span>Total Amount Payable</span>
              <span>₹ {totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Review Card */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-[15px] mb-4">Leave a Review</h2>
          
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                title='Rate this product'
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-2xl"
              >
                <Star 
                  className={`w-6 h-6 ${
                    star <= (hoveredRating || rating) 
                      ? 'fill-yellow-400 stroke-yellow-400' 
                      : 'stroke-gray-300'
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
              className="w-full h-32 p-3 rounded-lg border border-gray-200 resize-none mb-4 text-[15px]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#9D8480] text-white px-6 py-2 rounded-md text-[15px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 grid grid-cols-2 gap-4 bg-[#F1EEE6]">
        <button
          type="button"
          onClick={() => {console.log('Payment process initiated')}}
          className="bg-[#9D8480] text-white py-3 rounded-md text-[15px]"
        >
          Pay Now
        </button>
        <button
          type="button"
          onClick={() => router.push(`/menu/${resolvedParams.tableId}`)}
          className="bg-[#9D8480] text-white py-3 rounded-md text-[15px]"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

