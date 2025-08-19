export default function Footer() {
  const BASE_URL = import.meta.env.BASE_URL;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 text-center transition-colors duration-300">
      <div className="max-w-[1080px] mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={`${BASE_URL}assets/purple_fox.png`}
            alt="Purple Fox"
            className="w-32 h-32 object-contain"
          />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Developed with ❤️ • {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
