import React from "react";
import StaticLayout from "../components/layout/StaticLayout";

const PrivacyPolicyPage = () => {
  return (
    <StaticLayout title="Privacy Policy" badge="Last Updated: June 2026">
      <div className="space-y-4">
        <p className="italic">
          DevMeet is an open-source educational engineering project. No personal identifiers or data entries are utilized for commercial profiling or shared with third-party tracking networks.
        </p>

        <h3 className="text-lg font-bold text-base-content tracking-tight pt-2">1. Data Collected & Stored</h3>
        <p>
          We only store parameters explicitly cataloged during registration or profile composition: your First Name, optional Last Name, hashed Password string, verified Email ID, Age, Gender expression, biographical text descriptions, and an array of technical skills.
        </p>

        <h3 className="text-lg font-bold text-base-content tracking-tight pt-2">2. Security Architecture</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-base-content font-bold">Cryptographic Salt Hashing:</strong> Raw inbound authentication credentials are secure-hashed via 10-round operational bcrypt salts before getting logged into our cluster tables.</li>
          <li><strong className="text-base-content font-bold">HttpOnly State Sessions:</strong> Active user authentication is preserved statelessly via signed JSON Web Tokens issued inside server-pinned, secure browser cookie frames.</li>
        </ul>

        <h3 className="text-lg font-bold text-base-content tracking-tight pt-2">3. Cookies</h3>
        <p>
          Our platform explicitly employs temporary functional session cookies solely to preserve authorized authorization state headers. No tracking parameters cross cross-origin boundaries.
        </p>
      </div>
    </StaticLayout>
  );
};

export default PrivacyPolicyPage;