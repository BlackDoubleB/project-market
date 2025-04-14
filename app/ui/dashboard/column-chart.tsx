"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Decimal } from "decimal.js";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SaleFetch } from "@/app/lib/definitions";

export function Component({ sales }: { sales: SaleFetch[] }) {
  const dataMonth = [
    { month: "january", total: 50000 },
    { month: "february", total: 60000 },
    { month: "march", total: 55000 },
    { month: "april", total: 2500 },
    { month: "may", total: 65000 },
    { month: "june", total: 80000 },
    { month: "july", total: 75000 },
    { month: "august", total: 90000 },
    { month: "september", total: 55000 },
    { month: "october", total: 6800 },
    { month: "november", total: 100000 },
    { month: "december", total: 2000 },
  ];
  const monthsArray = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  let totalYear = 0;
  sales.forEach((sale) => {
    const dateString = sale.date_register;
    const date = new Date(dateString);
    const month = monthsArray[date.getMonth()];
    const year: number = date.getFullYear();
    const total = new Decimal(sale.total).toNumber();

    if (!isNaN(Number(total))) {
      const index = monthsArray.indexOf(month);
      if (index !== -1 && year === 2025) {
        dataMonth[index].total = dataMonth[index].total + total;
        totalYear = new Decimal(totalYear + total).toNumber();
      }
    }
  });

  const chartConfig = {
    total: {
      label: "Total Sales \u00A0",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Months of sale 2025 </CardTitle>
        <CardDescription>
          Total S/. {totalYear.toLocaleString("es-PE")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={dataMonth}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={{
                stroke: "rgba(128, 128, 128, 0.3)",
                strokeWidth: 2,
                strokeDasharray: "5 5",
              }}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="total" fill="blue" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
