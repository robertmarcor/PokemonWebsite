import { EvolutionDetail } from "@/models/Evolution";

export const getEvolutionTriggerText = (details: EvolutionDetail) => {
  let triggerText = "";

  // prettier-ignore
  switch (details.trigger.name) {
    case "level-up": triggerText = "Level up"; break;
    case "trade": triggerText = "Trade"; break;
    case "use-item": triggerText = "Use item"; break;
    case "shed": triggerText = "Level up with empty slot in party"; break;
    case "spin": triggerText = "Level up while spinning"; break;
    case "tower-of-darkness": triggerText = "Train in the Tower of Darkness"; break;
    case "tower-of-waters": triggerText = "Train in the Tower of Waters"; break;
    case "three-critical-hits": triggerText = "Land three critical hits in a single battle"; break;
    case "take-damage": triggerText = "Take damage"; break;
    case "other": triggerText = "Special evolution method"; break;
    case "agile-style-move": triggerText = "Use Agile Style moves"; break;
    case "strong-style-move": triggerText = "Use Strong Style moves"; break;
    case "recoil-damage": triggerText = "Take recoil damage"; break;
    default: triggerText = "Unknown evolution method"; break;
  }
  return triggerText;
};

export const getEvolutionDetails = (details: EvolutionDetail) => {
  const additionalDetails: { text: string; icon?: string }[] = [{ text: "" }];

  if (details.gender !== null)
    additionalDetails.push({
      text: `Pokémon must be ${details.gender === 1 ? "female" : "male"}`,
    });

  if (details.held_item !== null)
    additionalDetails.push({
      text: `while holding ${details.held_item.name}`,
      icon: `${details.held_item.name}.png`,
    });

  if (details.item !== null)
    additionalDetails.push({
      text: `${details.item.name}`,
      icon: `${details.item.name}.png`,
    });

  if (details.known_move !== null)
    additionalDetails.push({
      text: `knowing move ${details.known_move.name}`,
    });

  if (details.known_move_type !== null)
    additionalDetails.push({
      text: `knowing a ${details.known_move_type.name}-type move`,
    });

  if (details.location !== null)
    additionalDetails.push({
      text: `at ${details.location.name}`,
    });

  if (details.min_affection !== null)
    additionalDetails.push({
      text: `with ${details.min_affection}+ affection`,
    });

  if (details.min_beauty !== null)
    additionalDetails.push({
      text: `with ${details.min_beauty}+ beauty`,
    });

  if (details.min_happiness !== null)
    additionalDetails.push({
      text: `with ${details.min_happiness}+ happiness 💞`,
    });

  if (details.min_level !== null)
    additionalDetails.push({
      text: `LVL ${details.min_level}`,
      icon: `/rare-candy.png`,
    });

  if (details.needs_overworld_rain === true)
    additionalDetails.push({
      text: `while raining in the overworld`,
    });

  if (details.party_species !== null)
    additionalDetails.push({
      text: `with ${details.party_species.name} in party`,
    });

  if (details.party_type !== null)
    additionalDetails.push({
      text: `with a ${details.party_type.name}-type Pokémon in party`,
    });

  if (details.relative_physical_stats !== null) {
    if (details.relative_physical_stats === 0) {
      additionalDetails.push({
        text: `with Attack = Defense ⚖️`,
      });
    } else if (details.relative_physical_stats === 1) {
      additionalDetails.push({
        text: `with Attack > Defense ⚔️`,
      });
    } else if (details.relative_physical_stats === -1) {
      additionalDetails.push({
        text: `with Defence > Attack 🛡️`,
      });
    }
  }

  if (details.time_of_day !== "" && details.time_of_day !== null) {
    let time = "";
    switch (details.time_of_day) {
      case "day":
        time = "Day ☀️";
        break;
      case "dusk":
        time = "Dusk 🌇";
        break;
      case "night":
        time = "Night 🌃";
        break;
    }
    additionalDetails.push({ text: `during ${time}` });
  }

  if (details.trade_species !== null) {
    additionalDetails.push({
      text: `in exchange for ${details.trade_species.name}`,
      icon: `${details.trade_species.name}.png`,
    });
  }

  return additionalDetails;
};
