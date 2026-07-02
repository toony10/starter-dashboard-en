export const monthlyRevenueData = [
  { month: "Jan", revenue: 4200, expenses: 2800 },
  { month: "Feb", revenue: 5100, expenses: 3200 },
  { month: "Mar", revenue: 4800, expenses: 2900 },
  { month: "Apr", revenue: 6200, expenses: 3500 },
  { month: "May", revenue: 5800, expenses: 3100 },
  { month: "Jun", revenue: 7100, expenses: 3800 },
  { month: "Jul", revenue: 6800, expenses: 3600 },
  { month: "Aug", revenue: 7500, expenses: 3900 },
  { month: "Sep", revenue: 8200, expenses: 4100 },
  { month: "Oct", revenue: 7900, expenses: 4000 },
  { month: "Nov", revenue: 9100, expenses: 4300 },
  { month: "Dec", revenue: 9800, expenses: 4500 },
]

export const visitorTrafficData = [
  { month: "Jan", desktop: 1860, mobile: 980, tablet: 420 },
  { month: "Feb", desktop: 2100, mobile: 1240, tablet: 510 },
  { month: "Mar", desktop: 1950, mobile: 1180, tablet: 480 },
  { month: "Apr", desktop: 2380, mobile: 1520, tablet: 620 },
  { month: "May", desktop: 2210, mobile: 1390, tablet: 550 },
  { month: "Jun", desktop: 2640, mobile: 1680, tablet: 710 },
]

export const salesByCategoryData = [
  { category: "Electronics", sales: 4520 },
  { category: "Clothing", sales: 3280 },
  { category: "Home", sales: 2940 },
  { category: "Sports", sales: 2180 },
  { category: "Books", sales: 1560 },
]

export const trafficSourcesData = [
  { source: "organic", visitors: 4200, fill: "var(--color-organic)" },
  { source: "direct", visitors: 2800, fill: "var(--color-direct)" },
  { source: "social", visitors: 1900, fill: "var(--color-social)" },
  { source: "referral", visitors: 1400, fill: "var(--color-referral)" },
  { source: "email", visitors: 980, fill: "var(--color-email)" },
]

export const weeklyActivityData = [
  { day: "Mon", orders: 145, returns: 12 },
  { day: "Tue", orders: 178, returns: 8 },
  { day: "Wed", orders: 162, returns: 15 },
  { day: "Thu", orders: 195, returns: 10 },
  { day: "Fri", orders: 220, returns: 18 },
  { day: "Sat", orders: 168, returns: 9 },
  { day: "Sun", orders: 132, returns: 6 },
]

export const conversionGoalData = [{ goal: "conversion", value: 78, fill: "var(--color-conversion)" }]

export const kpiStats = [
  {
    title: "Total Revenue",
    value: "$84,320",
    change: "+12.5%",
    trend: "up" as const,
  },
  {
    title: "Active Users",
    value: "12,847",
    change: "+8.2%",
    trend: "up" as const,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.4%",
    trend: "up" as const,
  },
  {
    title: "Avg. Order Value",
    value: "$68.40",
    change: "-2.1%",
    trend: "down" as const,
  },
]
