"use client";

import { useEffect, useState } from "react";

const themes = [
  { name: "light", label: "浅色" },
  { name: "dark", label: "深色" },
  { name: "cupcake", label: "梦幻" },
  { name: "bumblebee", label: "大黄蜂" },
  { name: "emerald", label: "翡翠" },
  { name: "corporate", label: "企业" },
  { name: "synthwave", label: "合成波" },
  { name: "retro", label: "复古" },
  { name: "cyberpunk", label: "赛博" },
  { name: "valentine", label: "情人节" },
  { name: "halloween", label: "万圣节" },
  { name: "garden", label: "花园" },
  { name: "forest", label: "森林" },
  { name: "aqua", label: "水蓝" },
  { name: "lofi", label: "Lo-Fi" },
  { name: "pastel", label: "粉彩" },
  { name: "fantasy", label: "幻想" },
  { name: "wireframe", label: "线框" },
  { name: "black", label: "纯黑" },
  { name: "luxury", label: "奢华" },
  { name: "dracula", label: "德古拉" },
  { name: "cmyk", label: "CMYK" },
  { name: "autumn", label: "秋意" },
  { name: "business", label: "商业" },
  { name: "acid", label: "迷幻" },
  { name: "lemonade", label: "柠檬" },
  { name: "night", label: "夜晚" },
  { name: "coffee", label: "咖啡" },
  { name: "winter", label: "冬日" },
  { name: "dim", label: "暗灰" },
  { name: "nord", label: "北欧" },
  { name: "sunset", label: "日落" },
  { name: "caramellatte", label: "焦糖拿铁" },
  { name: "abyss", label: "深渊" },
  { name: "silk", label: "丝绸" },
];

export default function ThemeGrid() {
  const [current, setCurrent] = useState("dark");

  useEffect(() => {
    setCurrent(localStorage.getItem("theme") || "dark");
  }, []);

  function select(name: string) {
    setCurrent(name);
    localStorage.setItem("theme", name);
    document.documentElement.setAttribute("data-theme", name);
    const checkbox = document.getElementById("theme-drawer") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }

  return (
    <div className="p-4 w-full">
      <h3 className="text-lg font-bold mb-4">选择主题</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => select(t.name)}
            className={`border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline-2 outline-offset-2 transition-all ${
              current === t.name ? "outline-base-content!" : "outline-transparent"
            }`}
          >
            {/* Inner div with scoped data-theme — this is the key pattern from official docs */}
            <div data-theme={t.name} className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
              <div className="grid grid-cols-5 grid-rows-3">
                <div className="bg-base-200 col-start-1 row-span-2 row-start-1" />
                <div className="bg-base-300 col-start-1 row-start-3" />
                <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
                  <div className="font-bold text-xs">{t.name}</div>
                  <div className="flex flex-wrap gap-1">
                    <div className="bg-primary flex aspect-square w-4 items-center justify-center rounded">
                      <div className="text-primary-content text-xs font-bold">A</div>
                    </div>
                    <div className="bg-secondary flex aspect-square w-4 items-center justify-center rounded">
                      <div className="text-secondary-content text-xs font-bold">A</div>
                    </div>
                    <div className="bg-accent flex aspect-square w-4 items-center justify-center rounded">
                      <div className="text-accent-content text-xs font-bold">A</div>
                    </div>
                    <div className="bg-neutral flex aspect-square w-4 items-center justify-center rounded">
                      <div className="text-neutral-content text-xs font-bold">A</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
