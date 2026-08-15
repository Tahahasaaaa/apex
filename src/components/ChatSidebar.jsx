import { MessageSquare, Plus, Trash2 } from "lucide-react";

const ChatSidebar = ({ sessions, activeSessionId, onNewChat, onSelectSession, onDeleteSession, isOpen }) => {
  return (
    <div className="py-3 space-y-1">
      <button
        type="button"
        onClick={onNewChat}
        className={`mb-3 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all ${
          isOpen ? "w-full px-4 py-3" : "mx-auto h-12 w-12"
        }`}
      >
        <Plus size={16} />
        {isOpen ? <span>گفتگوی جدید</span> : null}
      </button>

      {isOpen ? <p className="px-3 pb-2 text-[11px] text-gray-500">تاریخچه</p> : null}

      {sessions.length === 0 && isOpen ? (
        <p className="mt-6 px-3 text-center text-xs text-gray-600">گفتگویی ثبت نشده است.</p>
      ) : null}

      {sessions.map((session) => (
        <div
          key={session.id}
          onClick={() => onSelectSession(session.id)}
          className={`group flex items-center rounded-xl cursor-pointer transition-all ${
            isOpen ? "gap-2.5 px-3 py-2.5" : "mx-auto h-11 w-11 justify-center"
          } ${
            activeSessionId === session.id
              ? "bg-white/10 text-white border border-white/15"
              : "text-gray-400 border border-transparent hover:bg-white/5"
          }`}
          title={!isOpen ? session.title : undefined}
        >
          <MessageSquare size={14} />
          {isOpen ? <span className="flex-1 truncate text-sm">{session.title}</span> : null}
          {isOpen ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDeleteSession(session.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
              aria-label="حذف گفتگو"
            >
              <Trash2 size={13} />
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
