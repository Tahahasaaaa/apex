const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    orange: "bg-orange-500/10 text-orange-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    cyan: "bg-cyan-500/10 text-cyan-500",
  };

  return (
    <div className="bg-[#0d121d] border border-white/5 rounded-3xl p-6 flex items-center gap-4 shadow-lg">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-500 mb-1">{label}</p>
        <p className="text-xl font-black">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
