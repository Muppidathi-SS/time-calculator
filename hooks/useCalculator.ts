"use client";

import { useCallback } from "react";
import response from "@/constants/response.json";
import calculateWorkAndBreakTime from "@/utils/calculateWorkAndBreakTime";

export function useCalculator() {
  const extractJson = useCallback((json: string) => {
    try {
      //const message = JSON.parse(json).message;
      const message = response.message;
      const nameIndex = message.keys.indexOf("employee_name");
      const typeIndex = message.keys.indexOf("log_type");
      const timeIndex = message.keys.indexOf("time");
      type ExtractedItem = {
        name: string;
        type: string;
        time: string;
      };

      const extracted: ExtractedItem[] = message.values.map(
        (item: unknown[]) => ({
          name: item[nameIndex] as string,
          type: item[typeIndex] as string,
          time: item[timeIndex] as string,
        }),
      );
      console.log(extracted);
      const today = new Date().toISOString().split("T")[0];
      console.log("DAY", today);
      const array = extracted.filter((item) => item.time.startsWith(today));
      const arr = array.reverse();
      console.log(arr);
      const result = arr.filter((item, index) => {
        return arr[index + 1]?.type !== item.type;
      });
      console.log(result);
      const value = calculateWorkAndBreakTime(result);

      console.log("Work Time:", value.workTime);
      console.log("Break Time:", value.breakTime);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { extractJson };
}
