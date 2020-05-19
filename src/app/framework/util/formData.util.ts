export function toFormData<T>(formValue: T) {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    if (typeof value[key] === 'object') {
      for (const subKey of value[key]) {
        formData.append(`${key}.${subKey}`, value[key][subKey]);
      }
    } else {
      formData.append(key, value);
    }
    console.log(value);
    console.log(formData.get(key));
  }

  return formData;
}
