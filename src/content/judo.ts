import { experiences } from "@/content/career.json";

export const fullTimeJudoExperience = experiences.find(
  (experience) => experience.title === "Full-time Judo Athlete",
)!;

export const judoProfile = {
  startedAge: 6,
  status: "Irish international judoka",
  nation: "Ireland",
  squad: "Irish national squad",
  weightClass: "+100 kg",
  summary:
    "I started judo at six and represent Ireland in the senior +100 kg category. After graduating in 2024, I focused on full-time judo before returning to software engineering in 2026.",
  links: {
    ijf: "https://www.ijf.org/judoka/45746",
    judoInside:
      "https://judoinside.com/judoka/118100/Kevinas_Ramoska/judo-career",
  },
  milestones: [
    {
      period: "Age 6",
      title: "The journey begins",
      description:
        "Started learning judo and began building the discipline, composure, and consistency that still shape how I train and work today.",
      accent: "emerald",
    },
    {
      period: "2018–2019",
      title: "Cadet and junior breakthrough",
      description:
        "Won Irish Open U18, All Irish U18 and U21 titles, and the Matsumae Cup Vejle U18 while gaining European Cadet Cup experience.",
      accent: "amber",
    },
    {
      period: "2022",
      title: "Senior competition",
      description:
        "Won the Northern Ireland Open and London Open Seniors, alongside a Northern Ireland Open U21 title.",
      accent: "amber",
    },
    {
      period: "2023",
      title: "Irish senior champion",
      description:
        "Won the All Irish Senior Championships and took silver at the Welsh Senior Open, with bronze results in Denmark and Scotland.",
      accent: "amber",
    },
    {
      period: "2024",
      title: "European Cup top-seven finishes",
      description:
        "Placed seventh at both the Podčetrtek and Malaga Senior European Cups while representing Ireland at +100 kg.",
      accent: "blue",
    },
    {
      period: "2025",
      title: "European senior circuit",
      description:
        "Competed for Ireland at the Dubrovnik Senior European Cup in Croatia in the +100 kg category.",
      accent: "blue",
    },
    {
      period: fullTimeJudoExperience.period,
      title: "Full-time athlete after graduation",
      description: fullTimeJudoExperience.highlights[0],
      accent: "green",
    },
  ],
} as const;
