import React from 'react';
import ReactDOM from 'react-dom';
import { MODAL_WINDOW_CONTAINER_ID } from '@/app/shared/constants';

type ModalWindowProps = {
    content: React.ReactNode;
    bottom?: React.ReactNode;
    title: string;
    isOpen: boolean;
};

export const ModalWindow = ({ isOpen, content, title, bottom }: ModalWindowProps) => {
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
                            <div className="bg-white">
                                <div className="">
                                    <div className="">
                                        {title ? <h3 className="h3 mb-0! bg-gray-50 px-4 py-3 text-gray-900 border-b-1 border-gray-100">{title}</h3> : null}
                                        {content}
                                    </div>
                                </div>
                            </div>
                            {bottom ? <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">{bottom}</div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById(MODAL_WINDOW_CONTAINER_ID) as HTMLElement
    );
};
