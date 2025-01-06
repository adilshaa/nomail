import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Pricing = () => {
	const [billingCycle, setBillingCycle] = useState("monthly");
	const [selectedPlan, setSelectedPlan] = useState(null);

	const plans = [
		{
			id: 1,
			name: "Basic",
			monthlyPrice: "$9.99/month",
			yearlyPrice: "$99.99/year",
			features: [
				{ name: "Limited access", included: true },
				{ name: "Community support", included: false },
				{ name: "Priority support", included: true },
				{ name: "Free updates", included: true },
			],
		},
		{
			id: 2,
			name: "Standard",
			monthlyPrice: "$19.99/month",
			yearlyPrice: "$199.99/year",
			features: [
				{ name: "Access to basic features", included: true },
				{ name: "Email support", included: true },
				{ name: "Priority support", included: true },
				{ name: "Free updates", included: true },
			],
		},
		{
			id: 3,
			name: "Premium",
			monthlyPrice: "$29.99/month",
			yearlyPrice: "$299.99/year",
			features: [
				{ name: "Unlimited access", included: true },
				{ name: "Priority support", included: true },
				{ name: "Free updates", included: true },
				{ name: "Priority support", included: true },
				{ name: "Free updates", included: true },
			],
		},
	];

	return (
		<div className="w-full flex flex-col items-center justify-center py-12 h-screen bg-gray-100">
			<div className="w-full max-w-screen-lg px-10 mb-8">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-[23px] font-bold">Our Pricing Plans</h2>
					<div className="flex space-x-4">
						<button
							onClick={() => setBillingCycle("monthly")}
							className={`py-2 px-4 rounded-full transition-colors ${
								billingCycle === "monthly" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"
							}`}
						>
							Monthly
						</button>
						<button
							onClick={() => setBillingCycle("yearly")}
							className={`py-2 px-4 rounded-full transition-colors ${
								billingCycle === "yearly" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"
							}`}
						>
							Yearly
						</button>
					</div>
				</div>
				<div className="flex flex-wrap justify-center gap-6">
					{plans.map((plan) => (
						<div
							key={plan.id}
							className="relative bg-white shadow-lg rounded-lg w-72 text-left transform transition-transform hover:scale-105 overflow-hidden"
							style={{ borderRadius: "20px" }}
						>
							<div className="p-6">
								<h3 className="text-lg font-medium mb-2">{plan.name}</h3>
								<p className="text-4xl font-bold mb-1">
									{billingCycle === "monthly"
										? plan.monthlyPrice.split("/")[0]
										: plan.yearlyPrice.split("/")[0]}
									<span className="text-lg font-normal">
										/{billingCycle === "monthly" ? "month" : "year"}
									</span>
								</p>
								<hr className="border-t border-gray-300 my-4" />
								<ul className="text-gray-600 mb-6">
									{plan.features.map((feature, index) => (
										<li key={index} className="flex items-center">
											{/* Reserve space for the icon to ensure alignment */}
											<span className="w-4 flex justify-center">
												{feature.included ? <FaCheck className="text-purple-500 mr-2" /> : null}
											</span>
											{/* Display feature name or placeholder if missing */}
											{feature.name ? feature.name : <span className="text-gray-400">No name available</span>}
										</li>
									))}
								</ul>
								<button
									onClick={() => setSelectedPlan(plan.id)}
									className={`w-full py-2 px-4 rounded-full transition-colors ${
										selectedPlan === plan.id
											? "bg-purple-500 text-white"
											: "border border-purple-500 text-purple-500"
									}`}
								>
									Select Plan
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Pricing;
