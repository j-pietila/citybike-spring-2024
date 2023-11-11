import { useId } from "react";

interface NavigationBarButtonProps {
  dropdownId: string;
}

export const NavigationBarButton = ({
  dropdownId,
}: NavigationBarButtonProps) => {
  const caretId = useId();

  const handleClick = () => {
    const dropdownContent = document.getElementById(dropdownId);
    const caret = document.getElementById(caretId);
    dropdownContent?.classList.toggle("transition");
    dropdownContent?.classList.toggle("duration-500");
    dropdownContent?.classList.toggle("opacity-0");
    dropdownContent?.classList.toggle("h-0");
    caret?.classList.toggle("rotate-180");
  };

  return (
    <button
      className="flex justify-start items-center transition duration-200 hover:text-sky-700 group"
      onClick={handleClick}
    >
      CITY BIKES
      <svg
        id={caretId}
        className="h-8 w-8 transition duration-200 group-hover:fill-sky-700"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z"
        />
      </svg>
    </button>
  );
};

export default NavigationBarButton;
