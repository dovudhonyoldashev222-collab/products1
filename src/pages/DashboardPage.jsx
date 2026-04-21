import React from 'react';
import { ArrowDownRight, ArrowUpRight, DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function DashboardPage({ lineData, barData, topProductsData }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#5d87ff] transition-all cursor-pointer">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">$10,540</h3>
            <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-bold">
              <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                <ArrowUpRight size={12} />
              </div>
              <span>+22.4%</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-[#5d87ff] group-hover:text-white transition-all">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#5d87ff] transition-all cursor-pointer">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">1,056</h3>
            <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-bold">
              <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                <ArrowUpRight size={12} />
              </div>
              <span>+15.3%</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-[#5d87ff] group-hover:text-white transition-all">
            <ShoppingCart size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#5d87ff] transition-all cursor-pointer">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Active Sessions</p>
            <h3 className="text-2xl font-bold text-gray-800">48</h3>
            <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-bold">
              <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center">
                <ArrowDownRight size={12} />
              </div>
              <span>-18.2%</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-[#5d87ff] group-hover:text-white transition-all">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#5d87ff] transition-all cursor-pointer">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Sessions</p>
            <h3 className="text-2xl font-bold text-gray-800">5,420</h3>
            <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-bold">
              <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center">
                <ArrowDownRight size={12} />
              </div>
              <span>-10.2%</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-[#5d87ff] group-hover:text-white transition-all">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-800">Orders Over Time</h3>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none text-gray-500">
              <option>Last 12 Hours</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="may21" stroke="#cbd5e1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="may22" stroke="#5d87ff" strokeWidth={2} dot={{ fill: '#5d87ff', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-8">Last 7 Days Sales</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#13deb9" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-gray-800">1,259</span>
              <span className="text-xs text-gray-400">Items Sold</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800">$12,546</span>
              <span className="text-xs text-gray-400">Revenue</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 border-l-4 border-green-500 pl-4">Top Products by Units Sold</h3>
          <button className="text-xs font-bold text-[#5d87ff] hover:underline uppercase tracking-wider">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 border-b border-gray-50 uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Product Details</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold text-right">Units Sold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {topProductsData.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={p.img} alt={p.name} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform border border-gray-50 sharp-img" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-100 shadow-sm">
                          {i + 1}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-[#5d87ff] transition-colors">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-700">{p.price}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-2 py-1 rounded-md text-xs font-bold">
                      <TrendingUp size={12} />
                      {p.units}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

