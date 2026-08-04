import { hashSeed, mulberry32 } from "@/lib/prng";
import { PersonaId } from "@/data/quiz";
import { DistributorClient } from "@/lib/distributorTypes";

const FIRST_NAMES = [
  "Arjun", "Priya", "Rohan", "Sneha", "Kabir", "Ananya", "Vikram", "Meera",
  "Aditya", "Ishaan", "Kavya", "Rahul", "Divya", "Nikhil", "Pooja", "Tanvi",
  "Arnav", "Simran", "Yash", "Ritika", "Karan", "Neha", "Varun", "Shreya",
  "Aman", "Isha", "Dev", "Ritu", "Sameer", "Anjali",
];
const LAST_NAMES = [
  "Mehta", "Nair", "Malhotra", "Iyer", "Singh", "Rao", "Kapoor", "Desai",
  "Bhatt", "Chawla", "Menon", "Reddy", "Joshi", "Sharma", "Verma", "Gupta",
];
const CITIES = [
  "Mumbai", "Pune", "Bengaluru", "Delhi", "Ahmedabad", "Hyderabad",
  "Chennai", "Kolkata", "Jaipur", "Nagpur",
];
const PERSONA_IDS: PersonaId[] = [
  "growth-seeker", "steady-accumulator", "capital-preserver", "income-focused",
];
const ACTIVITY_NOTES = [
  "Logged in twice this week, browsed the flexi cap factsheet.",
  "No app activity in over a month.",
  "Called the helpline about SIP date change.",
  "Redeemed a partial amount from the liquid fund.",
  "Added a new bank mandate last week.",
  "Viewed portfolio statement, no other action.",
  "Referred a colleague via the app.",
  "Increased SIP amount 3 months ago, stable since.",
];

const CLIENT_COUNT = 22;

export function generateClientBook(seed = "RAJESH-BOOK"): DistributorClient[] {
  const rand = mulberry32(hashSeed(seed));
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

  return Array.from({ length: CLIENT_COUNT }, (_, i) => {
    const sipRoll = rand();
    const sipStatus = sipRoll > 0.65 ? "active" : sipRoll > 0.35 ? "paused" : "none";
    const daysSinceLastContact = Math.floor(rand() * 180);
    const recentLogins7d = Math.floor(rand() * 8);
    const idleCashAmount = Math.round((rand() * 150000) / 500) * 500;
    const recentRedemptionFlag = rand() > 0.82;
    const aumValue = Math.round((30000 + rand() * 2200000) / 1000) * 1000;
    const joinedYear = 2019 + Math.floor(rand() * 6);

    return {
      id: `cl-${i + 1}`,
      name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
      city: pick(CITIES),
      aumValue,
      personaId: pick(PERSONA_IDS),
      joinedYear,
      sipStatus,
      daysSinceLastContact,
      recentLogins7d,
      idleCashAmount,
      recentRedemptionFlag,
      lastActivityNote: pick(ACTIVITY_NOTES),
    };
  });
}
