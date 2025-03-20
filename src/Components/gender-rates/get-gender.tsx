import { cn } from "../../lib/utils";

export const getGenderRate = (rate: number) => {
  let male = "";
  let female = "";
  const maleColor = "text-sky-500";
  const femaleColor = "text-pink-500";

  switch (rate) {
    case -1:
      return <span className="text-gray-500">Genderless</span>;

    case 0:
      male = "100% male";
      break;
    case 1:
      female = "12.5% female";
      male = "87.5% male";
      break;
    case 2:
      female = "25% female";
      male = "75% male";
      break;
    case 4:
      female = "50% female";
      male = "50% male";
      break;
    case 6:
      female = "75% female";
      male = "25% male";
      break;
    case 7:
      female = "87.5% female";
      male = "12.5% male";
      break;
    case 8:
      female = "100% female";
      break;
    default:
      return <span className="text-gray-500">Unknown gender rate</span>;
  }

  return (
    <span>
      {female && <span className={cn(femaleColor)}>{female}</span>}
      {female && male && ", "}
      {male && <span className={cn(maleColor)}>{male}</span>}
    </span>
  );
};
