import React from 'react';
import { WellnessVideoPlayer } from './WellnessVideoPlayer';

export const BreathingExercise: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn pb-24">
      {/* Enlarged First Section: Somatic Orientation */}
      <WellnessVideoPlayer />
    </div>
  );
};
