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
        {/* Nickname */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-text-main dark:text-gray-200">
            Nickname
          </label>
          <input
            type="text"
            placeholder="e.g. John"
            className="mt-1 w-full h-11 rounded-xl
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-black/20
              px-4 text-sm
              text-text-main dark:text-white
              placeholder:text-text-secondary dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-text-main dark:text-gray-200">
            Gender
          </label>
          <select
            className="mt-1 w-full h-11 rounded-xl
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-black/20
              px-4 text-sm
              text-text-main dark:text-white
              focus:outline-none focus:ring-2 focus:ring-primary transition"
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-text-main dark:text-gray-200">
            Date of Birth
          </label>
          <input
            type="date"
            className="mt-1 w-full h-11 rounded-xl
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-black/20
              px-4 text-sm
              text-text-main dark:text-white
              focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
      </div>
    </div>
  );
}