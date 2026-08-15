import { useState, useRef, useEffect } from "react";
import { FaPhoneAlt, FaAt, FaInfoCircle, FaPencilAlt, FaCamera, FaUser, FaArrowRight, FaEnvelope } from "react-icons/fa";

const ProfileDropdown = () => {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      name: "علی محمدی",
      phone: "+98 912 345 6789",
      username: "@ali_mohammadi",
      email: "ali@example.com",
      bio: "توسعه‌دهنده وب | عاشق تکنولوژی 🚀",
      image: null 
    };
  });

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    window.dispatchEvent(new Event("profileUpdate"));
  }, [profile]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
  };

  return (
    /* رنگ بک‌گراند اصلی به #020608 تغییر یافت و حاشیه ظریف‌تر شد */
    <div className="absolute top-full left-0 mt-4 w-72 bg-[#020608] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100] text-right" dir="rtl">
      
      {/* هدر دراپ‌دان - هماهنگ با تم تیره سایت */}
      <div className="flex justify-between items-center p-4 bg-white/5 border-b border-white/5">
        {isEditing ? (
          <button onClick={() => setIsEditing(false)} className="text-[#00f2ea] hover:bg-white/5 p-2 rounded-full transition-all">
            <FaArrowRight size={18} />
          </button>
        ) : (
          <div className="w-8"></div>
        )}
        <span className="text-white font-bold">{isEditing ? "ویرایش" : "اطلاعات"}</span>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-[#00f2ea] hover:bg-white/5 p-2 rounded-full transition-all">
            <FaPencilAlt size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center pt-6 pb-4 px-4">
        {/* بخش عکس - بک‌گراند دایره هماهنگ شد */}
        <div className="relative mb-4 group" onClick={() => isEditing && fileInputRef.current.click()}>
          <input type="file" ref={fileInputRef} onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setProfile({...profile, image: reader.result});
              reader.readAsDataURL(file);
            }
          }} className="hidden" accept="image/*" />
          
          <div className={`w-24 h-24 rounded-full border-2 ${isEditing ? 'border-[#00f2ea] cursor-pointer' : 'border-white/10'} flex items-center justify-center overflow-hidden bg-white/5 shadow-xl`}>
            {profile.image ? (
              <img src={profile.image} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-black text-[#00f2ea] uppercase">{getInitials(profile.name)}</span>
            )}
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                <FaCamera className="text-white" />
              </div>
            )}
          </div>
        </div>

        {/* نام کاربر */}
        <div className="text-center mb-6 w-full px-2">
          {isEditing ? (
            <input name="name" value={profile.name} onChange={handleChange} className="bg-white/5 text-white text-center border-b border-[#00f2ea] outline-none py-1 w-full rounded-t-md" placeholder="نام" />
          ) : (
            <h3 className="text-white text-lg font-bold">{profile.name}</h3>
          )}
          <p className="text-[#00f2ea] text-[11px] mt-1 font-medium">online</p>
        </div>

        {/* لیست اطلاعات */}
        <div className="w-full space-y-4">
          
          <div className="flex items-center gap-4 group">
            <FaPhoneAlt className="text-[#00f2ea]" size={16} />
            <div className="flex flex-col items-start border-b border-white/5 w-full pb-2">
              {isEditing ? (
                <input name="phone" value={profile.phone} onChange={handleChange} className="bg-transparent text-white text-sm outline-none w-full ltr text-right" />
              ) : (
                <span className="text-white text-sm ltr font-medium">{profile.phone}</span>
              )}
              <span className="text-gray-500 text-[10px]">موبایل</span>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <FaAt className="text-[#00f2ea]" size={16} />
            <div className="flex flex-col items-start border-b border-white/5 w-full pb-2">
              {isEditing ? (
                <input name="username" value={profile.username} onChange={handleChange} className="bg-transparent text-white text-sm outline-none w-full ltr text-right" />
              ) : (
                <span className="text-white text-sm ltr font-medium">{profile.username}</span>
              )}
              <span className="text-gray-500 text-[10px]">نام کاربری</span>
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center gap-4 animate-in fade-in duration-300">
              <FaEnvelope className="text-[#00f2ea]" size={16} />
              <div className="flex flex-col items-start border-b border-white/5 w-full pb-2">
                <input name="email" value={profile.email} onChange={handleChange} className="bg-transparent text-white text-sm outline-none w-full ltr text-right" placeholder="ایمیل را وارد کنید" />
                <span className="text-gray-500 text-[10px]">ایمیل</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 group">
            <FaInfoCircle className="text-[#00f2ea]" size={16} />
            <div className="flex flex-col items-start w-full pb-2">
              {isEditing ? (
                <textarea name="bio" value={profile.bio} onChange={handleChange} className="bg-white/5 text-white text-sm outline-none w-full resize-none border-b border-[#00f2ea] p-1" rows="2" />
              ) : (
                <p className="text-white text-xs leading-relaxed">{profile.bio}</p>
              )}
              <span className="text-gray-500 text-[10px]">بیو</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;