"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // Checking if 'params' (a set of parameters) exists
    // and converting it into a more usable JavaScript object
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // Creating an updated query object with a new category value
    const updatedQuery: any = {
      ...currentQuery, // Keeping the existing parameters
      category: label, // Adding a new 'category' parameter with the value of 'label'
    };

    // Checking if the existing 'category' parameter matches the 'label'
    if (params?.get("category") === label) {
      delete updatedQuery.category; // If they match, remove the 'category' parameter
    }

    // Creating a URL string from the updated query object
    const url = qs.stringifyUrl(
      {
        url: "/", // The base URL
        query: updatedQuery, // The updated query object with parameters
      },
      { skipNull: true }
    ); // Skip any parameters with null or undefined values

    // Redirecting the user to the new URL using the router
    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
