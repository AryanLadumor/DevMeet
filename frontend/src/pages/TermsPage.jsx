import React from "react";
import StaticLayout from "../components/layout/StaticLayout";

const TermsPage = () => {
  return (
    <StaticLayout title="Terms of Service" badge="Operational Rules">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-base-content tracking-tight">1. Usage & Minimum Eligibility</h3>
        <p>
          By creating an account registry on DevMeet, you declare that you meet our schema requirements of being at least 18 years of age and intend to discover and interact with local development clusters for lawful purposes.
        </p>

        <h3 className="text-lg font-bold text-base-content tracking-tight pt-2">2. Connection Request Constraints</h3>
        <p>
          Our database layer implements strict compound validation checks to secure fair, non-spam system workflows:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Users are structurally barred from issuing connection requests to their own matching ID.</li>
          <li>Duplicate pending invites across identical peer pairs are actively intercepted and blocked on the database layer.</li>
        </ul>

        <h3 className="text-lg font-bold text-base-content tracking-tight pt-2">3. Premium Tier Models</h3>
        <p>
          The platform operates two simulation tier metrics:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-base-content font-bold">Silver Tier:</strong> Caps daily discoverable interested outbound targets to a strict 50-request maximum pool quota.</li>
          <li><strong className="text-base-content font-bold">Gold Tier:</strong> Relaxes scheduling constraints to permit uncapped connection request throughput.</li>
        </ul>

        <h3 className="text-lg font-bold text-base-content tracking-tight pt-2">4. Simulated Transactions Disclaimer</h3>
        <p>
          All pricing structures and webhook capture loops exist purely within sandbox environments. No actual financial liabilities or legal warranties are generated during execution.
        </p>
      </div>
    </StaticLayout>
  );
};

export default TermsPage;