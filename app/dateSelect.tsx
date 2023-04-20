'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

export default function DateSelect({
  disabled,
  paramName,
  label,
  defaultValue
}: {
  disabled?: boolean;
  paramName: string;
  label: string;
  defaultValue: string;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSetDate = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative max-w-md">
      <label htmlFor="search" className="sr-only">
        Search Date
      </label>
      <div>
        <div className="flex items-end justify-between mb-2">
          <label htmlFor={paramName} className="text-sm text-gray-400 block">
            {label}
          </label>
          {isPending && (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="date"
            name={paramName}
            defaultValue={defaultValue}
            id={paramName}
            disabled={disabled}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => handleSetDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
