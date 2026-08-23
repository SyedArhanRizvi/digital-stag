import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F8EAD5]/30 via-white to-[#FFE19A]/20">
      <div className="max-w-md w-full text-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-sm transition-all duration-300">
        {/* Large Visual Indicator */}
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFE19A]/40 text-[#5B3700] text-3xl sm:text-4xl font-bold mb-6">
          404
        </div>

        {/* Messaging */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
          The page you are looking for doesn't exist, was moved, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#5B3700] hover:bg-[#C57A00] text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}