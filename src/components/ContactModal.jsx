import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const EditCarModal = ({ modal, onModalClose }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(modal);
  }, [modal]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onModalClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-top bg-white rounded-lg  overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-11/12">
              <div className="">
                  <div className="">
                    <img src="https://res.cloudinary.com/dz0oop5kb/image/upload/v1664340164/svco/Gmail_icon__2020_1_owruyd.png"  alt="" />
                  </div>
                  
                  <div className="">
                    <img  src="https://res.cloudinary.com/dz0oop5kb/image/upload/v1664340164/svco/jira_png_1_pz5szx.png" alt="" />
                  </div>
                  <div className="text-lg  ">
                  Send us an Email <span className="text-sm">or</span> Put in a Service 
                  </div>
                  <div className="">
                    <img src="https://res.cloudinary.com/dz0oop5kb/image/upload/v1664340164/svco/icon__phone__jdq006.png" alt="" />
                  </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditCarModal;
