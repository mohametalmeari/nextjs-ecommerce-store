import { useState } from "react";
import Button from "./button";

const Amount = ({
  setAmount,
  amount,
}: {
  setAmount: (data: number) => void;
  amount: number;
}) => {
  const handleIncrease = () => {
    setAmount(amount + 1);
  };

  const handleDecrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  return (
    <div className="flex py-5">
      <div className="flex flex-row justify-start items-center bg-gray-200 rounded-md">
        <Button
          onClick={handleDecrease}
          className="rounded-l-md rounded-r-none px-0 py-2 w-8"
        >
          -
        </Button>
        <span className="px-2 min-w-10 text-center">{amount}</span>
        <Button
          onClick={handleIncrease}
          className="rounded-l-none rounded-r-md px-0 py-2 w-8"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Amount;
