import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconClose } from "../icons";

export default function Popup({ showPopup, setShowPopup, children }) {
    return (
        <>
            <Transition show={showPopup} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setShowPopup(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md relative dark:bg-gray-800 dark:text-white">
                                <button
                                    onClick={() => setShowPopup(false)}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                >
                                    <IconClose className="h-6 w-6" />
                                </button>

                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
