export const getTextStyle = (data: any, field: string) => {
  if (!data) return {};
  return {
    fontWeight: data[`${field}Bold`] ? '900' : 'inherit',
    fontStyle: data[`${field}Italic`] ? 'italic' : 'normal',
    textDecoration: data[`${field}Underline`] ? 'underline' : 'none',
    color: data[`${field}Color`] || (field === 'title' ? data.titleColor : undefined) || (field === 'subtitle' ? data.subtitleColor : undefined) || data.textColor
  };
};
