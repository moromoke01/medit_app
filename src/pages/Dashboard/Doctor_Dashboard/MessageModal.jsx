import react from "react" 

const MessageModal = ({
  show, 
  type, 
  subject, 
  message, 
  onChangeMessage, 
  onClose, 
  onSubmit
}) => {
  if (!show) return null;

   const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (onSubmit) {
      onSubmit(e); // call the function passed as prop
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">{subject}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">

            <label className="block font-semibold mb-1">
               {type === "approved" ? "Meeting Link" : "Rejection Reason"}
            </label>
            
           <textarea className="w-full border-gray-300 rounded p-2" 
            rows={type === "approved" ? 2 : 4 } 
            placeholder={ type === "approved" ? "Paste meeting link here..." : "Enter reason for rejection..."} 
           value={message} 
           onChange={onChangeMessage}
           required/>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={onClose}>
                Cancel
            </button>
            <button type='submit' className="bg-blue-600 text-white px-4 py-2">Send</button>
          </div>
        </form>

        
        {/* to preview message */}
        {/* <div className="mt-4 text-sm text-gray-500">
          <strong>Email Preview:</strong>
          <div>
            <span className="font-bold">{subject}</span>
            <div>{message}</div>
          </div>
        </div> */}

      </div>

    </div>
  )
}

export default MessageModal;