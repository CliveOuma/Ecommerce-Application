import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "E-buy Admin",
  description: "E-buy Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="p-2"> 
      <AdminNav />
      <div className="p-4">
        {children}
        </div>
      </div>
  );
};

export default AdminLayout;
