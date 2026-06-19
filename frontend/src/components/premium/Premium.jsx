import React, { useEffect, useState } from "react";
import apiCall from "../../utils/axiosInstance";
const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    const verifyPremiumUser = async () => {
      const res = await apiCall.get("/premium/verify");

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    };
    verifyPremiumUser();
  }, []);

  const handleBuyPremium = async (type) => {
    const order = await apiCall.post("/payment/create", {
      membershipType: type,
    });

    //after an order it should have dialog box open
    const { keyId, amount, currency, orderId, notes } = order.data;
    const { firstName, lastName, emailId } = notes;
    //information require to make dialogbox
    const options = {
      key: keyId,
      amount: amount,
      currency: currency,
      name: "Partner",
      description: "Find your Patner",
      order_id: orderId,
      callback_url: "http://localhost:3000/payment-success",
      prefill: {
        name: `${firstName} ${lastName}`,
        email: emailId,
      },
      theme: {
        color: "#F37254",
      },
    };

    //we added script in index.html so Razorpay is attached to window object
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium? (<div>You are Already a Premium User</div>) :   (
    <div className="flex flex-col lg:flex-row gap-6 p-8 items-stretch">

  
      {/* Silver */}
      <div
        className="card flex-1 rounded-2xl p-8 flex flex-col gap-4 border border-[#aaaaaa]"
        style={{
          background:
            "linear-gradient(145deg, #e8e8e8 0%, #c8c8c8 30%, #f0f0f0 50%, #b0b0b0 70%, #d8d8d8 100%)",
          boxShadow:
            "0 4px 24px rgba(160,160,160,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        <span className="badge text-xs tracking-widest uppercase bg-white/40 text-gray-600 border border-gray-300">
          Silver
        </span>
        <div className="text-4xl text-gray-500">
          <i className="ti ti-medal" />
        </div>

        <h2
          className="font-bold text-2xl text-gray-900"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Silver Membership
        </h2>

        <p className="text-sm text-gray-600">
          15 day plan — perfect for getting started
        </p>
        <div className="divider my-0 border-black/10" />
        <ul className="flex flex-col gap-3 flex-1 text-sm text-gray-800">
          <li className="flex gap-2">
            <i className="ti ti-send" /> 50 requests per day
          </li>
          <li className="flex gap-2">
            <i className="ti ti-rosette" /> Silver badge on your profile
          </li>
          <li className="flex gap-2">
            <i className="ti ti-calendar" /> Valid for 15 days
          </li>
        </ul>
        <button
          className="btn w-full mt-4 text-gray-100 border-none font-semibold"
          style={{ background: "linear-gradient(135deg, #555 0%, #333 100%)" }}
          onClick={() => {
            handleBuyPremium("silver");
          }}
        >
          Buy Silver Membership - ₹299
        </button>
      </div>

      {/* Gold */}
      <div
        className="card flex-1 rounded-2xl p-8 flex flex-col gap-4 border-2 border-amber-700 relative"
        style={{
          background:
            "linear-gradient(145deg, #fde68a 0%, #f59e0b 30%, #fbbf24 50%, #d97706 70%, #fde68a 100%)",
          boxShadow:
            "0 4px 28px rgba(217,119,6,0.35), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        <span className="absolute top-4 right-4 badge text-xs tracking-widest uppercase bg-black/20 text-white border-none">
          Most Popular
        </span>
        <span className="badge text-xs tracking-widest uppercase bg-white/35 text-amber-900 border border-amber-600/30">
          Gold
        </span>
        <div className="text-4xl text-amber-900">
          <i className="ti ti-crown" />
        </div>

        <h2
          className="font-bold text-2xl text-amber-950"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Gold Membership
        </h2>

        <p className="text-sm text-amber-800">
          1 month plan — our best value offer
        </p>
        <div className="divider my-0 border-black/10" />
        <ul className="flex flex-col gap-3 flex-1 text-sm text-amber-950">
          <li className="flex gap-2">
            <i className="ti ti-infinity" /> Unlimited requests per day
          </li>
          <li className="flex gap-2">
            <i className="ti ti-rosette" /> Gold badge on your profile
          </li>
          <li className="flex gap-2">
            <i className="ti ti-calendar" /> Valid for 1 months
          </li>
        </ul>
        <button
          className="btn w-full mt-4 text-amber-200 border-none font-semibold"
          style={{
            background: "linear-gradient(135deg, #92400e 0%, #5c2a00 100%)",
          }}
          onClick={() => {
            handleBuyPremium("gold");
          }}
        >
          Buy Gold Membership - ₹699
        </button>
      </div>


    </div>
  );
};

export default Premium;
