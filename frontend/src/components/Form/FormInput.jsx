const FormInput = ({
  label,
  type = "text",
  placeholder,
  error,
  name,
  onChange,
  value,
}) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        type={type}
        className="input"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
      <p className="label">{error}</p>
    </fieldset>
  );
};

export default FormInput;
