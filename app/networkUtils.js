export function getNetworkData() {
  const networkData = [
    { gen: 'First Gen', recruits: [
      { name: 'Recruit 1', sales: 'R1000', joined: '2025-01-01' },
      { name: 'Recruit 2', sales: 'R1000', joined: '2025-01-02' }
    ]},
    { gen: 'Gen 2', recruits: [
      { name: 'Recruit 3', sales: 'R500', joined: '2025-02-01' }
    ]},
    { gen: 'Gen 3', recruits: [
      { name: 'Recruit 4', sales: 'R300', joined: '2025-03-01' }
    ]},
    { gen: 'Gen 4', recruits: [] },
    { gen: 'Gen 5', recruits: [] },
  ];
  const totalRecruits = networkData.reduce((sum, gen) => sum + (gen.recruits?.length || 0), 0);
  const totalSales = networkData.reduce((sum, gen) => 
    sum + (gen.recruits?.reduce((s, r) => s + parseFloat(r.sales?.slice(1) || 0), 0) || 0), 0
  );
  return { networkData, totalRecruits, totalSales };
}