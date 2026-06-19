import React from "react";
import StaticLayout from "../components/layout/StaticLayout";

const AboutPage = () => {
  return (
    <StaticLayout title="About DevMeet" badge="Project Architecture">
      <div className="space-y-4">
        <p>
          <strong className="text-primary font-bold">DevMeet</strong> is a high-fidelity, production-ready peer matching network designed for software engineers, developers, and creators to connect, match, and establish real-time collaborative development channels nearby.
        </p>
        
        <div className="divider my-2 border-base-300" />
        
        <h3 className="text-lg font-bold text-base-content tracking-tight">⚙️ Core Tech Stack Under The Hood</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-base-content font-bold">Frontend:</strong> Built using React 19, single-page client-side routing via React Router DOM 7, state architecture powered by Redux Toolkit, and stylized natively with Tailwind CSS v4 and DaisyUI utility modules.</li>
          <li><strong className="text-base-content font-bold">Backend Framework:</strong> Scaled on Node.js using Express 5 to run asynchronous RESTful dynamic validation controller entrypoints.</li>
          <li><strong className="text-base-content font-bold">Database Middleware:</strong> Relies on MongoDB infrastructure using high-performance compound scanning indices across specialized Mongoose schemas.</li>
        </ul>

        <h3 className="text-lg font-bold text-base-content tracking-tight pt-2">🚀 Implemented Engineering Systems</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-base-content font-bold">Real-Time Event Streams:</strong> Bidirectional low-latency messaging rooms configured seamlessly via server-bound hardware-accelerated WebSocket gateways.</li>
          <li><strong className="text-base-content font-bold">Cron-Driven Engine:</strong> Automates delayed transactional alerts by fetching interested pending backlogs and scanning safe email lists.</li>
          <li><strong className="text-base-content font-bold">Simulated Transaction hooks:</strong> Secure signature authorization checking pipelines simulating dynamic webhook captures.</li>
        </ul>
      </div>
    </StaticLayout>
  );
};

export default AboutPage;