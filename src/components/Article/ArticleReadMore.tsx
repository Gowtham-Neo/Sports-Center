import React, { Fragment } from "react";
import { Article } from "../../context/Article/types";
import { Dialog, Transition } from "@headlessui/react";
import { GrClose } from "react-icons/gr";

interface ArticleReadMoreProps {
  selectedArticle: Article | null;
  isOpen: boolean;
  closeModel: () => void;
}

const ArticleReadMore: React.FC<ArticleReadMoreProps> = ({
  selectedArticle,
  isOpen,
  closeModel,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="absolute pt-2 pr-2 text-xl font-semibold duration-150 right-1 top-1 hover:scale-125">
                  <button type="button" onClick={closeModel}>
                    <GrClose />
                  </button>
                </div>
                <div className="flex items-start justify-between">
                  {selectedArticle && (
                    <>
                      <div className="flex items-start">
                        <div className="w-full md:mt-3 md:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            {selectedArticle.title}
                          </Dialog.Title>
                          <hr />
                          <div className="mt-2">
                            <div className="w-full ">
                              <img
                                className="w-4/6 mx-auto mt-4 mb-2 rounded-lg h-3/6"
                                src={selectedArticle.thumbnail}
                                alt={selectedArticle.title}
                              />
                            </div>
                            <hr />
                            <p className="mt-4 text-gray-800 md:text-justify md:mx-4">
                              {selectedArticle.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ArticleReadMore;
