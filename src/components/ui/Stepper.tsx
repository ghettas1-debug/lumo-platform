'use client';

interface StepperProps {
  steps: { label: string; completed?: boolean }[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center gap-4">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              index < currentStep
                ? 'bg-green-600 text-white'
                : index === currentStep
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {index + 1}
          </div>
          <span className={`text-sm ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
            {step.label}
          </span>
          {index < steps.length - 1 && <div className="w-8 h-px bg-gray-300" />}
        </div>
      ))}
    </div>
  );
}
