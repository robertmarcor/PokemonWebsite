import { ROUTES } from "../../data/routes";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import Portal from "../../Portal";
import SidebarComp from "./sidebar";
import { AnimatePresence, motion } from "framer-motion"; // ✅ Corrected Import

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={cn("fixed top-2 right-2 flex items-center font-headings")}>
      <button className="z-50 p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <Portal>
        {/* Keep Portal Always Rendered, Animate Sidebar Inside */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "+100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50">
              <SidebarComp routes={ROUTES} setIsOpen={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </nav>
  );
}
