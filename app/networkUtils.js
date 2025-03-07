// app/networkUtils.js
export function getNetworkData() {
  // Mock data mirroring my-network/* pages for now (later replace with dynamic fetch if backend added)
  const networkData = [
    { gen: 'First Gen', recruits: 2, sales: 2000 }, // Thabo, Sipho
    { gen: 'Gen 2', recruits: 2, sales: 1000 },    // Lerato, Nomsa
    { gen: 'Gen 3', recruits: 1, sales: 300 },     // Bongani
    { gen: 'Gen 4', recruits: 1, sales: 200 },     // Zandi
    { gen: 'Gen 5', recruits: 1, sales: 100 },     // Kabelo
  ];

  const totalRecruits = networkData.reduce((sum, gen) => sum + gen.recruits, 0);
  const totalSales = networkData.reduce((sum, gen) => sum + gen.sales, 0);

  return { networkData, totalRecruits, totalSales };
}