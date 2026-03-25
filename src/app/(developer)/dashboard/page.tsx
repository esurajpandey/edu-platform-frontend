export default function DeveloperDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Developer Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">Total Schools: 12</div>

        <div className="bg-white p-4 rounded-xl shadow">Active Users: 320</div>

        <div className="bg-white p-4 rounded-xl shadow">Revenue: ₹1,20,000</div>
      </div>
    </div>
  );
}
