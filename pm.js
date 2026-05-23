import React, { useState } from 'react';

export default function App() {
  const [inputs, setInputs] = useState({
    temperature: 65,
    pressure: 220,
    actuatorVelocity: 3,
    vibration: 40,
  });

  const [result, setResult] = useState({
    status: 'SAFE',
    color: 'text-green-400',
    rul: 240,
    turnaround: 'Low',
    recommendation: 'Landing gear system is functioning normally.',
    health: 92,
    risk: 12,
  });

  const calculateStatus = () => {
    const {
      temperature,
      pressure,
      actuatorVelocity,
      vibration,
    } = inputs;

    let riskScore = 0;

    // TEMPERATURE ANALYSIS
    if (temperature > 90) {
      riskScore += 35;
    } else if (temperature > 75) {
      riskScore += 15;
    }

    // PRESSURE ANALYSIS
    if (pressure < 160 || pressure > 300) {
      riskScore += 35;
    } else if (pressure < 190 || pressure > 260) {
      riskScore += 15;
    }

    // ACTUATOR VELOCITY ANALYSIS
    if (actuatorVelocity > 6) {
      riskScore += 20;
    } else if (actuatorVelocity > 4.5) {
      riskScore += 10;
    }

    // VIBRATION ANALYSIS
    if (vibration > 80) {
      riskScore += 35;
    } else if (vibration > 55) {
      riskScore += 15;
    }

    // SAFE STATE
    if (riskScore < 30) {
      setResult({
        status: 'SAFE',
        color: 'text-green-400',
        rul: 240,
        turnaround: 'LOW',
        recommendation:
          'Landing gear system is operating safely. No immediate maintenance required.',
        health: 92,
        risk: riskScore,
      });
    }

    // WARNING STATE
    else if (riskScore < 70) {
      setResult({
        status: 'REPAIR SOON',
        color: 'text-yellow-400',
        rul: 95,
        turnaround: 'MEDIUM',
        recommendation:
          'System degradation detected. Maintenance should be scheduled soon.',
        health: 61,
        risk: riskScore,
      });
    }

    // CRITICAL STATE
    else {
      setResult({
        status: 'CRITICAL',
        color: 'text-red-500',
        rul: 20,
        turnaround: 'HIGH',
        recommendation:
          'Critical degradation detected. Immediate repair required.',
        health: 24,
        risk: riskScore,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-5xl font-bold">
            DIGITAL TWIN LANDING GEAR SYSTEM
          </h1>

          <p className="text-gray-400 text-lg mt-3">
            Predictive Maintenance using RUL and Turnaround Time Analysis
          </p>
        </div>

        {/* INPUT SECTION */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <h2 className="text-3xl font-bold mb-6">
            Sensor Inputs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <InputCard
              title="Temperature (°C)"
              min={20}
              max={120}
              value={inputs.temperature}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  temperature: Number(e.target.value),
                })
              }
            />

            <InputCard
              title="Pressure (PSI)"
              min={100}
              max={350}
              value={inputs.pressure}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  pressure: Number(e.target.value),
                })
              }
            />

            <InputCard
              title="Actuator Velocity (m/s)"
              min={1}
              max={8}
              value={inputs.actuatorVelocity}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  actuatorVelocity: Number(e.target.value),
                })
              }
            />

            <InputCard
              title="Vibration Level"
              min={0}
              max={100}
              value={inputs.vibration}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  vibration: Number(e.target.value),
                })
              }
            />

          </div>

          <button
            onClick={calculateStatus}
            className="mt-8 bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-2xl text-xl font-semibold"
          >
            Analyze Landing Gear
          </button>
        </div>

        {/* RESULT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <MetricCard
            title="System Status"
            value={result.status}
            color={result.color}
          />

          <MetricCard
            title="Remaining Useful Life"
            value={`${result.rul} Cycles`}
            color="text-cyan-400"
          />

          <MetricCard
            title="Health Score"
            value={`${result.health}%`}
            color="text-green-400"
          />

          <MetricCard
            title="Turnaround Time"
            value={result.turnaround}
            color="text-purple-400"
          />

        </div>

        {/* FINAL ANALYSIS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-3xl font-bold mb-6">
            Final Predictive Analysis
          </h2>

          <div className="space-y-5">

            <AnalysisCard
              title="Maintenance Status"
              value={result.status}
              color={result.color}
            />

            <AnalysisCard
              title="Risk Score"
              value={`${result.risk}%`}
              color="text-orange-400"
            />

            <AnalysisCard
              title="AI Recommendation"
              value={result.recommendation}
              color="text-white"
            />

          </div>
        </div>
      </div>
    </div>
  );
}

function InputCard({
  title,
  min,
  max,
  value,
  onChange,
}) {
  return (
    <div className="bg-black border border-zinc-800 rounded-2xl p-5">

      <p className="text-xl font-semibold mb-4">
        {title}
      </p>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full"
      />

      <div className="flex justify-between mt-4 text-gray-400">

        <span>{min}</span>

        <span className="text-white text-2xl font-bold">
          {value}
        </span>

        <span>{max}</span>

      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">

      <p className="text-gray-400">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-4 ${color}`}>
        {value}
      </h2>

    </div>
  );
}

function AnalysisCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-black border border-zinc-800 rounded-2xl p-5">

      <p className="text-gray-400 text-lg">
        {title}
      </p>

      <h3 className={`text-3xl font-bold mt-3 ${color}`}>
        {value}
      </h3>

    </div>
  );
}
