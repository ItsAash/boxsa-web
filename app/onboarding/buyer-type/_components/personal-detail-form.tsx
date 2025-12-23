"use client";

export default function PersonalDetailsForm() {
  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-5 pt-4">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <span className="h-8 w-1.5 rounded-full bg-primary" />
        <h4 className="font-semibold text-lg text-text-main dark:text-white">
          Personal Details
        </h4>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-text-main dark:text-gray-200">
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            className="mt-1 w-full h-11 rounded-xl
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-black/20
              px-4 text-sm
              text-text-main dark:text-white
              placeholder:text-text-secondary dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-text-main dark:text-gray-200">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g. +977 98XXXXXXXX"
            className="mt-1 w-full h-11 rounded-xl
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-black/20
              px-4 text-sm
              text-text-main dark:text-white
              placeholder:text-text-secondary dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* Household Size */}
        <div>
          <label className="block text-sm font-semibold text-text-main dark:text-gray-200">
            Household Size
          </label>
          <select
            className="mt-1 w-full h-11 rounded-xl
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-black/20
              px-4 text-sm
              text-text-main dark:text-white
              focus:outline-none focus:ring-2 focus:ring-primary transition"
          >
            <option>1–2 People</option>
            <option>3–4 People</option>
            <option>5–6 People</option>
            <option>7+ People</option>
          </select>
        </div>

        
      </div>
    </div>
  );
}