import { FaFacebook, FaInstagram, FaTwitter, FaSun } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content flex flex-col md:flex-row justify-between items-start border-t border-slate-800">
      <aside className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-bold text-2xl">
          <FaSun />
          <span className="text-white">SunCart</span>
        </div>
        <p className="text-slate-400 max-w-xs">Premium engineered summer essentials designed to deliver superior shielding and modern breathable styling profiles.</p>
      </aside> 
      <nav>
        <h6 className="footer-title text-white tracking-widest">Contact</h6> 
        <p className="text-slate-400">Email: chakmaprotap855@gmail.com</p>
        <p className="text-slate-400">Hotline: +8801533098947</p>
      </nav> 
      <nav>
        <h6 className="footer-title text-white tracking-widest">Social & Legal</h6> 
        <div className="grid grid-flow-col gap-4 text-xl">
          <a className="hover:text-primary transition-colors cursor-pointer"><FaFacebook /></a>
          <a className="hover:text-primary transition-colors cursor-pointer"><FaInstagram /></a>
          <a className="hover:text-primary transition-colors cursor-pointer"><FaTwitter /></a>
        </div>
        <p className="text-xs text-slate-500 mt-4">Privacy Policy | © 2026 protap chakma. All rights reserved.</p>
      </nav>
    </footer>
  );
}