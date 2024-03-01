"use client";

import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useState } from "react";

interface FilterProps {
  name: string;
  valueKey: string;
}

const PriceFilter: React.FC<FilterProps> = ({ name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const [limit, setLimit] = useState(selectedValue || "");

  const handleClick = () => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: limit,
    };

    if (!limit) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        <input
          className="border w-20 px-2"
          type="text"
          onChange={(e) => setLimit(e.target.value)}
          value={limit}
        />
        <Button
          className="rounded-md text-sm p-2 border border-gray-300 bg-black text-white"
          onClick={handleClick}
          disabled={limit === selectedValue || (limit === "" && !selectedValue)}
        >
          {limit === "" && selectedValue ? "Clear" : "Search"}
        </Button>
      </div>
    </div>
  );
};

export default PriceFilter;
