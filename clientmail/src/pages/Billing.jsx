import React from "react";

const Billing = ({ currentPlan, previousPlans }) => {
	currentPlan = {
		name: "Premium",
		price: "$29.99/month",
		features: ["Unlimited access", "Priority support", "Free updates"],
		validity: "2023-12-31",
	};

	previousPlans = [
		{
			name: "Standard",
			price: "$19.99/month",
			features: ["Access to basic features", "Email support"],
			validity: "2023-06-30",
		},
		{
			name: "Basic",
			price: "$9.99/month",
			features: ["Limited access", "Community support"],
			validity: "2023-01-31",
		},
	];

	const handleUpdatePlan = () => {
		// Logic to update the plan
		console.log("Update plan clicked");
	};

	return (
		<div className="w-full px-2 py-2">
			<h1 className="text-3xl font-bold mb-6">Billing</h1>
			<div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
				<div className="p-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">Current Plan</h2>
					<table className="w-full text-left border-collapse">
						<thead>
							<tr>
								<th className="border-b-2 p-2 text-gray-600">Plan Name</th>
								<th className="border-b-2 p-2 text-gray-600">Price</th>
								<th className="border-b-2 p-2 text-gray-600">Features</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border-b p-2">{currentPlan.name}</td>
								<td className="border-b p-2">{currentPlan.price}</td>
								<td className="border-b p-2">
									<ul className="list-disc pl-5">
										{currentPlan.features.map((feature, index) => (
											<li key={index}>{feature}</li>
										))}
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
					<div className="flex justify-between items-center mt-4">
						<div className="text-gray-600">
							<span className="font-bold">Validity:</span> {currentPlan.validity}
						</div>
						<button
							onClick={handleUpdatePlan}
							className="bg-purple-500 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-colors duration-300"
						>
							Update Plan
						</button>
					</div>
				</div>
			</div>

			<div className="bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="p-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">Previous Plans</h2>
					<table className="w-full text-left border-collapse">
						<thead>
							<tr>
								<th className="border-b-2 p-2 text-gray-600">Plan Name</th>
								<th className="border-b-2 p-2 text-gray-600">Price</th>
								<th className="border-b-2 p-2 text-gray-600">Features</th>
								<th className="border-b-2 p-2 text-gray-600">Validity</th>
							</tr>
						</thead>
						<tbody>
							{previousPlans.map((plan, index) => (
								<tr key={index}>
									<td className="border-b p-2">{plan.name}</td>
									<td className="border-b p-2">{plan.price}</td>
									<td className="border-b p-2">
										<ul className="list-disc pl-5">
											{plan.features.map((feature, idx) => (
												<li key={idx}>{feature}</li>
											))}
										</ul>
									</td>
									<td className="border-b p-2">{plan.validity}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Billing;
