export default function Footer() {
  return (
    <footer className="py-8 bg-gradient-to-r from-pink-50 to-purple-50 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-gray-600">Kỷ niệm 2000 ngày yêu nhau | Qy & NYL</p>
        <p className="text-sm text-gray-500 mt-2">{new Date().getFullYear()} - Mãi yêu nhau</p>
      </div>
    </footer>
  )
}
