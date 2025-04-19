import { FieldError, UseFormRegister } from "react-hook-form";

type InputProps = {
  type?: string;
  placeholder?: string;
  className?: string;
  register: UseFormRegister<any>;
  name: string;
  label?: string;
  error?: FieldError;
  as?: "input" | "textarea";
};

export const Input = ({
  type = "text",
  placeholder,
  className = "",
  register,
  label,
  name,
  error,
  as = "input",
}: InputProps) => {
  const commonProps = {
    ...register(name),
    placeholder,
    className: `${className} border border-gray-600 bg-[#101828] text-white placeholder:text-white/60 px-2 py-3 rounded-lg focus:outline-purple-500 focus:outline-2 focus:border-purple-500 ${
      error ? "border-red-500 focus:outline-red-500" : ""
    }`,
    type,
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-md text-white">
          {label}
        </label>
      )}
      {as === "textarea" ? (
        <textarea {...commonProps} />
      ) : (
        <input {...commonProps} type={type} />
      )}
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};
