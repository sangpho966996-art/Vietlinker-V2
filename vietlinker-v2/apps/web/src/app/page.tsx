export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Chào mừng đến với <span className="text-blue-600">VietLinker</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nền tảng kết nối cộng đồng người Việt qua thị trường, dịch vụ, việc làm, bất động sản, ẩm thực và rao vặt.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">🛍️ Thị trường</h3>
              <p className="text-sm text-gray-600">Mua bán hàng hóa đa dạng</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">🔧 Dịch vụ</h3>
              <p className="text-sm text-gray-600">Tìm kiếm các dịch vụ chuyên nghiệp</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">💼 Việc làm</h3>
              <p className="text-sm text-gray-600">Cơ hội nghề nghiệp</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">🏠 Bất động sản</h3>
              <p className="text-sm text-gray-600">Mua bán cho thuê nhà đất</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">🍜 Ẩm thực</h3>
              <p className="text-sm text-gray-600">Khám phá món ngon Việt Nam</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">📢 Rao vặt</h3>
              <p className="text-sm text-gray-600">Thông tin tổng hợp</p>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Bắt đầu ngay
            </button>
            <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}