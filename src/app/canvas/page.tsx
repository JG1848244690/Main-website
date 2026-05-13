import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canvas 实验室 - kskbl",
  description: "Canvas 技术学习与实验",
};

export default function CanvasPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <canvas
        id="canvas"
        width={800}
        height={600}
        className="bg-white rounded-box shadow-lg"
      />
      {/* <div className="mockup-phone  border-[#ff8938]">
        <div className="mockup-phone-camera"></div>
        <div className="mockup-phone-display">
          <img alt="wallpaper" src="https://img.daisyui.com/images/stock/453966.webp" />
        </div>
      </div> */}
    </div>
  );
}
