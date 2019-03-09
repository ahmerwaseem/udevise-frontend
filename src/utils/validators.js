export const required = value => value ? ((value.trim().length != 0) ? undefined : 'Required') : 'Required';
