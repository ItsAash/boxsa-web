export default function BusinessDetailsForm() {
  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-5 pt-4">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <span className="h-8 w-1.5 rounded-full bg-primary" />
        <h4 className="font-semibold text-lg text-text-main dark:text-white">
          Business Details
        </h4>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Business Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-text-main dark:text-gray-200">
            Business Legal Name
          </label>
          <input
            placeholder="e.g. Acme Corp Ltd."
            className="mt-1 w-full h-11 rounded-xl
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-black/20
              px-4 text-sm
              text-text-main dark:text-white
              placeholder:text-text-secondary dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-sm font-semibold text-text-main dark:text-gray-200">
            Business Type
          </label>
          <select
            className="mt-1 w-full h-11 rounded-xl
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-black/20
              px-4 text-sm
              text-text-main dark:text-white
              focus:outline-none focus:ring-2 focus:ring-primary transition"
          >
            <option value="">Select industry</option>
            <option>Retail / Shop</option>
            <option>Restaurant / Cafe</option>
            <option>Corporate Office</option>
            <option>Reseller</option>
            <option>Other</option>
          </select>
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-sm font-semibold text-text-main dark:text-gray-200">
            Company Size
          </label>
          <select
            className="mt-1 w-full h-11 rounded-xl
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-black/20
              px-4 text-sm
              text-text-main dark:text-white
              focus:outline-none focus:ring-2 focus:ring-primary transition"
          >
            <option>1–10 Employees</option>
            <option>11–50 Employees</option>
            <option>51–200 Employees</option>
            <option>200+ Employees</option>
          </select>
        </div>
      </div>
    </div>
  );
}
