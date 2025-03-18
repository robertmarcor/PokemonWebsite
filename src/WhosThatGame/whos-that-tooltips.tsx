import { memo } from "react";

export default memo(function WhosThatGameTooltips() {
  return (
    <div className="absolute left-0 bottom-0 text-xs opacity-50 text-start p-2 flex flex-col gap-3">
      <div>
        <span className="border-2 rounded-md border-slate-700 px-1 mr-1">Tab</span>
        <span>to skip</span>
      </div>
      <div>
        <span className="border-2 rounded-md border-slate-700 px-1 mr-1">Space</span>
        <span>to focus</span>
      </div>
      <div>
        <span className="border-2 rounded-md border-slate-700 px-1 mr-1">Enter</span>
        <span>to Submit</span>
      </div>
    </div>
  );
});
