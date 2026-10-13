import { Mail } from "lucide-react";
import { contact } from "../data/profile";
import { InstagramIcon, LinkedInIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="no-print border-t-2 border-[#1B1B1B] bg-[#1B1B1B] py-10 text-[#F7F3EA]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-bold">Cristian Javier Cano Mogollón</p>
          <p className="text-sm text-[#F7F3EA]/60">Ingeniería Industrial · Operaciones · IA — {contact.location}</p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { href: `mailto:${contact.email}`, label: "Email", Icon: Mail },
            { href: contact.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
            { href: contact.instagram, label: "Instagram", Icon: InstagramIcon },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-lg border-2 border-[#F7F3EA]/20 transition-colors hover:border-[#F4C21B] hover:text-[#F4C21B]"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center font-mono text-xs text-[#F7F3EA]/40">© {new Date().getFullYear()} Cristian Javier Cano Mogollón</p>
    </footer>
  );
}
