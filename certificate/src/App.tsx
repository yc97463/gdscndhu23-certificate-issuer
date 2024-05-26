import { useState } from "react";
import createSVGs from "./createSVG";
function App() {
  const [attendee, setAttendee] = useState("系所 學號 姓名");
  const [event, setEvent] = useState("__活動名稱__");
  const [type, setType] = useState("TechTalk" as "InfoSession" | "TechTalk" | "Workshop" | "Career" | "Hackathon" | "DemoDay");
  const [slug, setSlug] = useState("__EnglishSlug__");
  let today = new Date().toLocaleDateString("zh-TW", { year: 'numeric', month: '2-digit', day: '2-digit' });
  console.log(today.replace(/\//g, "-"));
  const [date, setDate] = useState(today.replace(/\//g, "-"));
  const [time, setTime] = useState("00:00-00:00");
  const [place, setPlace] = useState("__活動地點__");
  const [hours, setHours] = useState("1");
  const [url, setUrl] = useState("https://gdsc.community.dev/xxXxXXx");
  const [realm, setRealm] = useState("多元進取" as "多元進取" | "專業成長" | "服務奉獻");
  const [issuer, setIssuer] = useState("油成 YC");

  const svgs = createSVGs({ attendee, event, type, slug, date, time, place, hours, url, realm, issuer });

  function clearForm() {
    setAttendee("系所 學號 姓名");
    setEvent("__活動名稱__");
    setSlug("__EnglishSlug__");
    setDate(today.replace(/\//g, "-"));
    setTime("00:00-00:00");
    setPlace("__活動地點__");
    setHours("1");
    setUrl("https://gdsc.community.dev/xxXxXXx");
    setRealm("多元進取");
  }

  async function downloadPDF() {
    let tempTitle = document.title;
    document.title = `GDSCNDHU 時數證明 - ${date} ${event}`;
    window.print();
    document.title = tempTitle;
  }
  return (
    <div className="flex w-screen">
      <div className="w-[400px] p-4 flex flex-col gap-1 border-r border-slate-100 print:hidden sticky top-0 h-screen shrink-0">
        <div className="text-2xl font-bold">Google DSC 參加時數證明產生器</div>
        <div className="mb-2 text-slate-400">v1.0.2</div>

        <div className="overflow-auto">
          <label
            htmlFor="event"
            className="block text-slate-900 font-semibold mt-2"
          >
            活動名稱
          </label>
          <input
            value={event}
            id="event"
            onChange={(e) => setEvent(e.target.value)}
            className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
          />

          <label
            htmlFor="place"
            className="block text-slate-900 font-semibold mt-2"
          >
            活動頁面網址
          </label>
          <input
            value={url}
            id="url"
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
          />

          <label
            htmlFor="type"
            className="block text-slate-900 font-semibold mt-2"
          >
            活動類型
          </label>
          {/* <select
            className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
          >
            <option value="TechTalk">技術短講</option>
            <option value="Workshop">工作坊</option>
            <option value="Career">企業參訪 / 招募</option>
          </select> */}
          <select value={type} onChange={(e) => setType(e.target.value as "TechTalk" as "InfoSession" | "TechTalk" | "Workshop" | "Career" | "Hackathon" | "DemoDay")} className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out">
            <option value="InfoSession">資訊說明會</option>
            <option value="TechTalk">技術短講</option>
            <option value="Workshop">工作坊</option>
            <option value="Career">企業參訪 / 招募</option>
            <option value="Hackathon">黑客松</option>
            <option value="DemoDay">成果展示</option>
          </select>

          <label
            htmlFor="num"
            className="block text-slate-900 font-semibold mt-2"
          >
            活動英文代稱
          </label>
          <input
            value={slug}
            id="slug"
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
          />

          {/* put date on the left, time on the right */}
          <div className="flex gap-2">
            <div>
              <label
                htmlFor="date"
                className="block text-slate-900 font-semibold mt-2"
              >
                活動日期
              </label>
              <input
                type="date"
                value={date}
                id="date"
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-slate-900 font-semibold mt-2"
              >
                活動時間
              </label>
              <input
                // type="time"
                value={time}
                id="time"
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div>
              <label
                htmlFor="realm"
                className="block text-slate-900 font-semibold mt-2"
              >
                時數類別
              </label>
              <select value={realm} onChange={(e) => setRealm(e.target.value as "多元進取" | "專業成長" | "服務奉獻")} className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out">
                <option value="多元進取">多元進取</option>
                <option value="專業成長">專業成長</option>
                <option value="服務奉獻">服務奉獻</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="hours"
                className="block text-slate-900 font-semibold mt-2"
              >
                核發時數
              </label>
              <input
                type="number"
                value={hours}
                id="hours"
                onChange={(e) => setHours(e.target.value)}
                className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>


          <label
            htmlFor="place"
            className="block text-slate-900 font-semibold mt-2"
          >
            活動地點
          </label>
          <input
            value={place}
            id="place"
            onChange={(e) => setPlace(e.target.value)}
            className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
          />

          <label
            htmlFor="text"
            className="block text-slate-900 font-semibold mt-2"
          >
            與會者名單
          </label>
          {/* description */}
          <p className="text-slate-400 text-sm">
            請輸入與會者名單，每行一人。
            格式：系所 學號 姓名。
          </p>
          <textarea
            value={attendee}
            id="text"
            onChange={(e) => setAttendee(e.target.value)}
            placeholder="Type something..."
            className="w-full h-80 p-2 bg-slate-50 border-2 border-slate-300 rounded-md resize-none focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
          />

          <label
            htmlFor="issuer"
            className="block text-slate-900 font-semibold mt-2"
          >
            簽發者
          </label>
          <input
            value={issuer}
            id="issuer"
            onChange={(e) => setIssuer(e.target.value)}
            className="w-full p-2 bg-slate-50 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="grow" />
        <button
          onClick={() => clearForm()}
          className="p-2 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200 font-bold transition-colors duration-200 ease-in-out shadow-sm mb-2"
        >
          清除填入
        </button>
        <button
          onClick={() => downloadPDF()}
          className="p-2 bg-slate-500 text-slate-100 rounded-md hover:bg-slate-600 font-bold transition-colors duration-200 ease-in-out shadow-sm"
        >
          列印
        </button>
      </div>
      <div className="flex flex-col gap-4 lg:items-center w-full bg-slate-50 p-4 print:bg-transparent print:p-0 print:gap-0 overflow-x-auto">
        {svgs.map((svg, i) => (
          <div
            dangerouslySetInnerHTML={{ __html: svg.outerHTML }}
            style={{
              aspectRatio: "595.44/841.68",
              backgroundColor: "white",
            }}
            className="shadow-md w-full min-w-[400px] border border-slate-200 print:border-0"
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default App;