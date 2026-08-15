const GoalCard = ({ icon, title, desc, activeColor, iconBg, isHighlighted }) => (
  <div
    className={`p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer group flex flex-col items-center text-center
    ${isHighlighted ? "bg-green-500/5 border-green-500/40" : "bg-[#0d121d]/40 border-white/5"}
    ${activeColor}`}
  >
    <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-2xl text-white shadow-lg transition-transform group-hover:scale-110 ${iconBg}`}>
      {icon}
    </div>

    <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default GoalCard;
