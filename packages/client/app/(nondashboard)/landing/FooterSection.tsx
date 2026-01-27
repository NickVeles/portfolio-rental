import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const socialMediaLinks = [
  { label: "Facebook", icon: faFacebook, href: "https://nickveles.com" },
  { label: "Instagram", icon: faInstagram, href: "https://nickveles.com" },
  { label: "Twitter", icon: faXTwitter, href: "https://nickveles.com" },
  { label: "LinkedIn", icon: faLinkedin, href: "https://nickveles.com" },
  { label: "YouTube", icon: faYoutube, href: "https://nickveles.com" },
];

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

function FooterSection() {
  return (
    <footer className="border-t border-gray-200 py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4">
            <Link href="/" className="text-xl font-bold">
              VELRENT
            </Link>
          </div>
          <nav className="mb-4">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex space-x-4 mb-4 *:hover:text-primary-600">
            {socialMediaLinks.map((link) => (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                key={link.label}
                href={link.href}
                aria-label={link.label}
              >
                <FontAwesomeIcon icon={link.icon} className="size-6" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 flex justify-center space-x-4">
          <span>
            &copy; {new Date().getFullYear()} VELRENT. All rights reserved.
          </span>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
