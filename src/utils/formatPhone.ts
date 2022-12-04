export const phoneFormat = (phone: string): string => {
  let formatPhone = "";
  if (phone.length === 13) {
    const parte1 = phone.slice(0, 2);
    const parte2 = phone.slice(2, 4);
    const parte3 = phone.slice(4, 9);
    const parte4 = phone.slice(9, 13);
    return (formatPhone = `+${parte1} (${parte2}) ${parte3}-${parte4}`);
  }
  if (phone.length === 11) {
    console.log(phone);
    const parte2 = phone.slice(0, 2);
    const parte3 = phone.slice(2, 7);
    const parte4 = phone.slice(7, 11);
    return (formatPhone = `(${parte2}) ${parte3}-${parte4}`);
  }
  if (phone.length === 9) {
    const parte1 = phone.slice(0, 5);
    const parte2 = phone.slice(5, 9);
    return (formatPhone = `${parte1}-${parte2}`);
  }
  if (phone.length === 8) {
    const parte1 = phone.slice(0, 4);
    const parte2 = phone.slice(4, 8);
    return (formatPhone = `${parte1}-${parte2}`);
  }

  return formatPhone;
};
