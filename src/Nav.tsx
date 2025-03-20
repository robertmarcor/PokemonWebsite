import { ROUTES } from "./data/routes";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "./lib/utils";
import Portal from "./Portal";
import SidebarComp from "./Components/sidebar";
import { AnimatePresence, motion } from "framer-motion"; // ✅ Corrected Import

type Props = { className?: string };

export default function MobileNav({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={cn(className, "flex items-center font-headings")}>
      <button
        className="z-10 p-2 text-black"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu">
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Keep Portal Always Rendered, Animate Sidebar Inside */}
      <Portal>
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
