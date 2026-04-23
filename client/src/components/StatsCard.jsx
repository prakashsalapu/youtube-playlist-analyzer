export default function StatsCard({ icon, label, value }) {
  return (
    <div className="relative group">

      {/* Glow Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 blur-lg group-hover:opacity-40 transition"></div>

      {/* Card */}
      <div className="relative bg-[#0b0613] border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xl shadow-lg transition duration-300 hover:scale-[1.03]">

        {/* Icon */}
        <div className="text-2xl mb-2 opacity-90">
          {icon}
        </div>

        {/* Value */}
        <h3 className="text-lg sm:text-xl font-semibold tracking-wide">
          {value}
        </h3>

        {/* Label */}
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          {label}
        </p>

      </div>
    </div>
  );
}