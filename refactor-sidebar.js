const fs = require('fs');

const files = [
  'e:/WebNhaThuoc/ecommerce-shop/app/doctor/appointments/page.tsx',
  'e:/WebNhaThuoc/ecommerce-shop/app/doctor/dashboard/page.tsx',
  'e:/WebNhaThuoc/ecommerce-shop/app/doctor/patients/page.tsx',
  'e:/WebNhaThuoc/ecommerce-shop/app/doctor/prescriptions/page.tsx',
  'e:/WebNhaThuoc/ecommerce-shop/app/doctor/prescriptions/create/page.tsx',
  'e:/WebNhaThuoc/ecommerce-shop/app/doctor/profile/page.tsx',
  'e:/WebNhaThuoc/ecommerce-shop/app/doctor/records/page.tsx',
  'e:/WebNhaThuoc/ecommerce-shop/app/doctor/reports/page.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('DoctorSidebar')) return;

  let activePage = '';
  if (file.includes('prescriptions/create')) activePage = 'prescriptions-create';
  else if (file.includes('prescriptions')) activePage = 'prescriptions-list';
  else if (file.includes('appointments')) activePage = 'appointments';
  else if (file.includes('dashboard')) activePage = 'dashboard';
  else if (file.includes('patients')) activePage = 'patients';
  else if (file.includes('records')) activePage = 'records';
  else if (file.includes('reports')) activePage = 'reports';
  else if (file.includes('profile')) activePage = 'profile';
  else activePage = 'unknown';

  let importIndex = content.lastIndexOf("from 'lucide-react';");
  if (importIndex === -1) importIndex = content.lastIndexOf('from "lucide-react";');
  if (importIndex !== -1) {
    let nextNewline = content.indexOf('\n', importIndex);
    content = content.substring(0, nextNewline + 1) + '\nimport DoctorSidebar from "@/app/doctor/Sidebar";\n' + content.substring(nextNewline + 1);
  }

  const asideRegex = /<aside[\s\S]*?<\/aside>/;
  content = content.replace(asideRegex, `<DoctorSidebar activePage="${activePage}" />`);

  content = content.replace(/\s*const handleLogout = \(\) => router\.push\('\/login'\);/, '');
  content = content.replace(/\s*const \[isMenuOpen, setIsMenuOpen\] = useState\(true\);/, '');

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
