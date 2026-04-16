import { useState } from "react";

export const useWizard = (steps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState({});

  const next = () => setStepIndex((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStepIndex((s) => Math.max(s - 1, 0));

  const updateData = (values) => {
    setData((prev) => ({ ...prev, ...values }));
  };

  return {
    stepIndex,
    step: steps[stepIndex],
    next,
    back,
    data,
    updateData,
    isFirst: stepIndex === 0,
    isLast: stepIndex === steps.length - 1
  };
};