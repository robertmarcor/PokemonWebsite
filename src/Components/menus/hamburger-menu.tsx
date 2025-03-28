import { ROUTES } from "../../data/routes";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import Portal from "../../Portal";
import SidebarComp from "./sidebar";
import { AnimatePresence, motion } from "framer-motion";

export default function HamburgerMenu({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={cn(className, "flex items-center font-headings z-40")}>
      <button className="p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
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
