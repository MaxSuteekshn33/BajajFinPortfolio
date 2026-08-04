export interface DistributorProfile {
  name: string;
  city: string;
  advisingSince: number;
  clientCount: number;
  aumDisplay: string;
  aumValue: number;
  monthlySipBook: string;
  clientRetention: number;
  revenueThisQuarter: string;
  annualTrailIncomeBase: number;
  phone: string;
}

export const distributorProfile: DistributorProfile = {
  name: "Rajesh Mehta",
  city: "Mumbai",
  advisingSince: 2018,
  clientCount: 214,
  aumDisplay: "₹38.6 Cr",
  aumValue: 386000000,
  monthlySipBook: "₹42.8 L",
  clientRetention: 94,
  revenueThisQuarter: "₹18.6 L",
  annualTrailIncomeBase: 7440000,
  phone: "+91 98200 11234",
};

// Single-cockpit demo: any distributor code entered on the D2C side resolves
// to this one profile, so the D2C flow and the /distributor cockpit always
// line up in a live demo — no risk of a code resolving to an RM that isn't
// the one being shown on screen.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- code is accepted for API-shape parity even though this demo always resolves to one profile
export function resolveRelationshipManager(code: string): DistributorProfile {
  return distributorProfile;
}
