function LoginModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-[450px] max-w-[90%] z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}

export default LoginModal;