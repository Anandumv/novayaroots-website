import Link from 'next/link'
import { Mail, Phone, ArrowRight } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-emerald-900 text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Novayaroots</h3>
            <p className="text-emerald-100">
              Your trusted source for premium organic herb products from Kerala, India.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Our Products</h4>
            <ul className="space-y-4">
              {[
                "Organic Moringa Powder",
                "Moringa Tea",
                "Mulberry Leaf Tea",
                "Kerala Pickles"
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="https://novayaroots.com/order/"
                    className="text-emerald-100 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Contact Us</h4>
            <div className="space-y-4">
              <a
                href="mailto:info@novayaroots.com"
                className="flex items-center group hover:text-emerald-200 transition-colors duration-300"
              >
                <Mail className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span>info@novayaroots.com</span>
              </a>
              <a
                href="tel:+919074561129"
                className="flex items-center group hover:text-emerald-200 transition-colors duration-300"
              >
                <Phone className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span>+91 90745 61129</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-emerald-800 text-center text-sm">
          <p className="text-emerald-200">
            &copy; {new Date().getFullYear()} Novayaroots - Authentic Organic Herb Products from Kerala, India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}