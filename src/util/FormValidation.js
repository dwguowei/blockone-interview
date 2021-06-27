import { useState } from "react";

const useForm = (options) => {
  const [data, setData] = useState((options?.initialValues || {}));
  const [errors, setErrors] = useState({});

  const handleChange = (key, sanitizeFn) => (
    e,
  ) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...data,
      [key]: value,
    });
    setErrors({
      ...errors,
      [key]: undefined,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let isValid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        console.log(validation?.required?.value,!value, value)
        if (validation?.required?.value && !value) {
          isValid = false;
          newErrors[key] = newErrors[key] || validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          isValid = false;
          newErrors[key] = newErrors[key] || pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          isValid = false;
          newErrors[key] = newErrors[key] || custom.message;
        }
      }

      if (!isValid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
      setData(options?.initialValues || {});
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default useForm