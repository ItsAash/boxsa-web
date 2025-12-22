"use client";

import { useState } from "react";
import { Home, Briefcase, Plus, MapPin } from "lucide-react";
import { CheckoutData } from "../page";

interface AddressStepProps {
  data: CheckoutData;
  onUpdate: (data: Partial<CheckoutData>) => void;
  onNext: () => void;
}

const SAVED_ADDRESSES = [
  {
    id: "home",
    type: "Home",
    icon: Home,
    name: "Ram Bahadur",
    street: "Kumari Marg, House No. 12",
    city: "Kathmandu, 44600",
    landmark: "Near the big Peepal tree",
    phone: "9841XXXXXX",
  },
  {
    id: "office",
    type: "Office",
    icon: Briefcase,
    name: "Ram Bahadur",
    street: "Boxsa Hub, Office 302",
    city: "Lalitpur, 44700",
    landmark: null,
    phone: "9841XXXXXX",
  },
];

export default function AddressStep({
  data,
  onUpdate,
  onNext,
}: AddressStepProps) {
  const [selectedAddress, setSelectedAddress] = useState(
    data.selectedAddressId || "home"
  );
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customAddress, setCustomAddress] = useState(
    data.customAddress || {
      fullName: "",
      mobile: "",
      city: "Kathmandu",
      area: "",
      street: "",
      landmark: "",
      saveAddress: false,
    }
  );

  const handleAddressSelect = (id: string) => {
    setSelectedAddress(id);
    setShowCustomForm(false);
    onUpdate({ selectedAddressId: id, customAddress: undefined });
  };

  const handleCustomAddressChange = (
    field: string,
    value: string | boolean
  ) => {
    const updated = { ...customAddress, [field]: value };
    setCustomAddress(updated);
    onUpdate({ customAddress: updated, selectedAddressId: undefined });
  };

  return (
    <section className="bg-white dark:bg-[#1A2C23] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
        <h2 className="text-xl font-bold flex items-center gap-3 text-[#111814] dark:text-white">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2bee79] text-[#0f1c15] text-sm font-bold shadow-sm">
            1
          </span>
          Delivery Address
        </h2>
        <button
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="text-[#2bee79] text-sm font-bold hover:text-[#1fce65] transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Saved Addresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAVED_ADDRESSES.map((address) => {
            const Icon = address.icon;
            const isSelected = selectedAddress === address.id;

            return (
              <label key={address.id} className="relative group cursor-pointer">
                <input
                  type="radio"
                  name="saved_address"
                  value={address.id}
                  checked={isSelected}
                  onChange={() => handleAddressSelect(address.id)}
                  className="peer sr-only"
                />
                <div
                  className={`h-full p-5 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-[#2bee79] bg-[#2bee79]/5 dark:bg-[#2bee79]/10 shadow-sm"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`w-5 h-5 ${
                          isSelected ? "text-[#2bee79]" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`font-bold ${
                          isSelected
                            ? "text-[#111814] dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {address.type}
                      </span>
                    </div>

                    {/* Radio Button */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-[#2bee79]"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2bee79]" />
                      )}
                    </div>
                  </div>

                  <p className="font-medium text-[#111814] dark:text-white mb-1">
                    {address.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {address.street}
                    <br />
                    {address.city}
                    {address.landmark && (
                      <>
                        <br />
                        <span className="text-gray-500 text-xs mt-1 block">
                          {address.landmark}
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-sm font-medium mt-3 text-gray-700 dark:text-gray-200">
                    {address.phone}
                  </p>
                </div>
              </label>
            );
          })}

          {/* Add New Button */}
          <button
            onClick={() => setShowCustomForm(true)}
            className="h-full min-h-[180px] p-5 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-[#2bee79]/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-[#2bee79] group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-[#2bee79]/10 transition-colors">
              <Plus className="w-6 h-6 group-hover:text-[#2bee79]" />
            </div>
            <span className="font-medium">Add New Address</span>
          </button>
        </div>

        {/* Custom Address Form */}
        {showCustomForm && (
          <>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-medium">
                Or enter new details
              </span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
            </div>

            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 border border-gray-100 dark:border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex flex-col">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                    Full Name
                  </span>
                  <input
                    type="text"
                    value={customAddress.fullName}
                    onChange={(e) =>
                      handleCustomAddressChange("fullName", e.target.value)
                    }
                    className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 placeholder:text-gray-400 dark:text-white shadow-sm"
                    placeholder="Ram Bahadur"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                    Mobile Number
                  </span>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-500 font-medium z-10 text-sm">
                      +977
                    </span>
                    <input
                      type="tel"
                      value={customAddress.mobile}
                      onChange={(e) =>
                        handleCustomAddressChange("mobile", e.target.value)
                      }
                      className="form-input flex w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-1 focus:ring-[#2bee79] h-11 pl-14 pr-4 placeholder:text-gray-400 dark:text-white shadow-sm"
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                    City / District
                  </span>
                  <select
                    value={customAddress.city}
                    onChange={(e) =>
                      handleCustomAddressChange("city", e.target.value)
                    }
                    className="form-select w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 text-gray-700 dark:text-white shadow-sm cursor-pointer"
                  >
                    <option>Kathmandu</option>
                    <option>Lalitpur</option>
                    <option>Bhaktapur</option>
                    <option>Pokhara</option>
                    <option>Chitwan</option>
                  </select>
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                    Area / Tole
                  </span>
                  <input
                    type="text"
                    value={customAddress.area}
                    onChange={(e) =>
                      handleCustomAddressChange("area", e.target.value)
                    }
                    className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 placeholder:text-gray-400 dark:text-white shadow-sm"
                    placeholder="e.g. Baluwatar"
                  />
                </label>

                <label className="flex flex-col md:col-span-2">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                    Street Address
                  </span>
                  <input
                    type="text"
                    value={customAddress.street}
                    onChange={(e) =>
                      handleCustomAddressChange("street", e.target.value)
                    }
                    className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 placeholder:text-gray-400 dark:text-white shadow-sm"
                    placeholder="e.g. Kumari Marg, House No. 12"
                  />
                </label>

                <label className="flex flex-col md:col-span-2">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Landmark (Optional)
                  </span>
                  <input
                    type="text"
                    value={customAddress.landmark}
                    onChange={(e) =>
                      handleCustomAddressChange("landmark", e.target.value)
                    }
                    className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 placeholder:text-gray-400 dark:text-white shadow-sm"
                    placeholder="Near the big Peepal tree"
                  />
                </label>

                <div className="md:col-span-2 pt-2">
                  <label className="inline-flex items-center gap-3 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      checked={customAddress.saveAddress}
                      onChange={(e) =>
                        handleCustomAddressChange(
                          "saveAddress",
                          e.target.checked
                        )
                      }
                      className="form-checkbox w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-[#2bee79] focus:ring-[#2bee79] bg-white dark:bg-black/20 transition-all cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#111814] dark:group-hover:text-white transition-colors">
                      Save this address for future use
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
