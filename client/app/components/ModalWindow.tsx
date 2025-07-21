import React from 'react';
import ReactDOM from 'react-dom';
import { MODAL_WINDOW_CONTAINER_ID } from '@/app/shared/constants';

type ModalWindowProps = {
    content: React.ReactNode;
    title: string;
    onClose: () => void;
    onCloseBtnLabel: string;
    onAccept: () => void;
    onAcceptBtnLabel: string;
    isOpen: boolean;
};

export const ModalWindow = ({ isOpen, content, title, onClose, onAccept, onCloseBtnLabel, onAcceptBtnLabel }: ModalWindowProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div>
            <div role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="relative z-10">
                {/*
                Background backdrop, show/hide based on dialog state.

                  Entering: "ease-out duration-300"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "ease-in duration-200"
                    From: "opacity-100"
                    To: "opacity-0"

                */}
                <div aria-hidden="true" className="fixed inset-0 bg-gray-500/75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        {/*

                        Dialog panel, show/hide based on dialog state.

                          Entering: "ease-out duration-300"
                            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            To: "opacity-100 translate-y-0 sm:scale-100"
                          Leaving: "ease-in duration-200"
                            From: "opacity-100 translate-y-0 sm:scale-100"
                            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        */}
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        {title ? <h3 className="h3 text-base font-semibold text-gray-900">{title}</h3> : null}

                                        {content}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="cursor-pointer inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    {onCloseBtnLabel}
                                </button>
                                <button
                                    onClick={onAccept}
                                    type="button"
                                    className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    {onAcceptBtnLabel}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>, document.getElementById(MODAL_WINDOW_CONTAINER_ID) as HTMLElement
    );
};
