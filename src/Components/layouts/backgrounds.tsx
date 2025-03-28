import Portal from "@/Portal";

export default function WavyBg() {
  return (
    <Portal>
      <svg
        id="visual"
        viewBox="0 0 5120 1440"
        width="5120"
        height="1440"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        preserveAspectRatio="xMidYMid slice"
        className="w-full bottom-0 fixed -z-50">
        <rect x="0" y="0" width="5120" height="1440" className="fill-none" />
        <path
          d="M0 1161L213.3 1171.5C426.7 1182 853.3 1203 1280 1183.2C1706.7 1163.3 2133.3 1102.7 2560 1079.2C2986.7 1055.7 3413.3 1069.3 3840 1066.5C4266.7 1063.7 4693.3 1044.3 4906.7 1034.7L5120 1025L5120 1441L4906.7 1441C4693.3 1441 4266.7 1441 3840 1441C3413.3 1441 2986.7 1441 2560 1441C2133.3 1441 1706.7 1441 1280 1441C853.3 1441 426.7 1441 213.3 1441L0 1441Z"
          className="fill-primary opacity-20"
        />
        <path
          d="M0 1203L213.3 1223.7C426.7 1244.3 853.3 1285.7 1280 1280.5C1706.7 1275.3 2133.3 1223.7 2560 1223.3C2986.7 1223 3413.3 1274 3840 1277.8C4266.7 1281.7 4693.3 1238.3 4906.7 1216.7L5120 1195L5120 1441L4906.7 1441C4693.3 1441 4266.7 1441 3840 1441C3413.3 1441 2986.7 1441 2560 1441C2133.3 1441 1706.7 1441 1280 1441C853.3 1441 426.7 1441 213.3 1441L0 1441Z"
          className="fill-primary opacity-40"
        />
        <path
          d="M0 1356L213.3 1347.7C426.7 1339.3 853.3 1322.7 1280 1325.5C1706.7 1328.3 2133.3 1350.7 2560 1361.2C2986.7 1371.7 3413.3 1370.3 3840 1380.5C4266.7 1390.7 4693.3 1412.3 4906.7 1423.2L5120 1434L5120 1441L4906.7 1441C4693.3 1441 4266.7 1441 3840 1441C3413.3 1441 2986.7 1441 2560 1441C2133.3 1441 1706.7 1441 1280 1441C853.3 1441 426.7 1441 213.3 1441L0 1441Z"
          className="fill-primary opacity-80"
        />
      </svg>
    </Portal>
  );
}
