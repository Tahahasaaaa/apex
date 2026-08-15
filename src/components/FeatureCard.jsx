const FeatureCard = ({ icon, title, desc, iconBg, hoverColor, isHighlighted }) => (
  <div
    className={`p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer group
    ${isHighlighted ? "bg-[#0d121d] border-[#ff7e42]/40 shadow-[0_0_30px_rgba(255,126,66,0.1)]" : "bg-[#0d121d]/40 border-white/5"}
    ${hoverColor}`}
  >
    <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center text-2xl text-white shadow-lg transition-transform group-hover:scale-110 ${iconBg}`}>
      {icon}
    </div>

    <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{desc}</p>
  </div>
);

export default FeatureCard;
