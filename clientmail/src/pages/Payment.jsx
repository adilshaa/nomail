import React, { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { post } from "../services/apiService";

const Payment = () => {
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [email, setEmail] = useState("");
	const [cardHolderName, setCardHolderName] = useState("");
	const [errors, setErrors] = useState({});
	const stripe = useStripe();
	const elements = useElements();

	const plans = [
		{ id: 1, name: "Basic", price: "$9.99/month", pay_amount: 999, description: "Limited access" },
		{ id: 2, name: "Standard", price: "$19.99/month", pay_amount: 1999, description: "Access to basic features" },
		{ id: 3, name: "Premium", price: "$29.99/month", pay_amount: 2999, description: "Unlimited access" },
	];

	useEffect(() => {
		if (selectedPlan) {
			// Fetch the client secret from your server when a plan is selected
			post("/api/create-payment-intent", { amount: selectedPlan.pay_amount })
				.then((res) => res.json())
				.then((data) => setClientSecret(data.clientSecret))
				.catch((error) => console.error("Error fetching client secret:", error));
		}
	}, [selectedPlan]);

	const handlePlanChange = (planId) => {
		const plan = plans.find((p) => p.id === planId);
		setSelectedPlan(plan);
	};

	const handlePaymentSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/payment-success",
			},
			redirect: "if_required",
		});

		if (error) {
			console.error("Payment failed:", error.message);
		} else if (paymentIntent && paymentIntent.status === "succeeded") {
			console.log("Payment successful!", paymentIntent);
			alert("Payment successful!");
		}
	};

	return (
		<div className="flex w-full px-20 py-10">
			<div className="w-1/2 pr-10">
				<h2 className="text-2xl font-bold mb-6">Choose a Plan</h2>
				<div className="space-y-4">
					{plans.map((plan) => (
						<div
							key={plan.id}
							className={`border p-4 rounded-lg shadow-sm flex items-center cursor-pointer ${
								selectedPlan?.id === plan.id ? "border-green-500" : "border-gray-300"
							}`}
							onClick={() => handlePlanChange(plan.id)}
						>
							<input
								type="radio"
								id={`plan-${plan.id}`}
								name="plan"
								value={plan.id}
								checked={selectedPlan?.id === plan.id}
								onChange={() => handlePlanChange(plan.id)}
								className="mr-4 custom-radio"
							/>
							<div>
								<label htmlFor={`plan-${plan.id}`} className="text-lg font-semibold">
									{plan.name}
								</label>
								<p className="text-gray-600">{plan.price}</p>
								<p className="text-gray-500">{plan.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="w-1/2 pl-10">
				<h2 className="text-2xl font-bold mb-6">Payment Details</h2>
				<form onSubmit={handlePaymentSubmit} className="bg-white p-6 rounded-lg shadow-sm">
					<div className="mb-4">
						<label className="block text-gray-600 text-sm mb-1" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={`border p-2 rounded-lg w-full outline-none ${
								errors.email ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
					</div>
					<div className="mb-4">
						<label className="block text-gray-600 text-sm mb-1" htmlFor="cardHolderName">
							Card Holder Name
						</label>
						<input
							type="text"
							id="cardHolderName"
							value={cardHolderName}
							onChange={(e) => setCardHolderName(e.target.value)}
							className={`border p-2 rounded-lg w-full outline-none ${
								errors.cardHolderName ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.cardHolderName && <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>}
					</div>

					<div
						className={`border p-4 rounded-lg shadow-sm mb-2 bg-white ${
							errors.card ? "border-red-500" : "border-gray-300"
						}`}
					>
						<PaymentElement options={{ hidePostalCode: true }} />
					</div>
					{errors.card && <p className="text-red-500 text-xs mt-2 mb-2">{errors.card}</p>}
					<div className="border border-gray-300 p-4 rounded-lg shadow-sm mb-4 bg-white">
						<h3 className="text-gray-600 text-sm font-bold mb-2">Payment Summary</h3>
						<p className="text-gray-600">Plan: {selectedPlan ? selectedPlan.name : "None"}</p>
						<p className="text-gray-600">Price: {selectedPlan ? selectedPlan.price : "$0.00"}</p>
						<p className="text-gray-600">Taxes: $0.00</p>
						<p className="text-gray-600 font-bold">Total: {selectedPlan ? selectedPlan.price : "$0.00"}</p>
					</div>
					<div className="text-right">
						<button
							type="submit"
							disabled={!stripe}
							className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
						>
							Pay Now
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Payment;
