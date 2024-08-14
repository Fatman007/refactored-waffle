import React from "react";
import checkmarkEmptyIcon from "../../../../assets/frontend/img/checkmark-empty.svg";
import checkmarkFillIcon from "../../../../assets/frontend/img/checkmark-fill.svg";

const StepIndicator = ({
    label,
    isActive,
    isFirst = false,
    isLast = false
}) => {
    return (
        <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px]">
            <div className="flex items-start w-full">
                {/* Left Connector Line */}
                {!isFirst && (
                    <div
                        className="flex flex-1 shrink items-center self-stretch my-auto basis-0 min-h-[16px]"
                        style={{ marginTop: 6 }}
                    >
                        <div
                            className="flex flex-1 shrink items-start self-stretch my-auto w-full bg-white basis-0"
                            style={{ marginTop: 6 }}
                        >
                            <div className="flex flex-1 shrink w-full basis-0 bg-zinc-200 min-h-[2px]" />
                        </div>
                    </div>
                )}

                {/* Step Indicator */}
                <div className="flex flex-col gap-2.5 justify-center items-center w-4">
                    <img
                        loading="lazy"
                        src={isActive ? checkmarkFillIcon : checkmarkEmptyIcon}
                        alt=""
                        style={{ marginTop: 6 }}
                        className="object-contain self-stretch my-auto w-4 aspect-square"
                    />

                    {/* Label Below the Step */}
                    <div
                        className={`px-4 text-xs text-center ${isActive ? "text-teal-600" : "text-neutral-400"}`}
                    >
                        {label}
                    </div>
                </div>

                {/* Right Connector Line */}
                {!isLast && (
                    <div
                        className="flex flex-1 shrink items-center self-stretch my-auto basis-0 min-h-[16px]"
                        style={{ marginTop: 6 }}
                    >
                        <div
                            className="flex flex-1 shrink items-start self-stretch my-auto w-full bg-white basis-0"
                            style={{ marginTop: 6 }}
                        >
                            <div className="flex flex-1 shrink w-full basis-0 bg-zinc-200 min-h-[2px]" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StepIndicator;
