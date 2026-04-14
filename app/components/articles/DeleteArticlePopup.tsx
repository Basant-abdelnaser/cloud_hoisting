"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: ( id: number) => void;
  id: number;
};

const DeletePopup = ({
  isOpen,
  onClose,
  handleDelete,
  id
}: EditModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="relative p-4 w-full max-w-2xl ">
        <div className="bg-neutral-primary-soft  rounded-base  p-4 md:p-6 bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between   pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">Are you sure?</h3>

            <button
              onClick={onClose}
              className="text-body hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 flex justify-center items-center cursor-pointer "
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center  border-default space-x-4 pt-4 md:pt-5">
            <button
              onClick={() => {
                onClose();
                handleDelete(id);
              }}
              className="text-white bg-purple-900 px-4 py-2 rounded hover:bg-purple-800 ease-in-out transition-all duration-300 cursor-pointer "
            >
              Delete
            </button>

            <button
              onClick={onClose}
              className="text-body bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 ease-in-out transition-all duration-300 "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
