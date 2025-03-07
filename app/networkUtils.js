// app/networkUtils.js
export function getNetworkData() {
  const storedNetwork = JSON.parse(localStorage.getItem('network') || '[]');
  if (storedNetwork.length === 0) {
    const defaultNetwork = [
      { gen: 'First Gen', recruits: [
        { id: 1, name: 'Thabo Mokoena', joined: '2025-03-01', sales: 'R1200', rank: 'Team Leader' },
        { id: 2, name: 'Sipho Ngwenya', joined: '2025-03-03', sales: 'R800', rank: 'Recruit' },
      ]},
      { gen: 'Gen 2', recruits: [
        { id: 3, name: 'Lerato Khumalo', joined: '2025-03-04', sales: 'R600', rank: 'Recruit' },
        { id: 4, name: 'Nomsa Dlamini', joined: '2025-03-05', sales: 'R400', rank: 'Recruit' },
      ]},
      { gen: 'Gen 3', recruits: [
        { id: 5, name: 'Bongani Zulu', joined: '2025-03-06', sales: 'R300', rank: 'Recruit' },
      ]},
      { gen: 'Gen 4', recruits: [
        { id: 6, name: 'Zandi Mbatha', joined: '2025-03-07', sales: 'R200', rank: 'Recruit' },
      ]},
      { gen: 'Gen 5', recruits: [
        { id: 7, name: 'Kabelo Tshabalala', joined: '2025-03-08', sales: 'R100', rank: 'Recruit' },
      ]},
    ];
    localStorage.setItem('network', JSON.stringify(defaultNetwork));
    return getNetworkData(); // Recurse with defaults
  }

  const totalRecruits = storedNetwork.reduce((sum, gen) => sum + gen.recruits.length, 0);
  const totalSales = storedNetwork.reduce((sum, gen) => 
    sum + gen.recruits.reduce((s, r) => s + parseFloat(r.sales.slice(1)), 0), 0);
  
  return { networkData: storedNetwork, totalRecruits, totalSales };
}