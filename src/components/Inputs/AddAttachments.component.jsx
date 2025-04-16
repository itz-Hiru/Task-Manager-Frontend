import React, { useState } from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { LuPaperclip } from "react-icons/lu";

const AddAttachments = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  // Add Option
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  // Delete option
  const handleDeleteOption = (index) => {
    const updateArray = attachments.filter((_, idx) => idx !== index);
    setAttachments(updateArray);
  };
  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={index}
          className="flex justify-between bg-gray-50 border-gray-100 px-3 py-2 rounded-md mt-3 mb-1"
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black">{item}</p>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => {
              handleDeleteOption(index);
            }}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-5 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-gray-100 rounded-md px-3">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            placeholder="Attach file link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
          />
        </div>
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiPlus className="text-lg" />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachments;
