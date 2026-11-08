/* eslint-disable react-hooks/set-state-in-effect */
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";

import { Check, Crown, Minus, ShieldCheck, BadgeCheck } from "lucide-react";

const comparison = [
  { label: "Unlimited Messaging", regular: false, premium: true },
  { label: "Premium Badge", regular: false, premium: true },
  { label: "Priority Visibility", regular: false, premium: true },
  { label: "Better Networking", regular: false, premium: true },
  { label: "Developer Discovery", regular: true, premium: true },
  { label: "Connection Requests", regular: true, premium: true },
];

function PlanRow({ label, included }) {
  return (
    <li className="flex items-center gap-3 py-2.5 text-sm">
      {included ? (
        <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
      ) : (
        <Minus
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      )}
      <span
        className={
          included ? "text-body" : "text-muted-foreground line-through"
        }
      >
        {label}
      </span>
    </li>
  );
}

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const VerifyPremiumUser = async () => {
    try {
      const response = await axiosInstance.get(`/premium/verify`);

      console.log(response.data.PremiumStatus);
      setIsUserPremium(response.data.PremiumStatus);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    VerifyPremiumUser();
  }, []);

  const handlePayment = async (membershipType) => {
    try {
      const paymentResponse = await axiosInstance.post(`$/payment/create`, {
        membershipType,
      });
      console.log(paymentResponse.data.payment);

      const order = paymentResponse.data.payment;

      const { amount, currency, orderId, notes } = order;

      const options = {
        key: order.keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: "Tech DevTinder",
        description: "Test Transaction for the Tech DevTinder Application",
        order_id: orderId, // This is the order_id created in the backend

        prefill: {
          name: notes.firstName + "" + notes.lastName,
          email: notes.gmail,
          contact: notes.contact,
        },
        theme: {
          color: "#F37254",
        },
        handler: VerifyPremiumUser(),
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };
  return isUserPremium ? (
    /* Active Premium membership */
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <article className="relative w-full overflow-hidden rounded-3xl border border-[#4F8CFF]/25 bg-[#121826] p-7 text-center shadow-[0_0_40px_rgba(79,140,255,0.08)] sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-[#7C5CFC]/10 blur-3xl"
          />

          <div className="relative">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-[#7C5CFC]/25 bg-linear-to-br from-[#4F8CFF]/15 to-[#7C5CFC]/20">
              <Crown className="size-8 text-[#A78BFA]" aria-hidden="true" />
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#2DD4BF]/20 bg-[#2DD4BF]/10 px-3 py-1.5 text-xs font-medium text-[#2DD4BF]">
              <BadgeCheck className="size-4" aria-hidden="true" />
              Premium Membership Active
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">
              You're already Premium!
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#94A3B8] sm:text-base">
              Your membership is active. Keep growing your developer network and
              starting meaningful conversations on TechDevTinder.
            </p>

            <div className="mx-auto mt-7 grid max-w-md gap-3 text-left sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-[#1B2436] p-3.5">
                <Check className="size-5 shrink-0 text-[#4F8CFF]" />
                <span className="text-sm text-[#CBD5E1]">Direct messaging</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/6#1B2436] p-3.5">
                <ShieldCheck className="size-5 shrink-0 text-[#2DD4BF]" />
                <span className="text-sm text-[#CBD5E1]">Premium status</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-[#64748B]">
              Thank you for being part of TechDevTinder.
            </p>
          </div>
        </article>
      </div>
    </section>
  ) : (
    /* Membership plans */
    <section className="mt-8 w-full px-4 py-6 sm:px-6 lg:px-8 overflow-y-scroll">
      <div className="mx-auto max-w-4xl">
        {/* Page heading */}
        <header className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFC]/25 bg-[#7C5CFC]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
            <Crown className="size-3.5" aria-hidden="true" />
            TechDevTinder Premium
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-2xl lg:text-3xl">
            Network without limits
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#94A3B8] sm:text-base">
            Start free, upgrade when you're ready to connect and communicate
            with more developers.
          </p>
        </header>

        {/* Pricing cards */}
        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
          {/* Regular plan */}
          <article className="flex h-full flex-col rounded-2xl border border-white/8 bg-[#121826] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/16 hover:bg-[#151D2D] sm:p-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                Get started
              </span>

              <h2 className="mt-2 text-xl font-bold text-[#F8FAFC]">Regular</h2>

              <p className="mt-1.5 text-sm leading-5 text-[#94A3B8]">
                Build your developer network at your own pace.
              </p>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-[#F8FAFC]">
                  ₹0
                </span>
                <span className="text-sm text-[#94A3B8]">/ forever</span>
              </div>
            </div>

            <div className="my-5 border-t border-white/8" />

            <p className="text-sm font-semibold text-[#CBD5E1]">
              What's included
            </p>

            <ul className="mt-2 flex-1">
              {comparison.map((item) => (
                <PlanRow
                  key={item.label}
                  label={item.label}
                  included={item.regular}
                />
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <div className="rounded-xl border border-white/6 bg-[#1B2436]/60 px-4 py-3 text-center text-sm text-[#94A3B8]">
                Free membership
              </div>
            </div>
          </article>

          {/* Premium plan */}
          <article className="group relative flex h-full flex-col rounded-2xl border border-[#4F8CFF]/40 bg-[#121826] p-5 shadow-[0_0_30px_rgba(79,140,255,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#7C5CFC]/70 hover:shadow-[0_0_40px_rgba(124,92,252,0.14)] sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-t-2xl bg-linear-to-b from-[#4F8CFF]/8 to-transparent"
            />

            <span className="absolute -top-3 right-5 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-[#4F8CFF] to-[#7C5CFC] px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-[#4F8CFF]/20 transition-transform duration-300 group-hover:scale-105 sm:right-6">
              <Crown className="size-3.5" aria-hidden="true" />
              Most popular
            </span>

            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A78BFA]">
                For serious networkers
              </span>

              <h2 className="mt-2 text-xl font-bold text-[#F8FAFC]">Premium</h2>

              <p className="mt-1.5 text-sm leading-5 text-[#94A3B8]">
                Unlock more ways to connect with developers.
              </p>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-[#F8FAFC]">
                  ₹499
                </span>
                <span className="text-sm text-[#94A3B8]">/ month</span>
              </div>
            </div>

            <div className="my-5 border-t border-white/8" />

            <p className="text-sm font-semibold text-[#CBD5E1]">
              Everything in Regular, plus
            </p>

            <ul className="mt-2 flex-1">
              {comparison.map((item) => (
                <PlanRow
                  key={item.label}
                  label={item.label}
                  included={item.premium}
                />
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={() => handlePayment("silver")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#4F8CFF] to-[#7C5CFC] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(79,140,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(124,92,252,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121826] active:translate-y-0"
              >
                <Crown className="size-4" aria-hidden="true" />
                Upgrade to Premium
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#94A3B8]">
                <ShieldCheck
                  className="size-3.5 text-[#2DD4BF]"
                  aria-hidden="true"
                />
                Secure checkout powered by Razorpay
              </p>
            </div>
          </article>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-[#64748B]">
          Choose the membership that works for you. You can continue using the
          free plan without upgrading.
        </p>
      </div>
    </section>
  );
};

export default Premium;
