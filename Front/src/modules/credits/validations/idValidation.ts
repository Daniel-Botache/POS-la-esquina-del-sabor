const idValidation = (id: number) => {
  if (isNaN(id)) {
    return "La cédula solo debe tener valores numéricos";
  }
  return "";
};

export { idValidation };
