import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}