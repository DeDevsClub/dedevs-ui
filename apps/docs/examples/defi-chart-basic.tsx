'use client';

import { CandlestickChart } from '@repo/defi/chart';

const Example = () => {
  return (
    <div className="w-full h-96 p-6 flex items-center justify-center min-h-[500px]">
      <div className="w-full max-w-4xl">
        <CandlestickChart />
      </div>
    </div>
  );
};

export default Example;
