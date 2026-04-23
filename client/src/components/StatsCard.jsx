export default function StatsCard({ icon, label, value }) {
  return (
    <div className="bg-white/20 p-4 rounded-xl text-center">
      <div className="text-xl">{icon}</div>
      <p className="font-bold">{value}</p>
      <span className="text-xs">{label}</span>
    </div>
  );
}