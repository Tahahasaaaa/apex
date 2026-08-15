const TaskItem = ({ task, onToggle }) => {
  const done = typeof task.done === "boolean" ? task.done : Boolean(task.is_completed);
  const category =
    task.cat ||
    (task.related_goal ? `هدف ${task.related_goal}` : task.difficulty_rating ? `سختی ${task.difficulty_rating}` : "عمومی");
  const time =
    task.time ||
    (Number.isFinite(task.duration_minutes)
      ? `${task.duration_minutes} دقیقه`
      : task.start_time
        ? `ساعت ${task.start_time}`
        : "بدون زمان");

  const categoryClass =
    category === "تحصیلی"
      ? "bg-blue-500/10 text-blue-400"
      : category === "ورزش"
        ? "bg-emerald-500/10 text-emerald-400"
        : category === "توسعه فردی"
          ? "bg-pink-500/10 text-pink-400"
          : "bg-purple-500/10 text-purple-400";

  return (
    <div
      onClick={() => onToggle(task.id)}
      className={`flex justify-between items-center p-5 rounded-2xl border transition-all cursor-pointer group
      ${done ? "bg-[#00f2ea]/5 border-[#00f2ea]/20" : "bg-[#121826] border-white/5 hover:border-white/10"}`}
    >
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${categoryClass}`}>
          {category}
        </span>
        <div>
          <p className={`text-sm font-bold ${done ? "text-gray-500 line-through" : "text-gray-200"}`}>
            {task.title}
          </p>
          <p className="text-[10px] text-gray-600 mt-1">{time}</p>
        </div>
      </div>
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
        ${done ? "bg-[#00f2ea] border-[#00f2ea]" : "border-gray-700 group-hover:border-gray-500"}`}
      >
        {done && <span className="text-black text-[10px]">✔</span>}
      </div>
    </div>
  );
};

export default TaskItem;
